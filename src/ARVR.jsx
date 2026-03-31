import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./ARVR.css";

const ARVR = () => {
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
    <section className="arvr-page">

      {/* HERO */}
      <div className="arvr-hero reveal" ref={(el) => (revealRefs.current[0] = el)}>
        <div className="hero-text-1">
          <h1>AR & VR <span>Experiences</span></h1>
          <p>
            Immersive Augmented & Virtual Reality solutions that transform how
            users interact with products, spaces, and stories.
          </p>
          <NavLink to="/contact" className="hero-btn">
            Build an AR/VR Experience
          </NavLink>
        </div>

        <div className="hero-media">
          <video
            src="https://www.pexels.com/download/video/8762895/"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>

      {/* USE CASES */}
      <div className="container section reveal" ref={(el) => (revealRefs.current[1] = el)}>
        <h2 className="section-title">Where AR & VR Make <span>Impact</span></h2>

        <div className="usecase-grid-1">
          {[
            "Product Visualization & Demos",
            "Virtual Showrooms & Tours",
            "Training & Simulations",
            "AR Marketing Campaigns",
            "Real Estate Walkthroughs",
            "Metaverse Experiences",
          ].map((item, i) => (
            <div className="usecase-card-1" key={i}>
              <h3>{item}</h3>
              <p>
                High-fidelity immersive experiences built for performance,
                engagement, and scalability.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <div className="process-section reveal" ref={(el) => (revealRefs.current[2] = el)}>
        <h2 className="fw-bold">Our AR / VR Development <span>Process.</span></h2>

        <div className="process-flow">
          {[
            "Concept & Use-Case",
            "UX Flow & Storyboarding",
            "3D Asset Creation",
            "AR/VR Development",
            "Testing & Optimization",
            "Deployment & Support",
          ].map((step, i) => (
            <div className="process-step" key={i}>
              <span className="step-index ms-3">{i + 1}</span>
              <p className="mx-3 mt-2">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section reveal" ref={(el) => (revealRefs.current[3] = el)}>
        <h2 className="fw-bold">Ready to Enter the Immersive <span>Future?</span></h2>
        <p>
          Let’s build AR & VR solutions that captivate users and drive real
          business outcomes.
        </p>
        <NavLink to="/contact" className="cta-btn">
          Talk to AR/VR Experts
        </NavLink>
      </div>

    </section>
  );
};

export default ARVR;
