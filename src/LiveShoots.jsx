import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./LiveShoots.css";

const LiveShoots = () => {
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
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="liveshoot-page">
      {/* HERO */}
      <div
        className="liveshoot-hero reveal"
        ref={(el) => (revealRefs.current[0] = el)}
      >
        <div className="hero-text">
          <h1>Professional Live <span>Shoots</span></h1>
          <p>
            High-quality photography & videography crafted to capture moments,
            elevate brands, and tell authentic stories.
          </p>
          <NavLink to="/contact" className="hero-btn">
            Book a Live Shoot
          </NavLink>
        </div>

        <div className="hero-media">
          <video
            src="https://www.pexels.com/download/video/14367163/"
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
        <h2 className="section-title">What We <span>Shoot</span></h2>

        <div className="shoot-grid">
          {[
            "Brand Commercial Shoots",
            "Product Photography & Videos",
            "Corporate Films",
            "Events & Conferences",
            "Fashion & Lifestyle Shoots",
            "Social Media Content",
          ].map((item, i) => (
            <div className="shoot-card" key={i}>
              <h3>{item}</h3>
              <p>
                Professionally planned shoots with cinematic lighting,
                composition, and storytelling.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <div
        className="process-section reveal"
        ref={(el) => (revealRefs.current[2] = el)}
      >
        <h2 className="fw-bold">Our Live Shoot <span>Process</span></h2>

        <div className="process-flow">
          {[
            "Concept & Planning",
            "Location & Setup",
            "Live Shooting",
            "Post-Production",
            "Final Delivery",
          ].map((step, i) => (
            <div className="process-step" key={i}>
              <span className="ms-2">{i + 1}</span>
              <p className="mx-3 mt-2">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="liveshoot-cta reveal"
        ref={(el) => (revealRefs.current[3] = el)}
      >
        <h2 className="fw-bold">Ready to Capture Something <span>Powerful?</span></h2>
        <p>
          Let our creative team turn real moments into compelling visual
          experiences.
        </p>
        <NavLink to="/contact" className="cta-btn">
          Talk to Our Creative Team
        </NavLink>
      </div>
    </section>
  );
};

export default LiveShoots;
