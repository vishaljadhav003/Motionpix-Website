import { useEffect, useRef } from "react";
import "./Animation2D.css";
import { NavLink } from "react-router-dom";

const Animation2D = () => {

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
    <section className="animation2d-page">

      {/* HERO */}
      <div className="animation2d-hero reveal" ref={el => revealRefs.current[0] = el}>
        <div className="hero-content">
          <h1>2D <span>Animation</span></h1>
          <p>
            Simplifying ideas into engaging visual stories that convert,
            educate, and inspire.
          </p>
          <NavLink to="/contact" className="hero-btn">
            Start Your Animation
          </NavLink>
        </div>

        <div className="hero-media">
          <video
            src="../2D Animation.mp4"
            muted
            autoPlay
            loop
            playsInline
          />
        </div>
      </div>

      {/* WHAT WE DO */}
      <div className="container section reveal" ref={el => revealRefs.current[1] = el}>
        <h2 className="section-title">What We <span>Animate</span></h2>

        <div className="d-grid">
          {[
            "Explainer Videos",
            "Brand Story Videos",
            "Social Media Animations",
            "Product Demos",
            "Educational Videos",
            "UI Motion Graphics",
          ].map((item, i) => (
            <div className="feature-card-2d" key={i}>
              <span>0{i + 1}</span>
              <h3 className="fw-bold">{item}</h3>
              <p>
                Clean, visually appealing animations designed to communicate
                clearly and retain audience attention.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <div className="process-section reveal" ref={el => revealRefs.current[2] = el}>
        <h2 className="fw-bold">Our 2D Animation <span>Process</span></h2>

        <div className="process-flow">
          {["Script", "Storyboard", "Design", "Animation", "Sound"].map(
            (step, i) => (
              <div className="process-step" key={i}>
                <div className="step-circle ms-3">{i + 1}</div>
                <p className="mt-3">{step}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* WHY 2D */}
      <div className="container section">
        <h2 className="section-title fw-bold">Why 2D <span>Animation?</span></h2>

        <div className="why-grid">
          <div>🎯 Higher Engagement</div>
          <div>📈 Better Conversions</div>
          <div>🧠 Easy Storytelling</div>
          <div>⚡ Faster Production</div>
          <div>💰 Cost Effective</div>
          <div>📱 Perfect for Social Media</div>
        </div>
      </div>

      {/* CTA */}
      <div className="animation2d-cta">
        <h2 className="fw-bold">Have an Idea? Let’s <span>Animate It.</span></h2>
        <NavLink to="/contact" className="cta-btn">
          Contact Us
        </NavLink>
      </div>

    </section>
  );
};

export default Animation2D;
