

          //new one


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Shield, PieChart, DollarSign, ArrowRight, Zap, Star, BarChart3 } from "lucide-react";

export default function HomePage({ wallet, accessTokenTimestamp }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <TrendingUp size={24} />,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms provide real-time market insights and predictive analysis",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield size={24} />,
      title: "Military-Grade Security",
      description: "Multi-layer encryption and biometric authentication ensure your assets are completely secure",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <PieChart size={24} />,
      title: "Smart Portfolio",
      description: "Automated rebalancing and risk management with personalized investment strategies",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap size={24} />,
      title: "Lightning Execution",
      description: "Sub-millisecond trade execution with direct market access and zero slippage",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Trader",
      quote: "This platform's AI insights have transformed my trading strategy. It's like having a personal analyst 24/7!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Portfolio Manager",
      quote: "The security features give me peace of mind, and the execution speed is unmatched. Highly recommend!",
      rating: 4
    },
    {
      name: "Emma Rodriguez",
      role: "Retail Investor",
      quote: "The intuitive interface and smart portfolio tools made investing accessible and profitable for me.",
      rating: 5
    }
  ];

  return (
    <div className="homepage-container">
      {/* Animated Background */}
      <div className="background-effects">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i}`} />
          ))}
        </div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="mouse-follower"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
        }}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">🚀 New: AI Trading Assistant Available</span>
          </div>

          <h1 className="hero-title">
            The Future of 
            <span className="gradient-text"> Trading</span>
            <br />
            Starts Here
          </h1>

          <p className="hero-subtitle">
            Experience next-generation trading with AI-powered insights, 
            institutional-grade execution, and a platform designed for the modern investor.
          </p>

          <div className="hero-actions">
            <button 
              className="primary-btn"
              onClick={() => navigate("/trades")}
            >
              <span>Live Trades</span>
              <ArrowRight size={18} />
              <div className="btn-shine" />
            </button>

            <button 
              className="secondary-btn"
              onClick={() => navigate("/account")}
            >
              <span>Account Details</span>
            </button>
          </div>
        </div>

        {/* 3D Trading Dashboard Mockup */}
        <div className="hero-visual">
          <div className="dashboard-mockup">
            <div className="dashboard-header">
              <div className="header-controls">
                <div className="control-dot red" />
                <div className="control-dot yellow" />
                <div className="control-dot green" />
              </div>
              <div className="header-title">Trading Dashboard</div>
            </div>

            <div className="dashboard-content">
              <div className="chart-area">
                <div className="chart-line" />
                <div className="chart-bars">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`bar bar-${i}`} />
                  ))}
                </div>
              </div>

              <div className="data-panels">
                <div className="data-panel">
                </div> 
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="floating-element element-1">
            <TrendingUp size={16} />
          </div>
          <div className="floating-element element-2">
            <DollarSign size={16} />
          </div>
          <div className="floating-element element-3">
            <BarChart3 size={16} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">
            Why Elite Traders Choose 
            <span className="gradient-text"> Our Platform</span>
          </h2>
          <p className="section-subtitle">
            Cutting-edge technology meets institutional-grade performance
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="card-background" />
              <div className="card-content">
                <div className={`feature-icon bg-gradient-to-br ${feature.gradient}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
              <div className="card-hover-effect" />
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Ready to <span className="gradient-text">Transform</span> Your Trading?
          </h2>
          <p className="cta-subtitle">
            Join thousands of traders who are leveraging our AI-powered platform to achieve their financial goals.
          </p>
          <button 
            className="cta-btn"
            onClick={() => navigate("/signup")}
          >
            <span>Get Started Now</span>
            <ArrowRight size={18} />
            <div className="btn-shine" />
          </button>
        </div>
      </section>

      {/* Testimonials Section
      <section className="testimonials-section">
        <div className="section-header">
          <h2 className="section-title">
            What Our <span className="gradient-text">Traders</span> Say
          </h2>
          <p className="section-subtitle">
            Hear from traders who have transformed their strategies with our platform
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="card-background" />
              <div className="card-content">
                <div className="rating-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <span className="author-name">{testimonial.name}</span>
                  <span className="author-role">{testimonial.role}</span>
                </div>
              </div>
              <div className="card-hover-effect" />
            </div>
          ))}
        </div>
      </section> */}

      <style jsx>{`
        .homepage-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          color: white;
          overflow-x: hidden;
          position: relative;
        }

        .background-effects {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #10b981, #06b6d4);
          top: 50%;
          right: -150px;
          animation-delay: -7s;
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(45deg, #f59e0b, #ef4444);
          bottom: -175px;
          left: 20%;
          animation-delay: -14s;
        }

        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: particle-float 15s linear infinite;
        }

        .particle-0 { left: 10%; animation-delay: 0s; }
        .particle-1 { left: 20%; animation-delay: -2s; }
        .particle-2 { left: 30%; animation-delay: -4s; }
        .particle-3 { left: 40%; animation-delay: -6s; }
        .particle-4 { left: 50%; animation-delay: -8s; }
        .particle-5 { left: 60%; animation-delay: -10s; }
        .particle-6 { left: 70%; animation-delay: -12s; }
        .particle-7 { left: 80%; animation-delay: -14s; }
        .particle-8 { left: 90%; animation-delay: -16s; }
        .particle-9 { left: 15%; animation-delay: -18s; }
        .particle-10 { left: 25%; animation-delay: -20s; }
        .particle-11 { left: 35%; animation-delay: -22s; }
        .particle-12 { left: 45%; animation-delay: -24s; }
        .particle-13 { left: 55%; animation-delay: -26s; }
        .particle-14 { left: 65%; animation-delay: -28s; }
        .particle-15 { left: 75%; animation-delay: -30s; }
        .particle-16 { left: 85%; animation-delay: -32s; }
        .particle-17 { left: 95%; animation-delay: -34s; }
        .particle-18 { left: 5%; animation-delay: -36s; }
        .particle-19 { left: 95%; animation-delay: -38s; }

        .mouse-follower {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: all 0.1s ease;
          backdrop-filter: blur(2px);
        }

        .hero-section {
          display: flex;
          align-items: center;
          min-height: 100vh;
          padding: 0 2rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          gap: 4rem;
        }

        .hero-content {
          flex: 1;
          max-width: 600px;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 0.5rem 1rem;
          margin-bottom: 2rem;
          animation: glow 2s ease-in-out infinite alternate;
        }

        .badge-text {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease-in-out infinite;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 3rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }

        .primary-btn {
          position: relative;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4);
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .primary-btn:hover .btn-shine {
          left: 100%;
        }

        .secondary-btn {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .hero-visual {
          flex: 1;
          position: relative;
          max-width: 600px;
          height: 500px;
        }

        .dashboard-mockup {
          width: 100%;
          height: 400px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);
          animation: dashboard-float 6s ease-in-out infinite;
        }

        .dashboard-header {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-controls {
          display: flex;
          gap: 0.5rem;
        }

        .control-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .control-dot.red { background: #ef4444; }
        .control-dot.yellow { background: #f59e0b; }
        .control-dot.green { background: #10b981; }

        .header-title {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .dashboard-content {
          padding: 2rem;
          height: calc(100% - 80px);
        }

        .chart-area {
          position: relative;
          height: 60%;
          margin-bottom: 2rem;
        }

        .chart-line {
          position: absolute;
          top: 20%;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
          animation: chart-draw 3s ease-in-out infinite;
        }

        .chart-bars {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          display: flex;
          align-items: end;
          gap: 4px;
        }

        .bar {
          flex: 1;
          background: linear-gradient(to top, #3b82f6, rgba(59, 130, 246, 0.3));
          border-radius: 2px 2px 0 0;
          animation: bar-grow 2s ease-out infinite;
        }

        .bar-0 { height: 30%; animation-delay: 0s; }
        .bar-1 { height: 60%; animation-delay: 0.1s; }
        .bar-2 { height: 45%; animation-delay: 0.2s; }
        .bar-3 { height: 80%; animation-delay: 0.3s; }
        .bar-4 { height: 35%; animation-delay: 0.4s; }
        .bar-5 { height: 70%; animation-delay: 0.5s; }
        .bar-6 { height: 55%; animation-delay: 0.6s; }
        .bar-7 { height: 90%; animation-delay: 0.7s; }
        .bar-8 { height: 40%; animation-delay: 0.8s; }
        .bar-9 { height: 65%; animation-delay: 0.9s; }
        .bar-10 { height: 50%; animation-delay: 1s; }
        .bar-11 { height: 75%; animation-delay: 1.1s; }

        .data-panels {
          display: flex;
          gap: 1rem;
        }

        .data-panel {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 1rem;
        }

        .floating-element {
          position: absolute;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
          animation: element-float 8s ease-in-out infinite;
        }

        .element-1 {
          top: 50px;
          right: 50px;
          animation-delay: 0s;
        }

        .element-2 {
          bottom: 100px;
          left: -30px;
          animation-delay: -2s;
        }

        .element-3 {
          top: 200px;
          right: -30px;
          animation-delay: -4s;
        }

        .features-section {
          padding: 8rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          cursor: pointer;
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .card-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .feature-card:hover .card-background {
          opacity: 1;
        }

        .card-content {
          position: relative;
          z-index: 2;
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: white;
        }

        .feature-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: white;
        }

        .feature-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .card-hover-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .feature-card:hover .card-hover-effect {
          left: 100%;
        }

        .cta-section {
          padding: 4rem 2rem 8rem;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .cta-container {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 3rem;
          text-align: center;
        }

        .cta-title {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .cta-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .cta-btn {
          position: relative;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4);
        }

        .cta-btn .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .cta-btn:hover .btn-shine {
          left: 100%;
        }

        .testimonials-section {
          padding: 4rem 2rem 8rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .testimonial-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .testimonial-card .card-background {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .testimonial-card:hover .card-background {
          opacity: 1;
        }

        .rating-stars {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1.5rem;
        }

        .testimonial-quote {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
        }

        .author-role {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .testimonial-card .card-hover-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .testimonial-card:hover .card-hover-effect {
          left: 100%;
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }

        @keyframes particle-float {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
        }

        @keyframes glow {
          0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          100% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.5); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes dashboard-float {
          0%, 100% { transform: perspective(1000px) rotateY(-15deg) rotateX(5deg) translateY(0px); }
          50% { transform: perspective(1000px) rotateY(-15deg) rotateX(5deg) translateY(-10px); }
        }

        @keyframes chart-draw {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          51% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }

        @keyframes bar-grow {
          0% { transform: scaleY(0); }
          50% { transform: scaleY(1); }
          100% { transform: scaleY(0); }
        }

        @keyframes element-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-section {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1rem;
          }

          .hero-visual {
            order: -1;
            max-width: 400px;
            height: 300px;
          }

          .dashboard-mockup {
            height: 250px;
          }

          .cta-section {
            padding: 2rem 1rem;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .primary-btn, .secondary-btn, .cta-btn {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .cta-container {
            padding: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 1rem;
          }

          .features-section {
            padding: 4rem 1rem;
          }

          .cta-section {
            padding: 2rem 1rem 4rem;
          }

          .testimonials-section {
            padding: 2rem 1rem 4rem;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .cta-title {
            font-size: 1.5rem;
          }

          .cta-subtitle {
            font-size: 1rem;
          }
        }

        /* Glass morphism utilities */
        .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
        }

        .from-blue-500 { --tw-gradient-from: #3b82f6; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0)); }
        .to-cyan-500 { --tw-gradient-to: #06b6d4; }
        .from-purple-500 { --tw-gradient-from: #8b5cf6; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(139, 92, 246, 0)); }
        .to-pink-500 { --tw-gradient-to: #ec4899; }
        .from-green-500 { --tw-gradient-from: #10b981; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(16, 185, 129, 0)); }
        .to-emerald-500 { --tw-gradient-to: #10b981; }
        .from-orange-500 { --tw-gradient-from: #f97316; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(249, 115, 22, 0)); }
        .to-red-500 { --tw-gradient-to: #ef4444; }
      `}</style>
    </div>
  );
}





