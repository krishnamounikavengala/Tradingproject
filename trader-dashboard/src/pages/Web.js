

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaHandshake, FaUsers, FaChartLine, FaShieldAlt, FaLightbulb, FaRobot, FaGlobe, FaMobileAlt, FaPhoneSlash, FaCommentSlash, FaBan, FaUserTie, FaLock, FaGraduationCap } from 'react-icons/fa';

// const FeaturesSection = ({ featureCards }) => {
//   const [currentCard, setCurrentCard] = useState(0);
//   const carouselRef = useRef(null);
//   const intervalRef = useRef(null);

//   // Start auto-rotation
//   useEffect(() => {
//     const startAutoRotation = () => {
//       if (!intervalRef.current) {
//         intervalRef.current = setInterval(() => {
//           setCurrentCard((prev) => (prev + 1) % featureCards.length);
//         }, 1000); // Rotate every 1 seconds
//       }
//     };
//     const stopAutoRotation = () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     };
//     startAutoRotation();
//     return () => stopAutoRotation();
//   }, []);

//   // Handle mouse enter to stop rotation
//   const handleMouseEnter = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   };

//   // Handle mouse leave to resume rotation
//   const handleMouseLeave = () => {
//     if (!intervalRef.current) {
//       intervalRef.current = setInterval(() => {
//         setCurrentCard((prev) => (prev + 1) % featureCards.length);
//       }, 1000);
//     }
//   };

//   return (
//     <section id="features-section" style={{
//       width: '100%',
//       padding: '1rem 0',
//       margin: '1rem 0',
//       textAlign: 'center'
//     }}>
//       <h2 style={{
//         fontSize: '3.5rem',
//         color: '#e0e0e0',
//         lineHeight: '1.2',
//         marginBottom: '1.5rem',
//         fontWeight: '800'
//       }}>
//         Our <span style={{ color: '#1e90ff' }}>Features</span>
//       </h2>
//       <div className="carousel-container" style={{
//         position: 'relative',
//         height: '500px',
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         perspective: '1200px',
//         overflow: 'hidden'
//       }} ref={carouselRef}>
//         {featureCards.map((card, index) => {
//           const totalCards = featureCards.length;
//           const position = (index - currentCard + totalCards) % totalCards;
//           let translateZ, translateX, rotateY, opacity, scale;
//           if (position === 0) {
//             translateZ = 0;
//             translateX = 0;
//             rotateY = 0;
//             opacity = 1;
//             scale = 1;
//           } else if (position === 1 || position === totalCards - 1) {
//             translateZ = -150;
//             translateX = position === 1 ? 250 : -250;
//             rotateY = position === 1 ? -30 : 30;
//             opacity = 0.8;
//             scale = 0.9;
//           } else if (position === 2 || position === totalCards - 2) {
//             translateZ = -300;
//             translateX = position === 2 ? 400 : -400;
//             rotateY = position === 2 ? -45 : 45;
//             opacity = 0.5;
//             scale = 0.8;
//           } else {
//             translateZ = -500;
//             translateX = position < totalCards / 2 ? 600 : -600;
//             rotateY = position < totalCards / 2 ? -60 : 60;
//             opacity = 0;
//             scale = 0.7;
//           }
//           return (
//             <div
//               key={index}
//               className="carousel-card"
//               style={{
//                 position: 'absolute',
//                 width: '350px',
//                 height: '420px',
//                 background: 'linear-gradient(145deg, rgba(30, 35, 50, 0.9), rgba(20, 25, 40, 0.9))',
//                 borderRadius: '20px',
//                 padding: '2.5rem',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
//                 transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
//                 opacity: opacity,
//                 transition: 'transform 0.7s cubic-bezier(0.17, 0.67, 0.83, 0.67), opacity 0.7s ease',
//                 zIndex: 10 - Math.abs(position),
//                 cursor: 'pointer',
//                 backfaceVisibility: 'hidden',
//                 border: '1px solid rgba(76, 201, 240, 0.2)'
//               }}
//               onClick={() => setCurrentCard(index)}
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//             >
//               <div style={{
//                 width: '80px',
//                 height: '80px',
//                 borderRadius: '50%',
//                 background: 'linear-gradient(135deg, #4361ee, #4cc9f0)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginBottom: '2rem',
//                 color: 'white',
//                 boxShadow: '0 0 20px rgba(76, 201, 240, 0.5)'
//               }}>
//                 {typeof card.icon === 'string' ? (
//                   <span style={{ fontSize: '2rem' }}>{card.icon}</span>
//                 ) : (
//                   <card.icon size={32} />
//                 )}
//               </div>
//               <h3 style={{
//                 fontSize: '1.8rem',
//                 fontWeight: '700',
//                 color: '#e0e0e0',
//                 marginBottom: '1.5rem',
//                 textAlign: 'center'
//               }}>
//                 {card.title}
//               </h3>
//               <p style={{
//                 color: '#a0a0b0',
//                 lineHeight: '1.6',
//                 fontSize: '1.1rem',
//                 textAlign: 'center'
//               }}>
//                 {card.text}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         marginTop: '2rem',
//         gap: '0.8rem'
//       }}>
//         {featureCards.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentCard(index)}
//             style={{
//               width: '12px',
//               height: '12px',
//               borderRadius: '50%',
//               border: 'none',
//               background: currentCard === index ? '#1e90ff' : 'rgba(30, 144, 255, 0.3)',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease'
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// const VunathiCapital = () => {
//   const navigate = useNavigate();
//   const carouselRef = useRef(null);
//   const [stats, setStats] = useState({
//     portfolioValue: 18700000000,
//     activeUsers: 543000,
//     avgReturn: 11.2,
//     tradingVolume: 2400000000
//   });
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [typedText, setTypedText] = useState('');
//   const featureCards = [
//     {
//       icon: FaShieldAlt,
//       title: 'Secure Platform',
//       text: 'Your data and investments are protected with bank-level security and encryption protocols.'
//     },
//     {
//       icon: FaLightbulb,
//       title: 'Smart Insights',
//       text: 'AI-powered investment recommendations and personalized portfolio suggestions based on your goals.'
//     },
//     {
//       icon: FaRobot,
//       title: 'AI Algorithms',
//       text: 'Our sophisticated algorithms continuously analyze market trends to optimize your investment strategy.'
//     },
//     {
//       icon: FaGlobe,
//       title: 'Global Diversification',
//       text: 'Diversify your portfolio across global markets to maximize returns and minimize risk.'
//     },
//     {
//       icon: FaMobileAlt,
//       title: 'Mobile Access',
//       text: 'Manage your investments on the go with our intuitive mobile application.'
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStats(prev => ({
//         portfolioValue: prev.portfolioValue + Math.random() * 1000000 - 500000,
//         activeUsers: prev.activeUsers + Math.random() * 100 - 50,
//         avgReturn: Math.max(5, prev.avgReturn + (Math.random() * 0.2 - 0.1)),
//         tradingVolume: prev.tradingVolume + Math.random() * 500000 - 250000
//       }));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const text = 'built with love for Indians who love to invest & trade';
//     const typeText = () => {
//       let i = 0;
//       setTypedText('');
//       const typingInterval = setInterval(() => {
//         setTypedText(text.slice(0, i + 1));
//         i++;
//         if (i === text.length) {
//           clearInterval(typingInterval);
//           setTimeout(() => {
//             typeText();
//           }, 1000);
//         }
//       }, 80);
//     };
//     typeText();
//     return () => clearInterval();
//   }, []);

//   const formatNumber = (num) => {
//     if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
//     if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
//     if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
//     return `$${num}`;
//   };

//   const handleGetStarted = () => {
//     document.getElementById('signup-section').scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleLearnMore = () => {
//     document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   return (
//     <div style={{
//       background: 'linear-gradient(135deg, #0a0e17 0%, #1a2639 100%)',
//       color: '#e0e0e0',
//       minHeight: '100vh',
//       display: 'flex',
//       flexDirection: 'column',
//       padding: '0',
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//       position: 'relative',
//       overflow: 'hidden'
//     }}>
//       <style jsx>{`
//         @keyframes orbit-1 { from { transform: rotateZ(0deg); } to { transform: rotateZ(360deg); } }
//         @keyframes orbit-2 { from { transform: rotateZ(0deg); } to { transform: rotateZ(-360deg); } }
//         @keyframes orbit-3 { from { transform: rotateZ(0deg); } to { transform: rotateZ(360deg); } }
//         @keyframes orbit-4 { from { transform: rotateZ(0deg); } to { transform: rotateZ(-360deg); } }
//         @keyframes float { 0%,100%{transform:translateY(0px) rotateY(0deg);}50%{transform:translateY(-10px) rotateY(180deg);} }
//         @keyframes pulse { 0%,100%{opacity:0.3; transform:scale(1);}50%{opacity:0.6; transform:scale(1.1);} }
//         @keyframes glow { 0%,100%{box-shadow:0 0 10px rgba(76, 201, 240, 0.5);}50%{box-shadow:0 0 20px rgba(76, 201, 240, 0.8),0 0 30px rgba(76, 201, 240, 0.4);} }
//         @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
//         @keyframes heartbeat { 0% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.3); } 70% { transform: scale(1); } }
//         @media (max-width: 768px) {
//           header {
//             padding: 1rem 1.5rem !important;
//           }
//           header > div {
//             fontSize: 1.2rem !important;
//           }
//           main {
//             padding: 0 1.5rem !important;
//           }
//           section {
//             flex-direction: column !important;
//           }
//           section > div:first-child {
//             padding-right: 0 !important;
//             text-align: center;
//           }
//           section > div:last-child {
//             height: 300px !important;
//             margin-top: 2rem;
//           }
//           h1 {
//             font-size: 2.5rem !important;
//           }
//           p {
//             font-size: 1rem !important;
//             margin-bottom: 1.5rem !important;
//           }
//           button {
//             padding: 0.5rem 1.2rem !important;
//             font-size: 1rem !important;
//           }
//           div[style*="gridTemplateColumns"] {
//             grid-template-columns: 1fr !important;
//           }
//           div[style*="flexWrap"] {
//             gap: 1.5rem !important;
//           }
//           div[style*="flex:1"][style*="minWidth:280px"] {
//             padding: 1.5rem !important;
//           }
//           section[id="signup-section"] {
//             padding: 2.5rem 1.5rem !important;
//           }
//           section[id="signup-section"] h2 {
//             font-size: 2rem !important;
//           }
//           footer {
//             padding: 2rem 1.5rem !important;
//           }
//           footer > div > div {
//             font-size: 1.5rem !important;
//           }
//           #about .container {
//             flex-direction: column !important;
//             gap: 2rem !important;
//           }
//           #about .md\:w-1\/2 {
//             width: 100% !important;
//           }
//           #about h2 {
//             font-size: 3rem !important;
//           }
//           #about p {
//             font-size: 0.95rem !important;
//             text-align: center !important;
//           }
//           #about .relative.w-96.h-96 {
//             width: 280px !important;
//             height: 280px !important;
//           }
//           #about .text-9xl {
//             font-size: 6rem !important;
//           }
//           #about .text-8xl {
//             font-size: 5rem !important;
//           }
//           #about .text-6xl {
//             font-size: 3.5rem !important;
//           }
//           .carousel-container {
//             height: 400px !important;
//           }
//           .carousel-card {
//             width: 280px !important;
//             height: 350px !important;
//             padding: 1.5rem !important;
//           }
//           #user-first-section {
//             flex-direction: column-reverse !important;
//             padding: 1.5rem !important;
//           }
//           #user-first-section > div:last-child {
//             height: 280px !important;
//             max-width: 100% !important;
//             overflow: hidden !important;
//           }
//           #user-first-section .animation-container {
//             width: 280px !important;
//             height: 280px !important;
//           }
//         }
//         @media (max-width: 480px) {
//           header {
//             padding: 0.8rem 1rem !important;
//           }
//           header > div {
//             fontSize: 1rem !important;
//           }
//           nav button {
//             padding: 0.4rem 1rem !important;
//             font-size: 0.8rem !important;
//           }
//           main {
//             padding: 0 1rem !important;
//           }
//           h1 {
//             font-size: 2rem !important;
//           }
//           p {
//             font-size: 0.9rem !important;
//           }
//           div[style*="gap:1rem"] button {
//             padding: 0.5rem 1.2rem !important;
//             font-size: 0.9rem !important;
//           }
//           div[style*="padding:2rem"] {
//             padding: 1.5rem !important;
//           }
//           div[style*="font-size:2.2rem"] {
//             font-size: 1.8rem !important;
//           }
//           section[id="signup-section"] h2 {
//             font-size: 1.8rem !important;
//           }
//           section[id="signup-section"] p {
//             font-size: 1rem !important;
//           }
//           section[id="signup-section"] button {
//             padding: 0.8rem 2rem !important;
//             font-size: 1.1rem !important;
//           }
//           #about h2 {
//             font-size: 2.5rem !important;
//           }
//           #about .relative.w-96.h-96 {
//             width: 220px !important;
//             height: 220px !important;
//           }
//           #about .text-9xl {
//             font-size: 5rem !important;
//           }
//           #about .text-8xl {
//             font-size: 4rem !important;
//           }
//           #about .text-6xl {
//             font-size: 3rem !important;
//           }
//           .carousel-container {
//             height: 350px !important;
//           }
//           .carousel-card {
//             width: 240px !important;
//             height: 320px !important;
//             padding: 1.2rem !important;
//           }
//           #user-first-section > div:last-child {
//             height: 240px !important;
//           }
//           #user-first-section .animation-container {
//             width: 240px !important;
//             height: 240px !important;
//           }
//         }
//       `}</style>
//       <header style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: '1rem 3rem',
//         background: isScrolled ? 'rgba(10, 14, 23, 0.95)' : 'transparent',
//         backdropFilter: isScrolled ? 'blur(10px)' : 'none',
//         borderBottom: isScrolled ? '1px solid rgba(76, 201, 240, 0.1)' : 'none',
//         zIndex: 1000,
//         transition: 'all 0.3s ease'
//       }}>
//         <h2 style={{
//           fontSize: '2rem',
//           color: '#e0e0e0',
//           lineHeight: '1.2',
//           margin: 0,
//           fontWeight: '800'
//         }}>
//           <span style={{ color: '#1e90ff' }}>VUNATHI</span> CAPITAL
//         </h2>
//         <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
//           <button
//             onClick={handleLogin}
//             style={{
//               background: 'linear-gradient(90deg, #4361ee, #4cc9f0)',
//               color: 'white',
//               border: 'none',
//               padding: '0.6rem 1.5rem',
//               borderRadius: '50px',
//               fontWeight: '600',
//               cursor: 'pointer',
//               transition: 'transform 0.3s, box-shadow 0.3s',
//               fontSize: '0.9rem'
//             }} onMouseOver={(e) => {
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 5px 15px rgba(67, 97, 238, 0.4)';
//             }} onMouseOut={(e) => {
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = 'none';
//             }}>
//             LOGIN
//           </button>
//         </nav>
//       </header>
//       <main style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         width: '100%',
//         maxWidth: '100%',
//         padding: '0 3rem',
//         marginTop: '8rem',
//         position: 'relative',
//         zIndex: 5
//       }}>
//         <section style={{
//           display: 'flex',
//           flexDirection: 'row',
//           width: '100%',
//           gap: '3rem',
//           marginBottom: '5rem',
//           padding: '2rem 0'
//         }}>
//           <div style={{
//             flex: '1',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             paddingRight: '2rem'
//           }}>
//             <h2 style={{
//               fontSize: '3.5rem',
//               color: '#e0e0e0',
//               lineHeight: '1.2',
//               marginBottom: '1.5rem',
//               fontWeight: '800'
//             }}>
//               Smart <span style={{ color: '#1e90ff' }}>Investments</span> <span style={{ color: '#1e90ff' }}>Exceptional</span> Returns
//             </h2>
//             <p style={{
//               fontSize: '1.4rem',
//               color: '#a0a0b0',
//               margin: '0 0 2.5rem',
//               lineHeight: '1.6'
//             }}>
//               We strategically diversify your investments across carefully selected stocks and market indices,
//               maximizing returns while minimizing risk through our advanced algorithmic approach.
//             </p>
//             <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
//               <button onClick={handleGetStarted} style={{
//                 background: 'linear-gradient(90deg, #2a5298, #1e90ff)',
//                 color: 'white',
//                 border: 'none',
//                 padding: '0.6rem 1.5rem',
//                 fontSize: '1rem',
//                 fontWeight: '500',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 boxShadow: '0 2px 5px rgba(30, 144, 255, 0.2)',
//                 transition: 'transform 0.2s, box-shadow 0.2s'
//               }} onMouseOver={(e) => {
//                 e.target.style.transform = 'translateY(-1px)';
//                 e.target.style.boxShadow = '0 4px 10px rgba(30, 144, 255, 0.3)';
//               }} onMouseOut={(e) => {
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = '0 2px 5px rgba(30, 144, 255, 0.2)';
//               }}>
//                 GET STARTED
//               </button>
//               <button onClick={handleLearnMore} style={{
//                 background: 'transparent',
//                 color: '#1e90ff',
//                 border: '2px solid #1e90ff',
//                 padding: '0.6rem 1.5rem',
//                 fontSize: '1rem',
//                 fontWeight: '500',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s'
//               }} onMouseOver={(e) => {
//                 e.target.style.background = 'rgba(30, 144, 255, 0.1)';
//                 e.target.style.transform = 'translateY(-1px)';
//               }} onMouseOut={(e) => {
//                 e.target.style.background = 'transparent';
//                 e.target.style.transform = 'translateY(0)';
//               }}>
//                 LEARN MORE
//               </button>
//             </div>
//           </div>
//           <div style={{
//             flex: '1',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             position: 'relative'
//           }}>
//             <div style={{
//               position: 'relative',
//               perspective: '1000px',
//               transformStyle: 'preserve-3d',
//               height: '400px',
//               width: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}>
//               {[1, 2, 3, 4].map((ring, index) => {
//                 const radius = 80 + (index * 60);
//                 const duration = 15 + (index * 5);
//                 const opacity = 0.8 - (index * 0.15);
//                 return (
//                   <div
//                     key={ring}
//                     style={{
//                       position: 'absolute',
//                       top: '50%',
//                       left: '50%',
//                       border: '1px solid rgba(76, 201, 240, 0.4)',
//                       borderRadius: '50%',
//                       width: `${radius * 2}px`,
//                       height: `${radius * 2}px`,
//                       marginLeft: `-${radius}px`,
//                       marginTop: `-${radius}px`,
//                       opacity: opacity,
//                       animation: `orbit-${ring} ${duration}s linear infinite`,
//                       boxShadow: `0 0 20px rgba(6, 182, 212, ${opacity * 0.5}), inset 0 0 20px rgba(6, 182, 212, ${opacity * 0.3})`
//                     }}
//                   >
//                     {[0, 90, 180, 270].slice(0, ring).map((angle, dotIndex) => (
//                       <div key={dotIndex} style={{
//                         position: 'absolute',
//                         width: '8px',
//                         height: '8px',
//                         backgroundColor: '#1e90ff',
//                         borderRadius: '50%',
//                         top: '50%',
//                         left: '50%',
//                         transform: `rotate(${angle}deg) translateX(${radius}px) translateY(-50%)`,
//                         boxShadow: '0 0 10px rgba(76, 201, 240, 0.8)'
//                       }} />
//                     ))}
//                   </div>
//                 );
//               })}
//               <div style={{
//                 position: 'relative',
//                 zIndex: 10,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}>
//                 <div style={{
//                   width: '160px',
//                   height: '160px',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   position: 'relative',
//                   background: `radial-gradient(circle at 30% 30%, #f7931a20, #f7931a10, rgba(0,0,0,0.3))`,
//                   border: `2px solid #f7931a80`,
//                   boxShadow: `
//                     0 0 30px #f7931a60,
//                     0 0 60px #f7931a40,
//                     inset 0 0 20px #f7931a20
//                   `,
//                   animation: 'float 3s ease-in-out infinite'
//                 }}>
//                   <img
//                     src="/Logo.png"
//                     alt="Vunathi Capital"
//                     style={{
//                       width: '80px',
//                       height: '80px',
//                       borderRadius: '50%',
//                       filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
//                     }}
//                   />
//                   <div style={{
//                     position: 'absolute',
//                     top: '20px',
//                     right: '20px',
//                     bottom: '20px',
//                     left: '20px',
//                     borderRadius: '50%',
//                     opacity: 0.3,
//                     background: `radial-gradient(circle, #f7931a, transparent 70%)`,
//                     animation: 'pulse 2s ease-in-out infinite'
//                   }} />
//                 </div>
//                 <div style={{ marginTop: '2rem', textAlign: 'center' }}>
//                   <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem' }}>
//                     Algorithmic Excellence
//                   </h2>
//                   <p style={{ color: '#a0a0b0', fontSize: '1.1rem' }}>
//                     AI-powered investment strategies
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section id="about" style={{
//           width: '100%',
//           marginBottom: '2rem',
//           padding: '2rem 0',
//         }}>
//           <div style={{
//             maxWidth: '1200px',
//             margin: '0 auto',
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: '4rem',
//           }}>
//             <motion.div
//               initial={{ opacity: 0, x: -50, rotateY: -10 }}
//               whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8 }}
//               style={{ flex: '1', display: 'flex', justifyContent: 'center' }}
//             >
//               <div style={{
//                 position: 'relative',
//                 width: '380px',
//                 height: '380px',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 background: 'rgba(30, 35, 50, 0.4)',
//                 backdropFilter: 'blur(10px)',
//                 border: '2px solid rgba(76, 201, 240, 0.3)',
//                 boxShadow: '0 0 40px rgba(76, 201, 240, 0.2)'
//               }}>
//                 <FaHandshake style={{
//                   color: 'rgba(76, 201, 240, 0.6)',
//                   fontSize: '8rem',
//                   position: 'absolute',
//                   transform: 'rotate(-12deg) translateX(40px) translateY(-40px)'
//                 }} />
//                 <FaUsers style={{
//                   color: 'rgba(76, 201, 240, 0.6)',
//                   fontSize: '7rem',
//                   position: 'absolute',
//                   transform: 'rotate(6deg) translateX(-40px) translateY(40px)'
//                 }} />
//                 <div style={{
//                   position: 'absolute',
//                   width: '200px',
//                   height: '200px',
//                   background: 'rgba(76, 201, 240, 0.15)',
//                   borderRadius: '50%',
//                   filter: 'blur(40px)'
//                 }}></div>
//                 <div style={{
//                   position: 'absolute',
//                   fontSize: '4rem',
//                   fontWeight: '800',
//                   color: '#e0e0e0',
//                   transform: 'rotate(3deg) translateX(20px)',
//                   textShadow: '0 5px 20px rgba(0,0,0,0.5)'
//                 }}>TRUST</div>
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8 }}
//               style={{ flex: '1', textAlign: 'left' }}
//             >
//               <h2 style={{
//                 fontSize: '3.5rem',
//                 color: '#e0e0e0',
//                 lineHeight: '1.2',
//                 marginBottom: '1.5rem',
//                 fontWeight: '800'
//               }}>
//                 Your <span style={{ color: '#1e90ff' }}>Trusted Partner</span> in Wealth Growth
//               </h2>
//               <p style={{
//                 fontSize: '1.2rem',
//                 color: '#a0a0b0',
//                 lineHeight: '1.6',
//                 marginBottom: '1.5rem'
//               }}>
//                 At Vunathi Capital, we are dedicated to democratizing investment opportunities. Our mission is to empower individuals to achieve their financial goals through intelligent, diversified, and accessible investment solutions. We believe in transparency, technology, and putting our investors first.
//               </p>
//             </motion.div>
//           </div>
//         </section>
//         <FeaturesSection featureCards={featureCards} />

//         <section style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           textAlign: 'center',
//           marginBottom: '2rem',
//           padding: '2rem 0'
//         }}>
//           <FaGraduationCap style={{ fontSize: '3rem', color: '#1e90ff', marginBottom: '1rem' }} />
//           <h2 style={{
//             fontSize: '2.5rem',
//             color: '#e0e0e0',
//             lineHeight: '1.2',
//             marginBottom: '1.5rem',
//             fontWeight: '900'
//           }}>
//           Finance  <span style={{ color: '#1e90ff' }}>simplified</span>,
//           </h2>
//           <h2 style={{
//             fontSize: '2.5rem',
//             color: '#e0e0e0',
//             lineHeight: '1.2',
//             marginBottom: '1.5rem',
//             fontWeight: '900'
//           }}>
//           in your <span style={{ color: '#1e90ff' }}>language</span>.
//           </h2>
//         </section>
        
//         <section style={{
//           width: '100%',
//           padding: '4rem 0',
//           margin: '4rem 0',
//         }}>
//           <div style={{
//             maxWidth: '1200px',
//             margin: '0 auto',
//             display: 'grid',
//             gridTemplateColumns: '1fr 1fr',
//             gap: '2rem',
//             textAlign: 'center'
//           }}>
//             <motion.div
//               initial={{ opacity: 0, x: -100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8, ease: 'easeOut' }}
//               style={{
//                 background: 'rgba(255, 255, 255, 0.05)',
//                 backdropFilter: 'blur(10px)',
//                 padding: '2.5rem',
//                 borderRadius: '15px',
//                 border: '1px solid rgba(255, 255, 255, 0.1)',
//                 transform: 'scale(1)',
//                 transition: 'transform 0.3s'
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'scale(1.05)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'scale(1)';
//               }}
//             >
//               <FaShieldAlt style={{
//                 fontSize: '3.5rem',
//                 color: '#1e90ff',
//                 margin: '0 auto 1.5rem',
//                 display: 'block'
//               }} />
//               <h3 style={{
//                 fontSize: '2rem',
//                 fontWeight: '800',
//                 color: '#e0e0e0',
//                 marginBottom: '1.5rem'
//               }}>Our <span style={{ color: '#1e90ff' }}>Vision</span></h3>
//               <p style={{
//                 fontSize: '1.1rem',
//                 color: '#a0a0b0',
//                 lineHeight: '1.6'
//               }}>
//                 To empower investors with simple, transparent, and tech-driven wealth management, making sophisticated investing accessible to everyone.
//               </p>
//             </motion.div>

            
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
//               style={{
//                 background: 'rgba(255, 255, 255, 0.05)',
//                 backdropFilter: 'blur(10px)',
//                 padding: '2.5rem',
//                 borderRadius: '15px',
//                 border: '1px solid rgba(255, 255, 255, 0.1)',
//                 transform: 'scale(1)',
//                 transition: 'transform 0.3s'
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'scale(1.05)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'scale(1)';
//               }}
//             >
//               <FaChartLine style={{
//                 fontSize: '3.5rem',
//                 color: '#1e90ff',
//                 margin: '0 auto 1.5rem',
//                 display: 'block'
//               }} />
//               <h3 style={{
//                 fontSize: '2rem',
//                 fontWeight: '800',
//                 color: '#e0e0e0',
//                 marginBottom: '1.5rem'
//               }}>Our <span style={{ color: '#1e90ff' }}>Mission</span></h3>
//               <p style={{
//                 fontSize: '1.1rem',
//                 color: '#a0a0b0',
//                 lineHeight: '1.6'
//               }}>
//                 To deliver long-term trust and sustainable returns with minimal complexity, fostering a community of informed and successful investors.
//               </p>
//             </motion.div>
//           </div>
//         </section>

        
//         <section id="user-first-section" style={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           width: '100%',
//           gap: '6rem',
//           marginBottom: '5rem',
//           padding: '2rem 4rem',
//           overflow: 'hidden'
//         }}>
//           <div style={{
//             flex: 1,
//             display: 'flex',
//             flexDirection: 'column'
//           }}>
//             <h2 style={{
//               fontSize: '3.5rem',
//               color: '#e0e0e0',
//               lineHeight: '1.2',
//               marginBottom: '1rem',
//               fontWeight: '800'
//             }}>
//               Always Keeping You <span style={{ color: '#1e90ff' }}>First</span>
//             </h2>
//             <p style={{
//               fontSize: '1.2rem',
//               color: '#a0a0b0',
//               marginBottom: '2.5rem',
//               lineHeight: '1.6'
//             }}>
//               Our users - traders & investors - will always be our priority, even when we're building new features or delivering customer support everyday.
//             </p>
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: '1fr 1fr',
//               gap: '1.5rem',
//               marginBottom: '2.5rem',
//               justifyContent: 'space-between'
//             }}>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: 0 }}
//                   style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
//                 >
//                   <FaUserTie size={24} style={{ color: '#1e90ff' }} />
//                   <span style={{ fontSize: '1.1rem', color: '#a0a0b0' }}>No Relationship Managers</span>
//                 </motion.div>
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
//                 >
//                   <FaBan size={24} style={{ color: '#1e90ff' }} />
//                   <span style={{ fontSize: '1.1rem', color: '#a0a0b0' }}>No Spam</span>
//                 </motion.div>
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: 0.4 }}
//                   style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
//                 >
//                   <FaLock size={24} style={{ color: '#1e90ff' }} />
//                   <span style={{ fontSize: '1.1rem', color: '#a0a0b0' }}>No Data Sharing</span>
//                 </motion.div>
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start', marginLeft: '2rem' }}>
//                 <motion.div
//                   initial={{ opacity: 0, x: 10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: 0.1 }}
//                   style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
//                 >
//                   <FaPhoneSlash size={24} style={{ color: '#1e90ff' }} />
//                   <span style={{ fontSize: '1.1rem', color: '#a0a0b0' }}>No Calls</span>
//                 </motion.div>
//                 <motion.div
//                   initial={{ opacity: 0, x: 10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: 0.3 }}
//                   style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
//                 >
//                   <FaShieldAlt size={24} style={{ color: '#1e90ff' }} />
//                   <span style={{ fontSize: '1.1rem', color: '#a0a0b0' }}>No Unauthorized Access</span>
//                 </motion.div>
//                 <motion.div
//                   initial={{ opacity: 0, x: 10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: 0.5 }}
//                   style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
//                 >
//                   <FaCommentSlash size={24} style={{ color: '#1e90ff' }} />
//                   <span style={{ fontSize: '1.1rem', color: '#a0a0b0' }}>No SMS</span>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//           <motion.div
//             initial={{ opacity: 0, x: 100 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ type: 'spring', stiffness: 120, damping: 15 }}
//             style={{
//               flex: 1,
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               position: 'relative',
//               height: '400px',
//               maxWidth: '400px',
//               overflow: 'hidden'
//             }}
//           >
//             <div className="animation-container" style={{
//               position: 'relative',
//               width: '300px',
//               height: '300px',
//               perspective: '1000px',
//               transformStyle: 'preserve-3d',
//               background: 'radial-gradient(circle, rgba(76, 201, 240, 0.1) 0%, transparent 70%)',
//               transform: 'translateX(-20px)'
//             }}>
//               <motion.div
//                 animate={{
//                   rotateY: [0, 360],
//                   scale: [1, 1.1, 1]
//                 }}
//                 transition={{
//                   rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
//                   scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
//                 }}
//                 style={{
//                   position: 'absolute',
//                   top: '50%',
//                   left: '50%',
//                   width: '120px',
//                   height: '120px',
//                   background: 'linear-gradient(135deg, #4cc9f0, #4361ee)',
//                   borderRadius: '15px',
//                   transform: 'translate(-50%, -50%)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   boxShadow: '0 0 30px rgba(76, 201, 240, 0.6)',
//                   zIndex: 10,
//                   animation: 'glow 3s ease-in-out infinite'
//                 }}
//               >
//                 <FaShieldAlt size={48} style={{ color: 'white', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
//               </motion.div>
//               {[0, 90, 180, 270].map((angle, index) => (
//                 <motion.div
//                   key={index}
//                   animate={{
//                     rotateZ: [angle, angle + 360]
//                   }}
//                   transition={{
//                     duration: 10 + index * 2,
//                     repeat: Infinity,
//                     ease: 'linear'
//                   }}
//                   style={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     width: '180px',
//                     height: '180px',
//                     transform: 'translate(-50%, -50%)',
//                     transformOrigin: 'center'
//                   }}
//                 >
//                   <motion.div
//                     animate={{
//                       y: [-10, 10, -10],
//                       rotateX: [0, 15, 0]
//                     }}
//                     transition={{
//                       duration: 3 + index * 0.5,
//                       repeat: Infinity,
//                       ease: 'easeInOut'
//                     }}
//                     style={{
//                       position: 'absolute',
//                       top: '0',
//                       left: '50%',
//                       width: '50px',
//                       height: '50px',
//                       background: 'linear-gradient(135deg, rgba(76, 201, 240, 0.2), rgba(67, 97, 238, 0.2))',
//                       borderRadius: '10px',
//                       transform: 'translateX(-50%)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       border: '1px solid rgba(76, 201, 240, 0.3)',
//                       backdropFilter: 'blur(8px)',
//                       boxShadow: '0 5px 15px rgba(76, 201, 240, 0.3)'
//                     }}
//                   >
//                     {[FaPhoneSlash, FaCommentSlash, FaBan, FaUserTie][index] &&
//                       React.createElement([FaPhoneSlash, FaCommentSlash, FaBan, FaUserTie][index], {
//                         size: 20,
//                         style: { color: '#1e90ff', filter: 'drop-shadow(0 0 4px rgba(76, 201, 240, 0.5))' }
//                       })}
//                   </motion.div>
//                 </motion.div>
//               ))}
//               {Array.from({ length: 8 }).map((_, index) => (
//                 <motion.div
//                   key={`particle-${index}`}
//                   animate={{
//                     x: [0, Math.sin(index * 0.8) * 80, 0],
//                     y: [0, Math.cos(index * 0.8) * 80, 0],
//                     opacity: [0.3, 0.8, 0.3],
//                     scale: [0.8, 1.5, 0.8]
//                   }}
//                   transition={{
//                     duration: 4 + index * 0.3,
//                     repeat: Infinity,
//                     ease: 'easeInOut',
//                     delay: index * 0.2
//                   }}
//                   style={{
//                     position: 'absolute',
//                     top: `${30 + (index * 8)}%`,
//                     left: `${30 + (index * 8)}%`,
//                     width: '6px',
//                     height: '6px',
//                     borderRadius: '50%',
//                     background: '#1e90ff',
//                     boxShadow: '0 0 8px rgba(76, 201, 240, 0.8)',
//                     zIndex: 5
//                   }}
//                 />
//               ))}
//               {[1, 2].map((ring, index) => (
//                 <motion.div
//                   key={`ring-${index}`}
//                   animate={{
//                     rotateX: [0, 360],
//                     opacity: [0.4, 0.7, 0.4]
//                   }}
//                   transition={{
//                     rotateX: { duration: 6 + index * 2, repeat: Infinity, ease: 'linear' },
//                     opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
//                   }}
//                   style={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     width: `${120 + index * 40}px`,
//                     height: `${120 + index * 40}px`,
//                     border: '1px solid rgba(76, 201, 240, 0.3)',
//                     borderRadius: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     boxShadow: '0 0 15px rgba(76, 201, 240, 0.2)'
//                   }}
//                 />
//               ))}
//               {['SECURE', 'TRUST', 'SUCCESS'].map((text, index) => (
//                 <motion.div
//                   key={text}
//                   animate={{
//                     rotateZ: [0, 360],
//                     scale: [0.8, 1.1, 0.8]
//                   }}
//                   transition={{
//                     rotateZ: { duration: 12 + index * 4, repeat: Infinity, ease: 'linear' },
//                     scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
//                   }}
//                   style={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     width: '200px',
//                     height: '200px',
//                     transform: 'translate(-50%, -50%)',
//                     transformOrigin: 'center'
//                   }}
//                 >
//                   <div style={{
//                     position: 'absolute',
//                     top: `${index * 50}%`,
//                     left: '100%',
//                     transform: 'translateX(-50%)',
//                     fontSize: '0.9rem',
//                     fontWeight: '600',
//                     color: '#1e90ff',
//                     textShadow: '0 0 8px rgba(76, 201, 240, 0.5)',
//                     whiteSpace: 'nowrap'
//                   }}>
//                     {text}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </section>
//         <section id="signup-section" style={{
//           width: '100%',
//           padding: '4rem',
//           margin: '4rem 0',
//           textAlign: 'center',
//           border: 'none'
//         }}>
//           <h2 style={{
//             fontSize: '3.5rem',
//             color: '#e0e0e0',
//             lineHeight: '1.2',
//             marginBottom: '1.5rem',
//             fontWeight: '800'
//           }}>
//             Ready to<span style={{ color: '#1e90ff' }}> Grow Your</span> Wealth ?
//           </h2>
//           <p style={{
//             fontSize: '1.3rem',
//             color: '#a0a0b0',
//             marginBottom: '2.5rem',
//             maxWidth: '800px',
//             margin: '0 auto 2.5rem',
//             lineHeight: '1.6'
//           }}>
//             Join thousands of investors who trust Vunathi Capital with their financial future.
//             Start your journey to financial freedom today.
//           </p>
//           <button style={{
//             background: 'linear-gradient(90deg, #2a5298, #1e90ff)',
//             color: 'white',
//             border: 'none',
//             padding: '0.8rem 2rem',
//             fontSize: '1.1rem',
//             fontWeight: '500',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 0 10px rgba(76, 201, 240, 0.15)',
//             transition: 'transform 0.2s, box-shadow 0.2s'
//           }} onClick={handleLogin} onMouseOver={(e) => {
//             e.target.style.transform = 'translateY(-1px)';
//             e.target.style.boxShadow = '0 4px 10px rgba(30, 144, 255, 0.3)';
//           }} onMouseOut={(e) => {
//             e.target.style.transform = 'translateY(0)';
//             e.target.style.boxShadow = '0 2px 5px rgba(30, 144, 255, 0.2)';
//           }}>
//             START INVESTING NOW
//           </button>
//         </section>
//         <section style={{
//           width: '100%',
//           padding: '4rem 0',
//           overflow: 'hidden',
//           position: 'relative',
//           margin: '5rem 0',
//           isolation: 'isolate'
//         }}>
//           <div style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             background: `
//               radial-gradient(circle at 15% 50%, rgba(30, 144, 255, 0.08) 0%, transparent 30%),
//               radial-gradient(circle at 85% 70%, rgba(76, 201, 240, 0.05) 0%, transparent 30%)
//             `,
//             zIndex: -1
//           }}></div>
//           <motion.div
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: '-100%',
//               width: '50%',
//               height: '100%',
//               background: 'linear-gradient(90deg, transparent, rgba(76, 201, 240, 0.1), transparent)',
//               zIndex: 0
//             }}
//             animate={{ left: '200%' }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               ease: 'easeInOut'
//             }}
//           />
//           <div style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '180px',
//             height: '100%',
//             background: 'linear-gradient(90deg, rgba(10, 14, 23, 0.98) 0%, rgba(10, 14, 23, 0) 100%)',
//             zIndex: 3
//           }}></div>
//           <div style={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             width: '180px',
//             height: '100%',
//             background: 'linear-gradient(270deg, rgba(10, 14, 23, 0.98) 0%, rgba(10, 14, 23, 0) 100%)',
//             zIndex: 3
//           }}></div>
//           <div style={{
//             textAlign: 'center',
//             marginBottom: '3rem',
//             position: 'relative',
//             zIndex: 2
//           }}>
//             <h2 style={{
//               fontSize: '2rem',
//               fontWeight: '900',
//               color: '#e0e0e0',
//               marginBottom: '0.5rem',
//               letterSpacing: '0.05em'
//             }}>
//               WHY INVESTORS <span style={{ color: '#1e90ff' }}>CHOOSE</span> VUNATHI CAPITAL
//             </h2>
//             <div style={{
//               width: '80px',
//               height: '3px',
//               background: 'linear-gradient(90deg, #1e90ff, #4cc9f0)',
//               margin: '0 auto',
//               borderRadius: '3px'
//             }}></div>
//           </div>
//           <div style={{
//             display: 'flex',
//             width: '100%',
//             overflow: 'hidden',
//             position: 'relative',
//             padding: '1rem 0',
//             zIndex: 2
//           }}>
//             <motion.div
//               style={{
//                 display: 'flex',
//                 flexShrink: 0,
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//               animate={{ x: ['0%', '-50%'] }}
//               transition={{
//                 duration: 40,
//                 repeat: Infinity,
//                 ease: 'linear'
//               }}
//             >
//               {[
//                 { icon: FaShieldAlt, title: 'Bank-Level Security', description: 'Your investments are protected' },
//                 { icon: FaChartLine, title: 'Consistent Returns', description: 'Proven performance track record' },
//                 { icon: FaRobot, title: 'AI-Powered Algorithms', description: 'Smart investment technology' },
//                 { icon: FaGlobe, title: 'Global Diversification', description: 'Access to worldwide markets' },
//                 { icon: FaLock, title: 'Zero Data Sharing', description: 'Your privacy is guaranteed' },
//                 { icon: FaUsers, title: 'Trusted Community', description: 'Join thousands of satisfied investors' },
//                 { icon: FaLightbulb, title: 'Smart Insights', description: 'Expert analysis and recommendations' },
//                 { icon: FaMobileAlt, title: 'Mobile Access', description: 'Manage investments anywhere' }
//               ].map((item, idx) => (
//                 <motion.div
//                   key={idx}
//                   whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     background: 'rgba(30, 35, 50, 0.4)',
//                     padding: '1.2rem 2rem',
//                     borderRadius: '16px',
//                     border: '1px solid rgba(76, 201, 240, 0.15)',
//                     margin: '0 1.5rem',
//                     cursor: 'default',
//                     backdropFilter: 'blur(8px)',
//                     boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
//                     minWidth: '320px',
//                     justifyContent: 'center'
//                   }}
//                 >
//                   <div style={{
//                     width: '42px',
//                     height: '42px',
//                     borderRadius: '12px',
//                     background: 'linear-gradient(135deg, rgba(30, 144, 255, 0.15), rgba(76, 201, 240, 0.15))',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     marginRight: '1.2rem',
//                     flexShrink: 0
//                   }}>
//                     <item.icon style={{ color: '#1e90ff', fontSize: '1.4rem' }} />
//                   </div>
//                   <div>
//                     <div style={{
//                       fontSize: '1.1rem',
//                       fontWeight: '600',
//                       color: '#e0e0e0',
//                       marginBottom: '0.2rem'
//                     }}>
//                       {item.title}
//                     </div>
//                     <div style={{
//                       fontSize: '0.9rem',
//                       color: '#a0a0b0'
//                     }}>
//                       {item.description}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7 }}
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               gap: '3rem',
//               marginTop: '3.5rem',
//               position: 'relative',
//               zIndex: 2,
//               flexWrap: 'wrap'
//             }}
//           >
//             {[
//               {
//                 icon: FaHandshake,
//                 title: 'Trusted Partner',
//                 description: 'Your success is our priority'
//               },
//               {
//                 icon: FaGraduationCap,
//                 title: 'Expert Guidance',
//                 description: 'Learn as you invest'
//               },
//               {
//                 icon: FaShieldAlt,
//                 title: 'Peace of Mind',
//                 description: 'Invest with confidence'
//               }
//             ].map((benefit, idx) => (
//               <div key={idx} style={{
//                 textAlign: 'center',
//                 padding: '1.5rem 2rem',
//                 background: 'rgba(30, 35, 50, 0.4)',
//                 borderRadius: '16px',
//                 border: '1px solid rgba(76, 201, 240, 0.15)',
//                 backdropFilter: 'blur(8px)',
//                 maxWidth: '260px',
//                 minHeight: '180px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}>
//                 <benefit.icon style={{
//                   color: '#1e90ff',
//                   fontSize: '2.2rem',
//                   marginBottom: '1rem',
//                   filter: 'drop-shadow(0 0 8px rgba(76, 201, 240, 0.3))'
//                 }} />
//                 <div style={{
//                   fontSize: '1.3rem',
//                   fontWeight: '600',
//                   color: '#e0e0e0',
//                   marginBottom: '0.8rem'
//                 }}>
//                   {benefit.title}
//                 </div>
//                 <div style={{
//                   fontSize: '1rem',
//                   color: '#a0a0b0',
//                   lineHeight: '1.4'
//                 }}>
//                   {benefit.description}
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </section>
//         <footer style={{
//           marginTop: '4rem',
//           textAlign: 'center',
//           color: '#a0a0b0',
//           padding: '3rem',
//           width: '100%',
//         }}>
//           <div style={{
//             color: '#e0e0e0',
//             padding: '0.8rem 1.5rem',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontSize: '1.1rem',
//             fontWeight: '500',
//             margin: '0 auto 2rem',
//             maxWidth: '600px'
//           }}>
//             <span style={{
//               color: '#ff1493',
//               marginRight: '0.6rem',
//               fontSize: '1.3rem',
//               animation: 'heartbeat 1.5s ease-in-out infinite'
//             }}>❤️</span>
//             {typedText}
//             <span style={{
//               marginLeft: '0.2rem',
//               animation: 'blink 1s step-end infinite',
//               color: '#1e90ff'
//             }}>|</span>
//           </div>
//           <div style={{ marginBottom: '1.5rem' }}>
//             <h2 style={{
//               fontSize: '2rem',
//               color: '#e0e0e0',
//               lineHeight: '1.2',
//               marginBottom: '1.5rem',
//               fontWeight: '800'
//             }}>
//               <span style={{ color: '#1e90ff' }}>VUNATHI</span> CAPITAL
//             </h2>
//           </div>
//           <p>© 2025 Vunathi Capital. All rights reserved.</p>
//           <p>Financial investing involves risk, including the possible loss of principal.</p>
//         </footer>
//       </main>
//     </div>
//   );
// };

// export default VunathiCapital;





import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHandshake, FaUsers, FaChartLine, FaShieldAlt, FaLightbulb, FaRobot, FaGlobe, FaMobileAlt, FaPhoneSlash, FaCommentSlash, FaBan, FaUserTie, FaLock, FaGraduationCap } from 'react-icons/fa';

const FeaturesSection = ({ featureCards }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Start auto-rotation
  useEffect(() => {
    const startAutoRotation = () => {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setCurrentCard((prev) => (prev + 1) % featureCards.length);
        }, 3000); // Rotate every 3 seconds
      }
    };
    const stopAutoRotation = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    startAutoRotation();
    return () => stopAutoRotation();
  }, []);

  // Handle mouse enter to stop rotation
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Handle mouse leave to resume rotation
  const handleMouseLeave = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % featureCards.length);
      }, 3000);
    }
  };

  // Mobile-specific carousel settings
  const mobileSettings = {
    cardWidth: 280,
    cardHeight: 350,
    perspective: 800,
    translateZ: -100,
    translateX: 150,
    rotateY: 20
  };

  return (
    <section id="features-section" style={{
      width: '100%',
      padding: isMobile ? '1rem 0.5rem' : '1rem 0',
      margin: '1rem 0',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: isMobile ? '2.5rem' : '3.5rem',
        color: '#e0e0e0',
        lineHeight: '1.2',
        marginBottom: isMobile ? '1rem' : '1.5rem',
        fontWeight: '800'
      }}>
        Our <span style={{ color: '#1e90ff' }}>Features</span>
      </h2>
      <div className="carousel-container" style={{
        position: 'relative',
        height: isMobile ? '400px' : '500px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: isMobile ? '800px' : '1200px',
        overflow: 'hidden'
      }} ref={carouselRef}>
        {featureCards.map((card, index) => {
          const totalCards = featureCards.length;
          const position = (index - currentCard + totalCards) % totalCards;
          
          // Mobile adjustments
          let translateZ, translateX, rotateY, opacity, scale;
          
          if (isMobile) {
            if (position === 0) {
              translateZ = 0;
              translateX = 0;
              rotateY = 0;
              opacity = 1;
              scale = 1;
            } else if (position === 1 || position === totalCards - 1) {
              translateZ = -100;
              translateX = position === 1 ? 150 : -150;
              rotateY = position === 1 ? -20 : 20;
              opacity = 0.8;
              scale = 0.9;
            } else if (position === 2 || position === totalCards - 2) {
              translateZ = -200;
              translateX = position === 2 ? 250 : -250;
              rotateY = position === 2 ? -30 : 30;
              opacity = 0.5;
              scale = 0.8;
            } else {
              translateZ = -300;
              translateX = position < totalCards / 2 ? 350 : -350;
              rotateY = position < totalCards / 2 ? -40 : 40;
              opacity = 0;
              scale = 0.7;
            }
          } else {
            // Desktop settings
            if (position === 0) {
              translateZ = 0;
              translateX = 0;
              rotateY = 0;
              opacity = 1;
              scale = 1;
            } else if (position === 1 || position === totalCards - 1) {
              translateZ = -150;
              translateX = position === 1 ? 250 : -250;
              rotateY = position === 1 ? -30 : 30;
              opacity = 0.8;
              scale = 0.9;
            } else if (position === 2 || position === totalCards - 2) {
              translateZ = -300;
              translateX = position === 2 ? 400 : -400;
              rotateY = position === 2 ? -45 : 45;
              opacity = 0.5;
              scale = 0.8;
            } else {
              translateZ = -500;
              translateX = position < totalCards / 2 ? 600 : -600;
              rotateY = position < totalCards / 2 ? -60 : 60;
              opacity = 0;
              scale = 0.7;
            }
          }
          
          return (
            <div
              key={index}
              className="carousel-card"
              style={{
                position: 'absolute',
                width: isMobile ? '280px' : '350px',
                height: isMobile ? '350px' : '420px',
                background: 'linear-gradient(145deg, rgba(30, 35, 50, 0.9), rgba(20, 25, 40, 0.9))',
                borderRadius: '20px',
                padding: isMobile ? '1.5rem' : '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity: opacity,
                transition: 'transform 0.7s cubic-bezier(0.17, 0.67, 0.83, 0.67), opacity 0.7s ease',
                zIndex: 10 - Math.abs(position),
                cursor: 'pointer',
                backfaceVisibility: 'hidden',
                border: '1px solid rgba(76, 201, 240, 0.2)'
              }}
              onClick={() => setCurrentCard(index)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div style={{
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '60px' : '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4361ee, #4cc9f0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isMobile ? '1.5rem' : '2rem',
                color: 'white',
                boxShadow: '0 0 20px rgba(76, 201, 240, 0.5)'
              }}>
                {typeof card.icon === 'string' ? (
                  <span style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>{card.icon}</span>
                ) : (
                  <card.icon size={isMobile ? 24 : 32} />
                )}
              </div>
              <h3 style={{
                fontSize: isMobile ? '1.5rem' : '1.8rem',
                fontWeight: '700',
                color: '#e0e0e0',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                textAlign: 'center'
              }}>
                {card.title}
              </h3>
              <p style={{
                color: '#a0a0b0',
                lineHeight: '1.6',
                fontSize: isMobile ? '0.95rem' : '1.1rem',
                textAlign: 'center'
              }}>
                {card.text}
              </p>
            </div>
          );
        })}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: isMobile ? '1.5rem' : '2rem',
        gap: '0.8rem'
      }}>
        {featureCards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentCard(index)}
            style={{
              width: isMobile ? '10px' : '12px',
              height: isMobile ? '10px' : '12px',
              borderRadius: '50%',
              border: 'none',
              background: currentCard === index ? '#1e90ff' : 'rgba(30, 144, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </section>
  );
};

const VunathiCapital = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [stats, setStats] = useState({
    portfolioValue: 18700000000,
    activeUsers: 543000,
    avgReturn: 11.2,
    tradingVolume: 2400000000
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerWidth > 768);
  
  const featureCards = [
    {
      icon: FaShieldAlt,
      title: 'Secure Platform',
      text: 'Your data and investments are protected with bank-level security and encryption protocols.'
    },
    {
      icon: FaLightbulb,
      title: 'Smart Insights',
      text: 'AI-powered investment recommendations and personalized portfolio suggestions based on your goals.'
    },
    {
      icon: FaRobot,
      title: 'AI Algorithms',
      text: 'Our sophisticated algorithms continuously analyze market trends to optimize your investment strategy.'
    },
    {
      icon: FaGlobe,
      title: 'Global Diversification',
      text: 'Diversify your portfolio across global markets to maximize returns and minimize risk.'
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile Access',
      text: 'Manage your investments on the go with our intuitive mobile application.'
    }
  ];

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        portfolioValue: prev.portfolioValue + Math.random() * 1000000 - 500000,
        activeUsers: prev.activeUsers + Math.random() * 100 - 50,
        avgReturn: Math.max(5, prev.avgReturn + (Math.random() * 0.2 - 0.1)),
        tradingVolume: prev.tradingVolume + Math.random() * 500000 - 250000
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const text = 'built with love for Indians who love to invest & trade';
    const typeText = () => {
      let i = 0;
      setTypedText('');
      const typingInterval = setInterval(() => {
        setTypedText(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            typeText();
          }, 1000);
        }
      }, 80);
    };
    typeText();
    return () => clearInterval();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  const handleGetStarted = () => {
    document.getElementById('signup-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnMore = () => {
    document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a0e17 0%, #1a2639 100%)',
      color: '#e0e0e0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style jsx>{`
        @keyframes orbit-1 { from { transform: rotateZ(0deg); } to { transform: rotateZ(360deg); } }
        @keyframes orbit-2 { from { transform: rotateZ(0deg); } to { transform: rotateZ(-360deg); } }
        @keyframes orbit-3 { from { transform: rotateZ(0deg); } to { transform: rotateZ(360deg); } }
        @keyframes orbit-4 { from { transform: rotateZ(0deg); } to { transform: rotateZ(-360deg); } }
        @keyframes float { 0%,100%{transform:translateY(0px) rotateY(0deg);}50%{transform:translateY(-10px) rotateY(180deg);} }
        @keyframes pulse { 0%,100%{opacity:0.3; transform:scale(1);}50%{opacity:0.6; transform:scale(1.1);} }
        @keyframes glow { 0%,100%{box-shadow:0 0 10px rgba(76, 201, 240, 0.5);}50%{box-shadow:0 0 20px rgba(76, 201, 240, 0.8),0 0 30px rgba(76, 201, 240, 0.4);} }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        @keyframes heartbeat { 0% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.3); } 70% { transform: scale(1); } }
      `}</style>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '0.8rem 1rem' : isTablet ? '1rem 2rem' : '1rem 3rem',
        background: isScrolled ? 'rgba(10, 14, 23, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(76, 201, 240, 0.1)' : 'none',
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}>
        <h2 style={{
          fontSize: isMobile ? '1.5rem' : isTablet ? '1.8rem' : '2rem',
          color: '#e0e0e0',
          lineHeight: '1.2',
          margin: 0,
          fontWeight: '800'
        }}>
          <span style={{ color: '#1e90ff' }}>VUNATHI</span> CAPITAL
        </h2>
        <nav style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', alignItems: 'center' }}>
          <button
            onClick={handleLogin}
            style={{
              background: 'linear-gradient(90deg, #4361ee, #4cc9f0)',
              color: 'white',
              border: 'none',
              padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.5rem',
              borderRadius: '50px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }} onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 5px 15px rgba(67, 97, 238, 0.4)';
            }} onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
            LOGIN
          </button>
        </nav>
      </header>
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '100%',
        padding: isMobile ? '0 1rem' : '0 2rem',
        marginTop: isMobile ? '6rem' : '8rem',
        position: 'relative',
        zIndex: 5
      }}>
        <section style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          gap: isMobile ? '2rem' : '3rem',
          marginBottom: isMobile ? '3rem' : '5rem',
          padding: isMobile ? '1rem 0' : '2rem 0'
        }}>
          <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: isMobile ? '0' : '2rem',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
              color: '#e0e0e0',
              lineHeight: '1.2',
              marginBottom: isMobile ? '1rem' : '1.5rem',
              fontWeight: '800'
            }}>
              Smart <span style={{ color: '#1e90ff' }}>Investments</span> <span style={{ color: '#1e90ff' }}>Exceptional</span> Returns
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : isTablet ? '1.2rem' : '1.4rem',
              color: '#a0a0b0',
              margin: '0 0 2rem',
              lineHeight: '1.6'
            }}>
              We strategically diversify your investments across carefully selected stocks and market indices,
              maximizing returns while minimizing risk through our advanced algorithmic approach.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <button onClick={handleGetStarted} style={{
                background: 'linear-gradient(90deg, #2a5298, #1e90ff)',
                color: 'white',
                border: 'none',
                padding: isMobile ? '0.5rem 1.2rem' : '0.6rem 1.5rem',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: '500',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(30, 144, 255, 0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }} onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 10px rgba(30, 144, 255, 0.3)';
              }} onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 5px rgba(30, 144, 255, 0.2)';
              }}>
                GET STARTED
              </button>
              <button onClick={handleLearnMore} style={{
                background: 'transparent',
                color: '#1e90ff',
                border: '2px solid #1e90ff',
                padding: isMobile ? '0.5rem 1.2rem' : '0.6rem 1.5rem',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: '500',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }} onMouseOver={(e) => {
                e.target.style.background = 'rgba(30, 144, 255, 0.1)';
                e.target.style.transform = 'translateY(-1px)';
              }} onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>
                LEARN MORE
              </button>
            </div>
          </div>
          <div style={{
            flex: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            height: isMobile ? '300px' : '400px'
          }}>
            <div style={{
              position: 'relative',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              height: isMobile ? '300px' : '400px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {[1, 2, 3, 4].map((ring, index) => {
                const radius = isMobile ? (60 + (index * 40)) : (80 + (index * 60));
                const duration = 15 + (index * 5);
                const opacity = 0.8 - (index * 0.15);
                return (
                  <div
                    key={ring}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      border: '1px solid rgba(76, 201, 240, 0.4)',
                      borderRadius: '50%',
                      width: `${radius * 2}px`,
                      height: `${radius * 2}px`,
                      marginLeft: `-${radius}px`,
                      marginTop: `-${radius}px`,
                      opacity: opacity,
                      animation: `orbit-${ring} ${duration}s linear infinite`,
                      boxShadow: `0 0 20px rgba(6, 182, 212, ${opacity * 0.5}), inset 0 0 20px rgba(6, 182, 212, ${opacity * 0.3})`
                    }}
                  >
                    {[0, 90, 180, 270].slice(0, ring).map((angle, dotIndex) => (
                      <div key={dotIndex} style={{
                        position: 'absolute',
                        width: isMobile ? '6px' : '8px',
                        height: isMobile ? '6px' : '8px',
                        backgroundColor: '#1e90ff',
                        borderRadius: '50%',
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${angle}deg) translateX(${radius}px) translateY(-50%)`,
                        boxShadow: '0 0 10px rgba(76, 201, 240, 0.8)'
                      }} />
                    ))}
                  </div>
                );
              })}
              <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: isMobile ? '120px' : '160px',
                  height: isMobile ? '120px' : '160px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  background: `radial-gradient(circle at 30% 30%, #f7931a20, #f7931a10, rgba(0,0,0,0.3))`,
                  border: `2px solid #f7931a80`,
                  boxShadow: `
                    0 0 30px #f7931a60,
                    0 0 60px #f7931a40,
                    inset 0 0 20px #f7931a20
                  `,
                  animation: 'float 3s ease-in-out infinite'
                }}>
                  <img
                    src="/Logo.png"
                    alt="Vunathi Capital"
                    style={{
                      width: isMobile ? '60px' : '80px',
                      height: isMobile ? '60px' : '80px',
                      borderRadius: '50%',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    bottom: '20px',
                    left: '20px',
                    borderRadius: '50%',
                    opacity: 0.3,
                    background: `radial-gradient(circle, #f7931a, transparent 70%)`,
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                </div>
                <div style={{ marginTop: isMobile ? '1.5rem' : '2rem', textAlign: 'center' }}>
                  <h2 style={{ 
                    fontSize: isMobile ? '1.5rem' : '2rem', 
                    fontWeight: 'bold', 
                    color: 'white', 
                    marginBottom: '0.25rem' 
                  }}>
                    Algorithmic Excellence
                  </h2>
                  <p style={{ 
                    color: '#a0a0b0', 
                    fontSize: isMobile ? '0.9rem' : '1.1rem' 
                  }}>
                    AI-powered investment strategies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" style={{
          width: '100%',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          padding: isMobile ? '1rem 0' : '2rem 0',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: isMobile ? '2rem' : '4rem',
          }}>
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{ 
                flex: '1', 
                display: 'flex', 
                justifyContent: 'center',
                order: isMobile ? 2 : 1
              }}
            >
              <div style={{
                position: 'relative',
                width: isMobile ? '280px' : '380px',
                height: isMobile ? '280px' : '380px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(30, 35, 50, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(76, 201, 240, 0.3)',
                boxShadow: '0 0 40px rgba(76, 201, 240, 0.2)'
              }}>
                <FaHandshake style={{
                  color: 'rgba(76, 201, 240, 0.6)',
                  fontSize: isMobile ? '6rem' : '8rem',
                  position: 'absolute',
                  transform: isMobile ? 'rotate(-12deg) translateX(30px) translateY(-30px)' : 'rotate(-12deg) translateX(40px) translateY(-40px)'
                }} />
                <FaUsers style={{
                  color: 'rgba(76, 201, 240, 0.6)',
                  fontSize: isMobile ? '5rem' : '7rem',
                  position: 'absolute',
                  transform: isMobile ? 'rotate(6deg) translateX(-30px) translateY(30px)' : 'rotate(6deg) translateX(-40px) translateY(40px)'
                }} />
                <div style={{
                  position: 'absolute',
                  width: isMobile ? '150px' : '200px',
                  height: isMobile ? '150px' : '200px',
                  background: 'rgba(76, 201, 240, 0.15)',
                  borderRadius: '50%',
                  filter: 'blur(40px)'
                }}></div>
                <div style={{
                  position: 'absolute',
                  fontSize: isMobile ? '3rem' : '4rem',
                  fontWeight: '800',
                  color: '#e0e0e0',
                  transform: 'rotate(3deg) translateX(20px)',
                  textShadow: '0 5px 20px rgba(0,0,0,0.5)'
                }}>TRUST</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{ 
                flex: '1', 
                textAlign: isMobile ? 'center' : 'left',
                order: isMobile ? 1 : 2
              }}
            >
              <h2 style={{
                fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
                color: '#e0e0e0',
                lineHeight: '1.2',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                fontWeight: '800'
              }}>
                Your <span style={{ color: '#1e90ff' }}>Trusted Partner</span> in Wealth Growth
              </h2>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.2rem',
                color: '#a0a0b0',
                lineHeight: '1.6',
                marginBottom: isMobile ? '1rem' : '1.5rem'
              }}>
                At Vunathi Capital, we are dedicated to democratizing investment opportunities. Our mission is to empower individuals to achieve their financial goals through intelligent, diversified, and accessible investment solutions. We believe in transparency, technology, and putting our investors first.
              </p>
            </motion.div>
          </div>
        </section>
        <FeaturesSection featureCards={featureCards} />

        <section style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          padding: isMobile ? '1rem 0' : '2rem 0'
        }}>
          <FaGraduationCap style={{ 
            fontSize: isMobile ? '2.5rem' : '3rem', 
            color: '#1e90ff', 
            marginBottom: isMobile ? '0.8rem' : '1rem' 
          }} />
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            color: '#e0e0e0',
            lineHeight: '1.2',
            marginBottom: isMobile ? '0.8rem' : '1.5rem',
            fontWeight: '900'
          }}>
          Finance  <span style={{ color: '#1e90ff' }}>simplified</span>,
          </h2>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            color: '#e0e0e0',
            lineHeight: '1.2',
            marginBottom: isMobile ? '0.8rem' : '1.5rem',
            fontWeight: '900'
          }}>
          in your <span style={{ color: '#1e90ff' }}>language</span>.
          </h2>
        </section>

        <section style={{
          width: '100%',
          padding: isMobile ? '2rem 0' : '4rem 0',
          margin: isMobile ? '2rem 0' : '4rem 0',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '1.5rem' : '2rem',
            textAlign: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                padding: isMobile ? '1.5rem' : '2.5rem',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transform: 'scale(1)',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FaShieldAlt style={{
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                color: '#1e90ff',
                margin: '0 auto 1rem',
                display: 'block'
              }} />
              <h3 style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '800',
                color: '#e0e0e0',
                marginBottom: isMobile ? '1rem' : '1.5rem'
              }}>Our <span style={{ color: '#1e90ff' }}>Vision</span></h3>
              <p style={{
                fontSize: isMobile ? '0.95rem' : '1.1rem',
                color: '#a0a0b0',
                lineHeight: '1.6'
              }}>
                To empower investors with simple, transparent, and tech-driven wealth management, making sophisticated investing accessible to everyone.
              </p>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                padding: isMobile ? '1.5rem' : '2.5rem',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transform: 'scale(1)',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FaChartLine style={{
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                color: '#1e90ff',
                margin: '0 auto 1rem',
                display: 'block'
              }} />
              <h3 style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '800',
                color: '#e0e0e0',
                marginBottom: isMobile ? '1rem' : '1.5rem'
              }}>Our <span style={{ color: '#1e90ff' }}>Mission</span></h3>
              <p style={{
                fontSize: isMobile ? '0.95rem' : '1.1rem',
                color: '#a0a0b0',
                lineHeight: '1.6'
              }}>
                To deliver long-term trust and sustainable returns with minimal complexity, fostering a community of informed and successful investors.
              </p>
            </motion.div>
          </div>
        </section>

        
        <section id="user-first-section" style={{
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          alignItems: 'center',
          width: '100%',
          gap: isMobile ? '3rem' : '6rem',
          marginBottom: isMobile ? '3rem' : '5rem',
          padding: isMobile ? '1rem 1.5rem' : '2rem 4rem',
          overflow: 'hidden'
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
              color: '#e0e0e0',
              lineHeight: '1.2',
              marginBottom: isMobile ? '0.8rem' : '1rem',
              fontWeight: '800'
            }}>
              Always Keeping You <span style={{ color: '#1e90ff' }}>First</span>
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              color: '#a0a0b0',
              marginBottom: isMobile ? '1.5rem' : '2.5rem',
              lineHeight: '1.6'
            }}>
              Our users - traders & investors - will always be our priority, even when we're building new features or delivering customer support everyday.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '1rem' : '1.5rem',
              marginBottom: isMobile ? '1.5rem' : '2.5rem',
              justifyContent: 'space-between'
            }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: isMobile ? '1rem' : '1.5rem', 
                alignItems: isMobile ? 'center' : 'flex-start',
                marginBottom: isMobile ? '1rem' : '0'
              }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                  <FaUserTie size={isMobile ? 20 : 24} style={{ color: '#1e90ff' }} />
                  <span style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', color: '#a0a0b0' }}>No Relationship Managers</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                  <FaBan size={isMobile ? 20 : 24} style={{ color: '#1e90ff' }} />
                  <span style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', color: '#a0a0b0' }}>No Spam</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                  <FaLock size={isMobile ? 20 : 24} style={{ color: '#1e90ff' }} />
                  <span style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', color: '#a0a0b0' }}>No Data Sharing</span>
                </motion.div>
              </div>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: isMobile ? '1rem' : '1.5rem', 
                alignItems: isMobile ? 'center' : 'flex-start', 
                marginLeft: isMobile ? '0' : '2rem' 
              }}>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                  <FaPhoneSlash size={isMobile ? 20 : 24} style={{ color: '#1e90ff' }} />
                  <span style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', color: '#a0a0b0' }}>No Calls</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                  <FaShieldAlt size={isMobile ? 20 : 24} style={{ color: '#1e90ff' }} />
                  <span style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', color: '#a0a0b0' }}>No Unauthorized Access</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                  <FaCommentSlash size={isMobile ? 20 : 24} style={{ color: '#1e90ff' }} />
                  <span style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', color: '#a0a0b0' }}>No SMS</span>
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              height: isMobile ? '280px' : '400px',
              maxWidth: isMobile ? '280px' : '400px',
              overflow: 'hidden'
            }}
          >
            <div className="animation-container" style={{
              position: 'relative',
              width: isMobile ? '220px' : '300px',
              height: isMobile ? '220px' : '300px',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              background: 'radial-gradient(circle, rgba(76, 201, 240, 0.1) 0%, transparent 70%)',
              transform: isMobile ? 'translateX(-10px)' : 'translateX(-20px)'
            }}>
              <motion.div
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: isMobile ? '80px' : '120px',
                  height: isMobile ? '80px' : '120px',
                  background: 'linear-gradient(135deg, #4cc9f0, #4361ee)',
                  borderRadius: '15px',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(76, 201, 240, 0.6)',
                  zIndex: 10,
                  animation: 'glow 3s ease-in-out infinite'
                }}
              >
                <FaShieldAlt size={isMobile ? 32 : 48} style={{ color: 'white', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
              </motion.div>
              {[0, 90, 180, 270].map((angle, index) => (
                <motion.div
                  key={index}
                  animate={{
                    rotateZ: [angle, angle + 360]
                  }}
                  transition={{
                    duration: 10 + index * 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: isMobile ? '140px' : '180px',
                    height: isMobile ? '140px' : '180px',
                    transform: 'translate(-50%, -50%)',
                    transformOrigin: 'center'
                  }}
                >
                  <motion.div
                    animate={{
                      y: [-10, 10, -10],
                      rotateX: [0, 15, 0]
                    }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '50%',
                      width: isMobile ? '40px' : '50px',
                      height: isMobile ? '40px' : '50px',
                      background: 'linear-gradient(135deg, rgba(76, 201, 240, 0.2), rgba(67, 97, 238, 0.2))',
                      borderRadius: '10px',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(76, 201, 240, 0.3)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 5px 15px rgba(76, 201, 240, 0.3)'
                    }}
                  >
                    {[FaPhoneSlash, FaCommentSlash, FaBan, FaUserTie][index] &&
                      React.createElement([FaPhoneSlash, FaCommentSlash, FaBan, FaUserTie][index], {
                        size: isMobile ? 16 : 20,
                        style: { color: '#1e90ff', filter: 'drop-shadow(0 0 4px rgba(76, 201, 240, 0.5))' }
                      })}
                  </motion.div>
                </motion.div>
              ))}
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={`particle-${index}`}
                  animate={{
                    x: [0, Math.sin(index * 0.8) * (isMobile ? 60 : 80), 0],
                    y: [0, Math.cos(index * 0.8) * (isMobile ? 60 : 80), 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.5, 0.8]
                  }}
                  transition={{
                    duration: 4 + index * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.2
                  }}
                  style={{
                    position: 'absolute',
                    top: `${30 + (index * 8)}%`,
                    left: `${30 + (index * 8)}%`,
                    width: isMobile ? '4px' : '6px',
                    height: isMobile ? '4px' : '6px',
                    borderRadius: '50%',
                    background: '#1e90ff',
                    boxShadow: '0 0 8px rgba(76, 201, 240, 0.8)',
                    zIndex: 5
                  }}
                />
              ))}
              {[1, 2].map((ring, index) => (
                <motion.div
                  key={`ring-${index}`}
                  animate={{
                    rotateX: [0, 360],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    rotateX: { duration: 6 + index * 2, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: `${isMobile ? 80 + index * 30 : 120 + index * 40}px`,
                    height: `${isMobile ? 80 + index * 30 : 120 + index * 40}px`,
                    border: '1px solid rgba(76, 201, 240, 0.3)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 15px rgba(76, 201, 240, 0.2)'
                  }}
                />
              ))}
              {['SECURE', 'TRUST', 'SUCCESS'].map((text, index) => (
                <motion.div
                  key={text}
                  animate={{
                    rotateZ: [0, 360],
                    scale: [0.8, 1.1, 0.8]
                  }}
                  transition={{
                    rotateZ: { duration: 12 + index * 4, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: isMobile ? '160px' : '200px',
                    height: isMobile ? '160px' : '200px',
                    transform: 'translate(-50%, -50%)',
                    transformOrigin: 'center'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: `${index * 50}%`,
                    left: '100%',
                    transform: 'translateX(-50%)',
                    fontSize: isMobile ? '0.7rem' : '0.9rem',
                    fontWeight: '600',
                    color: '#1e90ff',
                    textShadow: '0 0 8px rgba(76, 201, 240, 0.5)',
                    whiteSpace: 'nowrap'
                  }}>
                    {text}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        <section id="signup-section" style={{
          width: '100%',
          padding: isMobile ? '2rem 1rem' : '4rem',
          margin: isMobile ? '2rem 0' : '4rem 0',
          textAlign: 'center',
          border: 'none'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
            color: '#e0e0e0',
            lineHeight: '1.2',
            marginBottom: isMobile ? '1rem' : '1.5rem',
            fontWeight: '800'
          }}>
            Ready to<span style={{ color: '#1e90ff' }}> Grow Your</span> Wealth ?
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.3rem',
            color: '#a0a0b0',
            marginBottom: isMobile ? '1.5rem' : '2.5rem',
            maxWidth: '800px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.6'
          }}>
            Join thousands of investors who trust Vunathi Capital with their financial future.
            Start your journey to financial freedom today.
          </p>
          <button style={{
            background: 'linear-gradient(90deg, #2a5298, #1e90ff)',
            color: 'white',
            border: 'none',
            padding: isMobile ? '0.7rem 1.5rem' : '0.8rem 2rem',
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: '500',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(76, 201, 240, 0.15)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }} onClick={handleLogin} onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 4px 10px rgba(30, 144, 255, 0.3)';
          }} onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 5px rgba(30, 144, 255, 0.2)';
          }}>
            START INVESTING NOW
          </button>
        </section>
        <section style={{
          width: '100%',
          padding: isMobile ? '2rem 0' : '4rem 0',
          overflow: 'hidden',
          position: 'relative',
          margin: isMobile ? '3rem 0' : '5rem 0',
          isolation: 'isolate'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 15% 50%, rgba(30, 144, 255, 0.08) 0%, transparent 30%),
              radial-gradient(circle at 85% 70%, rgba(76, 201, 240, 0.05) 0%, transparent 30%)
            `,
            zIndex: -1
          }}></div>
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(76, 201, 240, 0.1), transparent)',
              zIndex: 0
            }}
            animate={{ left: '200%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: isMobile ? '80px' : '180px',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(10, 14, 23, 0.98) 0%, rgba(10, 14, 23, 0) 100%)',
            zIndex: 3
          }}></div>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: isMobile ? '80px' : '180px',
            height: '100%',
            background: 'linear-gradient(270deg, rgba(10, 14, 23, 0.98) 0%, rgba(10, 14, 23, 0) 100%)',
            zIndex: 3
          }}></div>
          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? '2rem' : '3rem',
            position: 'relative',
            zIndex: 2
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: '900',
              color: '#e0e0e0',
              marginBottom: '0.5rem',
              letterSpacing: '0.05em'
            }}>
              WHY INVESTORS <span style={{ color: '#1e90ff' }}>CHOOSE</span> VUNATHI CAPITAL
            </h2>
            <div style={{
              width: '80px',
              height: '3px',
              background: 'linear-gradient(90deg, #1e90ff, #4cc9f0)',
              margin: '0 auto',
              borderRadius: '3px'
            }}></div>
          </div>
          <div style={{
            display: 'flex',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            padding: '1rem 0',
            zIndex: 2
          }}>
            <motion.div
              style={{
                display: 'flex',
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {[
                { icon: FaShieldAlt, title: 'Bank-Level Security', description: 'Your investments are protected' },
                { icon: FaChartLine, title: 'Consistent Returns', description: 'Proven performance track record' },
                { icon: FaRobot, title: 'AI-Powered Algorithms', description: 'Smart investment technology' },
                { icon: FaGlobe, title: 'Global Diversification', description: 'Access to worldwide markets' },
                { icon: FaLock, title: 'Zero Data Sharing', description: 'Your privacy is guaranteed' },
                { icon: FaUsers, title: 'Trusted Community', description: 'Join thousands of satisfied investors' },
                { icon: FaLightbulb, title: 'Smart Insights', description: 'Expert analysis and recommendations' },
                { icon: FaMobileAlt, title: 'Mobile Access', description: 'Manage investments anywhere' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(30, 35, 50, 0.4)',
                    padding: isMobile ? '1rem 1.5rem' : '1.2rem 2rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(76, 201, 240, 0.15)',
                    margin: isMobile ? '0 1rem' : '0 1.5rem',
                    cursor: 'default',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    minWidth: isMobile ? '280px' : '320px',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{
                    width: isMobile ? '36px' : '42px',
                    height: isMobile ? '36px' : '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(30, 144, 255, 0.15), rgba(76, 201, 240, 0.15))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: isMobile ? '1rem' : '1.2rem',
                    flexShrink: 0
                  }}>
                    <item.icon style={{ color: '#1e90ff', fontSize: isMobile ? '1.2rem' : '1.4rem' }} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      fontWeight: '600',
                      color: '#e0e0e0',
                      marginBottom: '0.2rem'
                    }}>
                      {item.title}
                    </div>
                    <div style={{
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      color: '#a0a0b0'
                    }}>
                      {item.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: isMobile ? '1.5rem' : '3rem',
              marginTop: isMobile ? '2.5rem' : '3.5rem',
              position: 'relative',
              zIndex: 2,
              flexWrap: 'wrap'
            }}
          >
            {[
              {
                icon: FaHandshake,
                title: 'Trusted Partner',
                description: 'Your success is our priority'
              },
              {
                icon: FaGraduationCap,
                title: 'Expert Guidance',
                description: 'Learn as you invest'
              },
              {
                icon: FaShieldAlt,
                title: 'Peace of Mind',
                description: 'Invest with confidence'
              }
            ].map((benefit, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                padding: isMobile ? '1.2rem 1.5rem' : '1.5rem 2rem',
                background: 'rgba(30, 35, 50, 0.4)',
                borderRadius: '16px',
                border: '1px solid rgba(76, 201, 240, 0.15)',
                backdropFilter: 'blur(8px)',
                maxWidth: isMobile ? '220px' : '260px',
                minHeight: isMobile ? '160px' : '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <benefit.icon style={{
                  color: '#1e90ff',
                  fontSize: isMobile ? '1.8rem' : '2.2rem',
                  marginBottom: isMobile ? '0.8rem' : '1rem',
                  filter: 'drop-shadow(0 0 8px rgba(76, 201, 240, 0.3))'
                }} />
                <div style={{
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  fontWeight: '600',
                  color: '#e0e0e0',
                  marginBottom: isMobile ? '0.6rem' : '0.8rem'
                }}>
                  {benefit.title}
                </div>
                <div style={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: '#a0a0b0',
                  lineHeight: '1.4'
                }}>
                  {benefit.description}
                </div>
              </div>
            ))}
          </motion.div>
        </section>
        <footer style={{
          marginTop: isMobile ? '2rem' : '4rem',
          textAlign: 'center',
          color: '#a0a0b0',
          padding: isMobile ? '2rem 1rem' : '3rem',
          width: '100%',
        }}>
          <div style={{
            color: '#e0e0e0',
            padding: isMobile ? '0.6rem 1rem' : '0.8rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            fontWeight: '500',
            margin: '0 auto 2rem',
            maxWidth: isMobile ? '320px' : '600px'
          }}>
            <span style={{
              color: '#ff1493',
              marginRight: '0.6rem',
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              animation: 'heartbeat 1.5s ease-in-out infinite'
            }}>❤️</span>
            {typedText}
            <span style={{
              marginLeft: '0.2rem',
              animation: 'blink 1s step-end infinite',
              color: '#1e90ff'
            }}>|</span>
          </div>
          <div style={{ marginBottom: isMobile ? '1rem' : '1.5rem' }}>
            <h2 style={{
              fontSize: isMobile ? '1.8rem' : '2rem',
              color: '#e0e0e0',
              lineHeight: '1.2',
              marginBottom: isMobile ? '1rem' : '1.5rem',
              fontWeight: '800'
            }}>
              <span style={{ color: '#1e90ff' }}>VUNATHI</span> CAPITAL
            </h2>
          </div>
          <p style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>© 2025 Vunathi Capital. All rights reserved.</p>
          <p style={{ fontSize: isMobile ? '0.9rem' : '1rem', marginTop: '0.5rem' }}>Financial investing involves risk, including the possible loss of principal.</p>
        </footer>
      </main>
    </div>
  );
};

export default VunathiCapital;
