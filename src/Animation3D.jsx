import "./Animation3D.css";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Animation3D = () => {
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
    <section className="animation3d-page">

      {/* HERO */}
      <div className="animation3d-hero reveal" ref={(el) => (revealRefs.current[0] = el)}>
        <div className="hero-text">
          <h1>3D Animation & <span>Visualization</span></h1>
          <p>
            High-fidelity 3D visuals that bring products, spaces and ideas to life.
          </p>
          <NavLink to="/contact" className="hero-btn">
            Request a 3D Demo
          </NavLink>
        </div>

        <div className="hero-visual">
          <video
            src="../3D Animation.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>

      {/* USE CASES */}
      <div className="container section reveal" ref={(el) => (revealRefs.current[1] = el)}>
        <h2 className="section-title">What We Create in <span>3D</span></h2>

        <div className="usecase-grid-3">
          {[
            "Product Visualization",
            "Architectural Walkthroughs",
            "Industrial Simulations",
            "Medical & Technical Models",
            "AR / VR Ready Assets",
            "Exploded View Animations",
          ].map((item, i) => (
            <div className="usecase-card-3" key={i}>
              <h3 className="fw-bold">{item}</h3>
              <p>
                Precision-driven 3D assets crafted for realism, clarity, and scale.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PIPELINE */}
      <div className="pipeline-section reveal" ref={(el) => (revealRefs.current[2] = el)}>
        <h2 className="fw-bold">Our 3D Production <span>Pipeline</span></h2>

        <div className="pipeline">
          {[
            "Concept & References",
            "3D Modeling",
            "Texturing & Materials",
            "Lighting & Rendering",
            "Animation & Camera",
            "Post-Production",
          ].map((step, i) => (
            <div className="pipeline-step" key={i}>
              <span className="step-index">{i + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section reveal" ref={(el) => (revealRefs.current[3] = el)}>
        <h2 className="fw-bold">Need Realistic <span>3D Visuals?</span></h2>
        <p>
          From concept renders to cinematic animations — we handle the full 3D
          pipeline.
        </p>
        <NavLink to="/contact" className="cta-btn">
          Talk to Our 3D Team
        </NavLink>
      </div>

    </section>
  );
};

export default Animation3D;
