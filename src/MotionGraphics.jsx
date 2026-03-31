import { useEffect, useRef } from "react";
import "./MotionGraphics.css";

const services = [
  "Kinetic Typography",
  "Brand Motion Identity",
  "Explainer Videos",
  "UI / App Motion",
  "Social Media Animations",
];

const MotionGraphics = () => {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle(
            "reveal-active",
            entry.isIntersecting
          )
        );
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mg-page">

      {/* HERO */}
      <div
        className="mg-hero reveal"
        ref={(el) => (revealRefs.current[0] = el)}
      >
        <h1>
          Motion <span>Graphics</span>
        </h1>

        {/* AUTO TEXT MOTION */}
        <div className="text-motion">
          <div className="text-track">
            {services.concat(services).map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
        </div>

        <p>
          High-impact motion design that brings brands, stories,
          and interfaces to life.
        </p>
      </div>

      {/* VIDEO */}
      <div
        className="mg-video reveal"
        ref={(el) => (revealRefs.current[1] = el)}
      >
        <div className="video-wrapper">
          <video src="../Motion Graphics.mp4" autoPlay muted loop playsInline />
        </div>
      </div>

      {/* SERVICES */}
      <div
        className="mg-services reveal"
        ref={(el) => (revealRefs.current[2] = el)}
      >
        <h2 className="section-title fw-bold">What We <span>Do</span></h2>

        <div className="services-grid">
          {services.map((item, i) => (
            <div className="service-card" key={i}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="mg-cta reveal"
        ref={(el) => (revealRefs.current[3] = el)}
      >
        <h2 className="fw-bold">Turn Static Ideas Into <span>Motion</span></h2>
        <p>
          Engage users, boost retention, and communicate faster with
          motion graphics.
        </p>
        <button className="cta-btn fw-bold">Start Your Project</button>
      </div>

    </section>
  );
};

export default MotionGraphics;
