


const express = require("express");
const admin = require("firebase-admin");
require("dotenv").config();
const { KiteConnect } = require("kiteconnect");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.cert(require(process.env.FIREBASE_SERVICE_ACCOUNT)),
    databaseURL: "https://traderapp-7e61b-default-rtdb.firebaseio.com/"
  });
  console.log("🔥 Firebase Admin SDK initialized successfully.");
} catch (error) {
  console.error("❌ Error initializing Firebase Admin SDK:", error.message);
  // Depending on your deployment, you might want to exit the process here
  // process.exit(1); 
}

const db = admin.database();

// Zerodha Kite Connect
const kc = new KiteConnect({ api_key: process.env.API_KEY });

// Set access token for the session. This is generally obtained through a login flow.
// For a persistent backend like this, you'd typically have a mechanism to renew/set this.
// For now, it's set once from the .env.
if (process.env.ACCESS_TOKEN) {
  kc.setAccessToken(process.env.ACCESS_TOKEN);
  console.log("🔑 KiteConnect Access Token set.");
} else {
  console.warn("⚠️ ACCESS_TOKEN is not set in .env. KiteConnect API calls might fail without it.");
}


// ----------------------
// Helper functions
// ----------------------
const toEpochMs = (ts) => {
  if (!ts) return 0;
  if (typeof ts === "number") return ts;
  const s = String(ts).trim();
  const d1 = new Date(s);
  if (!isNaN(d1.getTime())) return d1.getTime();
  const d2 = new Date(s.replace(" ", "T"));
  return isNaN(d2.getTime()) ? 0 : d2.getTime();
};

// ----------------------
// Fetch wallet / funds
// ----------------------
const fetchFunds = async () => {
  try {
    const margins = await kc.getMargins();
    const equity = margins?.equity || {};
    const commodity = margins?.commodity || {};

    const walletData = {
      net: equity.net ?? 0,
      available: {
        cash: equity.available?.cash ?? 0,
        live_balance: equity.available?.live_balance ?? 0
      },
      used: {
        m2m_unrealised: equity.used?.m2m_unrealised ?? 0
      },
      commodity_net: commodity.net ?? 0,
      timestamp: Date.now()
    };

    await db.ref("wallet").set(walletData);
    console.log("💰 Wallet updated successfully");
    return walletData;
  } catch (error) {
    console.error("❌ Error fetching wallet:", error.message);
    // Rethrow to allow Promise.all to catch it
    throw error; 
  }
};

// ----------------------
// Fetch portfolio holdings
// ----------------------
const fetchHoldings = async () => {
  try {
    const holdings = await kc.getHoldings();

    const portfolioData = holdings.map(holding => ({
      tradingsymbol: holding.tradingsymbol || "",
      quantity: holding.quantity || 0,
      average_price: holding.average_price || 0,
      last_price: holding.last_price || 0,
      pnl: holding.pnl || 0,
      day_change: holding.day_change || 0,
      day_change_percentage: holding.day_change_percentage || 0
    }));

    await db.ref("portfolio").set(portfolioData);
    console.log(`📦 Portfolio updated: ${portfolioData.length} items`);
    return portfolioData;
  } catch (error) {
    console.error("❌ Error fetching portfolio:", error.message);
    throw error;
  }
};

// ----------------------
// Fetch positions
// ----------------------
const fetchPositions = async () => {
  try {
    const positions = await kc.getPositions();

    const openPositions = (positions.net || []).map(position => ({
      tradingsymbol: position.tradingsymbol || "",
      quantity: position.quantity || 0,
      average_price: position.average_price || 0,
      last_price: position.last_price || 0,
      pnl: position.pnl || 0,
      m2m: position.m2m || 0,
      status: "active"
    }));

    const positionsSummary = {
      total_pnl: openPositions.reduce((sum, p) => sum + p.pnl, 0),
      total_m2m: openPositions.reduce((sum, p) => sum + p.m2m, 0),
      timestamp: Date.now()
    };

    await db.ref("open_positions").set(openPositions);
    await db.ref("open_positions_summary").set(positionsSummary);
    console.log(`📊 Positions updated: ${openPositions.length} items`);
    return { positions: openPositions, summary: positionsSummary };
  } catch (error) {
    console.error("❌ Error fetching positions:", error.message);
    throw error;
  }
};

// ----------------------
// Fetch executed trades
// ----------------------
const fetchTrades = async () => {
  try {
    const trades = await kc.getTrades();

    const executedTrades = trades.map((trade) => {
      const price = Number(
        trade.average_price ?? trade.price ?? 0
      );
      const ts = toEpochMs(
        trade.exchange_timestamp ||
          trade.trade_timestamp ||
          trade.order_timestamp ||
          trade.timestamp
      );

      return {
        tradingsymbol: trade.tradingsymbol || "",
        type: trade.transaction_type || "",
        qty: Number(trade.quantity ?? 0),
        price, // keep for Flutter compatibility
        avg_price: price,
        exchange: trade.exchange || "",
        product: trade.product || "",
        order_id: trade.order_id || "",
        timestamp: ts,
        status: "complete",
      };
    });

    // Sort latest first by numeric epoch
    executedTrades.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    await db.ref("executed_trades").set(executedTrades);
    console.log(`💱 Executed trades updated: ${executedTrades.length} total`);
    return executedTrades;
  } catch (error) {
    console.error("❌ Error fetching trades:", error.message);
    throw error;
  }
};

// ----------------------
// Fetch open orders
// ----------------------
const fetchOpenOrders = async () => {
  try {
    const orders = await kc.getOrders();

    const openOrders = orders
      .filter(order => ["OPEN", "TRIGGER PENDING"].includes(order.status))
      .map(order => ({
        order_id: order.order_id,
        tradingsymbol: order.tradingsymbol || "",
        status: order.status || "",
        product: order.product || "",
        quantity: order.quantity || 0,
        price: order.price || 0,
        order_type: order.order_type || "",
        exchange: order.exchange || "",
        transaction_type: order.transaction_type || "",
        variety: order.variety || "",
        validity: order.validity || "",
        timestamp: order.order_timestamp || ""
      }));

    // Sort by timestamp
    openOrders.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    await db.ref("open_orders").set(openOrders);
    console.log(`📝 Open orders updated: ${openOrders.length} items`);
    return openOrders;
  } catch (error) {
    console.error("❌ Error fetching open orders:", error.message);
    throw error;
  }
};

// ----------------------
// Fetch P&L data
// ----------------------
const fetchPnLData = async () => {
  try {
    // Get positions for unrealized P&L
    const positions = await kc.getPositions();

    // Calculate unrealized P&L from net positions
    let unrealised = 0;
    if (positions && positions.net) {
      unrealised = positions.net.reduce((total, position) => {
        return total + (position.unrealised || 0);
      }, 0);
    }

    // Get today's date for fetching today's trades
    // const today = new Date();
    // const fromDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Get today's trades to calculate realized P&L - Note: kc.getTrades() gets all recent trades,
    // not just today's. Calculating realized P&L from all trades fetched.
    const trades = await kc.getTrades();
    
    // Calculate realized P&L from all trades
    let realised = 0;
    if (trades && Array.isArray(trades)) {
      realised = trades.reduce((total, trade) => {
        // Only include P&L from closed positions for 'realised' here.
        // KiteConnect's trade objects usually have a 'pnl' field which might represent
        // P&L per trade. If you need true 'realised P&L' for the day, you'd
        // need to filter trades by date and consider the net effect of buy/sell.
        // For simplicity, we sum up the 'pnl' field from trade objects.
        return total + (trade.pnl || 0);
      }, 0);
    }
    
    const pnlData = {
      unrealised,
      realised,
      total: unrealised + realised,
      timestamp: Date.now()
    };
    
    await db.ref("pnl_data").set(pnlData);
    console.log(`📈 P&L data updated: ₹${pnlData.total.toFixed(2)}`);
    return pnlData;
  } catch (error) {
    console.error("❌ Error fetching P&L data:", error.message);
    throw error;
  }
};

// ----------------------
// Initial Fetch
// ----------------------
console.log("🚀 Starting Zerodha Trade Tracker (React-compatible)...");
console.log("⏳ Performing initial data fetch...");
Promise.allSettled([ // Use allSettled to ensure all promises are attempted even if some fail
  fetchFunds(),
  fetchHoldings(),
  fetchPositions(),
  fetchTrades(),
  fetchOpenOrders(),
  fetchPnLData()
]).then(results => {
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      const functionNames = ["fetchFunds", "fetchHoldings", "fetchPositions", "fetchTrades", "fetchOpenOrders", "fetchPnLData"];
      console.error(`Initial fetch for ${functionNames[index]} failed:`, result.reason.message);
    }
  });
  console.log("✅ Initial data fetch complete (check logs for individual failures).");
}).catch(err => console.error("An unexpected error occurred during initial fetch:", err));


// ----------------------
// Schedule periodic tasks
// ----------------------
console.log("⏰ Scheduling periodic data updates...");
setInterval(fetchFunds, 30000);      // every 30 sec
setInterval(fetchHoldings, 60000);   // every 60 sec
setInterval(fetchPositions, 20000);  // every 20 sec
setInterval(fetchTrades, 10000);     // every 10 sec
setInterval(fetchOpenOrders, 15000); // every 15 sec
setInterval(fetchPnLData, 25000);    // every 25 sec
console.log("✅ Periodic updates scheduled.");


// ----------------------
// API endpoints
// ----------------------
app.get("/", (req, res) => {
  res.json({
    status: "🚀 Zerodha Trade Tracker Running (React-compatible)",
    endpoints: [
      "/api/wallet",
      "/api/portfolio",
      "/api/positions",
      "/api/trades",
      "/api/open-orders",
      "/api/pnl-data",
      "/api/refresh-all"
    ],
    timestamp: new Date().toISOString()
  });
});

// Get wallet data
app.get("/api/wallet", async (req, res) => {
  try {
    const snapshot = await db.ref("wallet").once("value");
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get portfolio data
app.get("/api/portfolio", async (req, res) => {
  try {
    const snapshot = await db.ref("portfolio").once("value");
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get positions data
app.get("/api/positions", async (req, res) => {
  try {
    const [positions, summary] = await Promise.all([
      db.ref("open_positions").once("value"),
      db.ref("open_positions_summary").once("value")
    ]);
    res.json({
      positions: positions.val(),
      summary: summary.val()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trades data
app.get("/api/trades", async (req, res) => {
  try {
    const snapshot = await db.ref("executed_trades").once("value");
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get open orders data
app.get("/api/open-orders", async (req, res) => {
  try {
    const snapshot = await db.ref("open_orders").once("value");
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get P&L data
app.get("/api/pnl-data", async (req, res) => {
  try {
    const snapshot = await db.ref("pnl_data").once("value");
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New endpoint to manually refresh all data
app.get("/api/refresh-all", async (req, res) => {
  console.log("🔄 Manual refresh initiated for all data...");
  try {
    const results = await Promise.allSettled([
      fetchFunds(),
      fetchHoldings(),
      fetchPositions(),
      fetchTrades(),
      fetchOpenOrders(),
      fetchPnLData()
    ]);
    
    // Check results for failures and report
    const individualResults = {};
    results.forEach((result, index) => {
      const functionNames = ["wallet", "portfolio", "positions", "trades", "openOrders", "pnlData"];
      individualResults[functionNames[index]] = {
        status: result.status,
        message: result.status === 'rejected' ? result.reason.message : 'success'
      };
    });

    res.json({
      success: true,
      message: "All data refresh attempted. Check individual status for details.",
      results: individualResults
    });
    console.log("✅ Manual refresh completed.");
  } catch (error) {
    console.error("❌ Error during manual refresh-all:", error.message);
    res.status(500).json({ 
      success: false,
      error: "An unexpected error occurred during manual refresh: " + error.message 
    });
  }
});

// ----------------------
// Start server
// ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Backend running on http://localhost:${PORT}`);
});










// const express = require("express");
// const admin = require("firebase-admin");
// require("dotenv").config({ debug: true }); // Enable dotenv debugging
// const { KiteConnect } = require("kiteconnect");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ----------------------
// // Initialize Firebase Admin
// // ----------------------
// try {
//   const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DATABASE_URL || "https://traderapp-7e61b-default-rtdb.firebaseio.com/"
//   });
//   console.log("🔥 Firebase Admin SDK initialized successfully.");
// } catch (error) {
//   console.error("❌ Error initializing Firebase Admin SDK:", error.message);
//   process.exit(1); // Exit on critical error
// }

// const db = admin.database();

// // ----------------------
// // Initialize Zerodha KiteConnect
// // ----------------------
// const kc = new KiteConnect({ api_key: process.env.API_KEY });

// // Function to refresh KiteConnect access token (placeholder)
// const refreshAccessToken = async () => {
//   // Implement your login flow or token refresh logic here
//   // Example: Use KiteConnect's generateSession with request_token
//   console.warn("⚠️ Access token refresh not implemented. Set ACCESS_TOKEN in .env or implement refresh logic.");
//   return process.env.ACCESS_TOKEN;
// };

// // Set access token
// const initializeKiteConnect = async () => {
//   try {
//     const accessToken = await refreshAccessToken();
//     if (accessToken) {
//       kc.setAccessToken(accessToken);
//       console.log("🔑 KiteConnect Access Token set.");
//     } else {
//       throw new Error("No ACCESS_TOKEN provided.");
//     }
//   } catch (error) {
//     console.error("❌ Error setting KiteConnect Access Token:", error.message);
//   }
// };
// initializeKiteConnect();

// // ----------------------
// // Helper Functions
// // ----------------------
// const toEpochMs = (ts) => {
//   if (!ts) return 0;
//   if (typeof ts === "number") return ts;
//   const s = String(ts).trim();
//   const d1 = new Date(s);
//   if (!isNaN(d1.getTime())) return d1.getTime();
//   const d2 = new Date(s.replace(" ", "T"));
//   return isNaN(d2.getTime()) ? 0 : d2.getTime();
// };

// // ----------------------
// // Fetch Wallet/Funds
// // ----------------------
// const fetchFunds = async () => {
//   try {
//     const margins = await kc.getMargins();
//     const equity = margins?.equity || {};
//     const commodity = margins?.commodity || {};

//     const walletData = {
//       net: equity.net ?? 0,
//       available: {
//         cash: equity.available?.cash ?? 0,
//         live_balance: equity.available?.live_balance ?? 0
//       },
//       used: {
//         m2m_unrealised: equity.used?.m2m_unrealised ?? 0
//       },
//       commodity_net: commodity.net ?? 0,
//       timestamp: Date.now()
//     };

//     await db.ref("wallet").set(walletData);
//     console.log("💰 Wallet updated successfully");
//     return walletData;
//   } catch (error) {
//     console.error("❌ Error fetching wallet:", error.message);
//     throw error;
//   }
// };

// // ----------------------
// // Fetch Portfolio Holdings
// // ----------------------
// const fetchHoldings = async () => {
//   try {
//     const holdings = await kc.getHoldings();
//     const portfolioData = holdings.map(holding => ({
//       tradingsymbol: holding.tradingsymbol || "",
//       quantity: holding.quantity || 0,
//       average_price: holding.average_price || 0,
//       last_price: holding.last_price || 0,
//       pnl: holding.pnl || 0,
//       day_change: holding.day_change || 0,
//       day_change_percentage: holding.day_change_percentage || 0
//     }));

//     await db.ref("portfolio").set(portfolioData);
//     console.log(`📦 Portfolio updated: ${portfolioData.length} items`);
//     return portfolioData;
//   } catch (error) {
//     console.error("❌ Error fetching portfolio:", error.message);
//     throw error;
//   }
// };

// // ----------------------
// // Fetch Positions
// // ----------------------
// const fetchPositions = async () => {
//   try {
//     const positions = await kc.getPositions();
//     const openPositions = (positions.net || []).map(position => ({
//       tradingsymbol: position.tradingsymbol || "",
//       quantity: position.quantity || 0,
//       average_price: position.average_price || 0,
//       last_price: position.last_price || 0,
//       pnl: position.pnl || 0,
//       m2m: position.m2m || 0,
//       status: "active"
//     }));

//     const positionsSummary = {
//       total_pnl: openPositions.reduce((sum, p) => sum + p.pnl, 0),
//       total_m2m: openPositions.reduce((sum, p) => sum + p.m2m, 0),
//       timestamp: Date.now()
//     };

//     await Promise.all([
//       db.ref("open_positions").set(openPositions),
//       db.ref("open_positions_summary").set(positionsSummary)
//     ]);
//     console.log(`📊 Positions updated: ${openPositions.length} items`);
//     return { positions: openPositions, summary: positionsSummary };
//   } catch (error) {
//     console.error("❌ Error fetching positions:", error.message);
//     throw error;
//   }
// };

// // ----------------------
// // Fetch Executed Trades
// // ----------------------
// const fetchTrades = async () => {
//   try {
//     const trades = await kc.getTrades();
//     const executedTrades = trades.map((trade) => {
//       const price = Number(trade.average_price ?? trade.price ?? 0);
//       const ts = toEpochMs(
//         trade.exchange_timestamp || trade.trade_timestamp || trade.order_timestamp || trade.timestamp
//       );

//       return {
//         tradingsymbol: trade.tradingsymbol || "",
//         type: trade.transaction_type || "",
//         qty: Number(trade.quantity ?? 0),
//         price,
//         avg_price: price,
//         exchange: trade.exchange || "",
//         product: trade.product || "",
//         order_id: trade.order_id || "",
//         timestamp: ts,
//         status: "complete"
//       };
//     });

//     executedTrades.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
//     await db.ref("executed_trades").set(executedTrades);
//     console.log(`💱 Executed trades updated: ${executedTrades.length} total`);
//     return executedTrades;
//   } catch (error) {
//     console.error("❌ Error fetching trades:", error.message);
//     throw error;
//   }
// };

// // ----------------------
// // Fetch Open Orders
// // ----------------------
// const fetchOpenOrders = async () => {
//   try {
//     const orders = await kc.getOrders();
//     const openOrders = orders
//       .filter(order => ["OPEN", "TRIGGER PENDING"].includes(order.status))
//       .map(order => ({
//         order_id: order.order_id,
//         tradingsymbol: order.tradingsymbol || "",
//         status: order.status || "",
//         product: order.product || "",
//         quantity: order.quantity || 0,
//         price: order.price || 0,
//         order_type: order.order_type || "",
//         exchange: order.exchange || "",
//         transaction_type: order.transaction_type || "",
//         variety: order.variety || "",
//         validity: order.validity || "",
//         timestamp: order.order_timestamp || ""
//       }));

//     openOrders.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
//     await db.ref("open_orders").set(openOrders);
//     console.log(`📝 Open orders updated: ${openOrders.length} items`);
//     return openOrders;
//   } catch (error) {
//     console.error("❌ Error fetching open orders:", error.message);
//     throw error;
//   }
// };

// // ----------------------
// // Fetch P&L Data
// // ----------------------
// const fetchPnLData = async () => {
//   try {
//     const positions = await kc.getPositions();
//     let unrealised = positions.net?.reduce((total, position) => total + (position.unrealised || 0), 0) || 0;

//     // Filter trades for today only (optional, uncomment to enable)
//     const today = new Date().toISOString().split('T')[0];
//     const trades = await kc.getTrades();
//     let realised = 0;
//     if (trades && Array.isArray(trades)) {
//       realised = trades
//         .filter(trade => {
//           const tradeDate = new Date(toEpochMs(trade.exchange_timestamp || trade.timestamp)).toISOString().split('T')[0];
//           return tradeDate === today; // Only include today's trades
//         })
//         .reduce((total, trade) => total + (trade.pnl || 0), 0);
//     }

//     const pnlData = {
//       unrealised,
//       realised,
//       total: unrealised + realised,
//       timestamp: Date.now()
//     };

//     await db.ref("pnl_data").set(pnlData);
//     console.log(`📈 P&L data updated: ₹${pnlData.total.toFixed(2)}`);
//     return pnlData;
//   } catch (error) {
//     console.error("❌ Error fetching P&L data:", error.message);
//     throw error;
//   }
// };

// // ----------------------
// // Initial Data Fetch
// // ----------------------
// const performInitialFetch = async () => {
//   console.log("🚀 Starting Zerodha Trade Tracker (React-compatible)...");
//   console.log("⏳ Performing initial data fetch...");
//   const fetchFunctions = [fetchFunds, fetchHoldings, fetchPositions, fetchTrades, fetchOpenOrders, fetchPnLData];
//   const results = await Promise.allSettled(fetchFunctions.map(fn => fn()));
//   results.forEach((result, index) => {
//     if (result.status === 'rejected') {
//       const functionNames = ["fetchFunds", "fetchHoldings", "fetchPositions", "fetchTrades", "fetchOpenOrders", "fetchPnLData"];
//       console.error(`❌ Initial fetch for ${functionNames[index]} failed:`, result.reason.message);
//     }
//   });
//   console.log("✅ Initial data fetch complete (check logs for individual failures).");
// };
// performInitialFetch();

// // ----------------------
// // Schedule Periodic Tasks
// // ----------------------
// const INTERVALS = {
//   FUNDS: parseInt(process.env.FUNDS_INTERVAL) || 60000, // 60 sec
//   HOLDINGS: parseInt(process.env.HOLDINGS_INTERVAL) || 120000, // 120 sec
//   POSITIONS: parseInt(process.env.POSITIONS_INTERVAL) || 30000, // 30 sec
//   TRADES: parseInt(process.env.TRADES_INTERVAL) || 20000, // 20 sec
//   OPEN_ORDERS: parseInt(process.env.OPEN_ORDERS_INTERVAL) || 30000, // 30 sec
//   PNL: parseInt(process.env.PNL_INTERVAL) || 60000 // 60 sec
// };

// console.log("⏰ Scheduling periodic data updates...");
// const scheduleWithErrorHandling = (fn, interval, name) => {
//   setInterval(async () => {
//     try {
//       await fn();
//     } catch (error) {
//       console.error(`❌ Error in periodic ${name}:`, error.message);
//     }
//   }, interval);
// };

// scheduleWithErrorHandling(fetchFunds, INTERVALS.FUNDS, "fetchFunds");
// scheduleWithErrorHandling(fetchHoldings, INTERVALS.HOLDINGS, "fetchHoldings");
// scheduleWithErrorHandling(fetchPositions, INTERVALS.POSITIONS, "fetchPositions");
// scheduleWithErrorHandling(fetchTrades, INTERVALS.TRADES, "fetchTrades");
// scheduleWithErrorHandling(fetchOpenOrders, INTERVALS.OPEN_ORDERS, "fetchOpenOrders");
// scheduleWithErrorHandling(fetchPnLData, INTERVALS.PNL, "fetchPnLData");
// console.log("✅ Periodic updates scheduled.");

// // ----------------------
// // API Endpoints
// // ----------------------
// app.get("/", (req, res) => {
//   res.json({
//     status: "🚀 Zerodha Trade Tracker Running (React-compatible)",
//     endpoints: [
//       "/api/wallet",
//       "/api/portfolio",
//       "/api/positions",
//       "/api/trades",
//       "/api/open-orders",
//       "/api/pnl-data",
//       "/api/refresh-all"
//     ],
//     timestamp: new Date().toISOString()
//   });
// });

// app.get("/api/wallet", async (req, res) => {
//   try {
//     const snapshot = await db.ref("wallet").once("value");
//     res.json(snapshot.val() || {});
//   } catch (error) {
//     res.status(500).json({ error: `Failed to fetch wallet: ${error.message}` });
//   }
// });

// app.get("/api/portfolio", async (req, res) => {
//   try {
//     const snapshot = await db.ref("portfolio").once("value");
//     res.json(snapshot.val() || []);
//   } catch (error) {
//     res.status(500).json({ error: `Failed to fetch portfolio: ${error.message}` });
//   }
// });

// app.get("/api/positions", async (req, res) => {
//   try {
//     const [positions, summary] = await Promise.all([
//       db.ref("open_positions").once("value"),
//       db.ref("open_positions_summary").once("value")
//     ]);
//     res.json({
//       positions: positions.val() || [],
//       summary: summary.val() || {}
//     });
//   } catch (error) {
//     res.status(500).json({ error: `Failed to fetch positions: ${error.message}` });
//   }
// });

// app.get("/api/trades", async (req, res) => {
//   try {
//     const snapshot = await db.ref("executed_trades").once("value");
//     res.json(snapshot.val() || []);
//   } catch (error) {
//     res.status(500).json({ error: `Failed to fetch trades: ${error.message}` });
//   }
// });

// app.get("/api/open-orders", async (req, res) => {
//   try {
//     const snapshot = await db.ref("open_orders").once("value");
//     res.json(snapshot.val() || []);
//   } catch (error) {
//     res.status(500).json({ error: `Failed to fetch open orders: ${error.message}` });
//   }
// });

// app.get("/api/pnl-data", async (req, res) => {
//   try {
//     const snapshot = await db.ref("pnl_data").once("value");
//     res.json(snapshot.val() || {});
//   } catch (error) {
//     res.status(500).json({ error: `Failed to fetch P&L data: ${error.message}` });
//   }
// });

// app.get("/api/refresh-all", async (req, res) => {
//   console.log("🔄 Manual refresh initiated for all data...");
//   try {
//     const results = await Promise.allSettled([
//       fetchFunds(),
//       fetchHoldings(),
//       fetchPositions(),
//       fetchTrades(),
//       fetchOpenOrders(),
//       fetchPnLData()
//     ]);

//     const individualResults = {};
//     const functionNames = ["wallet", "portfolio", "positions", "trades", "openOrders", "pnlData"];
//     results.forEach((result, index) => {
//       individualResults[functionNames[index]] = {
//         status: result.status,
//         message: result.status === 'rejected' ? result.reason.message : 'success'
//       };
//     });

//     res.json({
//       success: true,
//       message: "All data refresh attempted. Check individual status for details.",
//       results: individualResults
//     });
//     console.log("✅ Manual refresh completed.");
//   } catch (error) {
//     console.error("❌ Error during manual refresh-all:", error.message);
//     res.status(500).json({ 
//       success: false,
//       error: `Failed to refresh all data: ${error.message}`
//     });
//   }
// });

// // ----------------------
// // Start Server
// // ----------------------
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🌐 Backend running on http://localhost:${PORT}`);
// });