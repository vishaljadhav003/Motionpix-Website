import "./DigitalMarketing.css";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const DigitalMarketing = () => {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="dm-page">

      {/* HERO */}
      <div
        className="dm-hero reveal"
        ref={(el) => (revealRefs.current[0] = el)}
      >
        <div className="hero-text">
          <h1>Digital Marketing <span>That Delivers</span></h1>
          <p>
            Data-driven strategies designed to generate leads, scale reach,
            and maximize ROI across platforms.
          </p>
          <NavLink to="/contact" className="hero-btn">
            Start Growing
          </NavLink>
        </div>

        <div className="hero-visual">
          <video
            src="https://www.pexels.com/download/video/3191576/"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>

      {/* SERVICES */}
      <div
        className="container section reveal"
        ref={(el) => (revealRefs.current[1] = el)}
      >
        <h2 className="section-title">What We <span>Do</span></h2>

        <div className="service-grid-1">
          {[
            "Search Engine Optimization (SEO)",
            "Social Media Marketing",
            "Paid Ads & Performance Campaigns",
            "Content Strategy & Branding",
            "Conversion Rate Optimization",
            "Analytics & Growth Tracking",
          ].map((item, i) => (
            <div className="service-card-1" key={i}>
              <h3 className="fw-bold">{item}</h3>
              <p>
                Strategic execution focused on measurable results and long-term
                brand growth.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      {/* <div
        className="stats-section reveal"
        ref={(el) => (revealRefs.current[2] = el)}
      >
        <div className="stats-grid">
          {[
            { value: "320%", label: "Average ROI Increase" },
            { value: "4.5K+", label: "Qualified Leads Generated" },
            { value: "12M+", label: "Monthly Reach" },
            { value: "68%", label: "Conversion Boost" },
          ].map((stat, i) => (
            <div className="stat-box" key={i}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* CTA */}
      <div
        className="cta-section reveal"
        ref={(el) => (revealRefs.current[3] = el)}
      >
        <h2 className="fw-bold">Ready to Scale Your <span>Brand?</span></h2>
        <p>
          Let’s turn traffic into customers with smart, scalable digital
          marketing solutions.
        </p>
        <NavLink to="/contact" className="cta-btn fw-bold">
          Talk to Marketing Experts
        </NavLink>
      </div>

    </section>
  );
};

export default DigitalMarketing;
