import { useEffect, useRef } from "react";
import "./GraphicsIndustrial.css";
import IndustrialVideo from "../public/Graphics Design.mp4";
import { NavLink } from "react-router-dom";

const services = [
  {
    title: "Brand Graphics Design",
    desc: "Logos, brand identity, marketing creatives & digital assets.",
    icon: "🎨",
  },
  {
    title: "Industrial 3D Animation",
    desc: "Product mechanisms, plant walkthroughs & technical visuals.",
    icon: "🏭",
  },
  {
    title: "Explainer Videos",
    desc: "Complex processes simplified with cinematic storytelling.",
    icon: "🎥",
  },
  {
    title: "Product Visualization",
    desc: "High-end renders for sales, training & marketing.",
    icon: "🧩",
  },
];

const process = [
  "Research & Engineering Understanding",
  "Storyboard & Visual Planning",
  "3D Modeling & Texturing",
  "Animation & Simulation",
  "Lighting, Rendering & Delivery",
];

const GraphicsIndustrial = () => {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "reveal-active",
            entry.isIntersecting
          );
        });
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="gi-page">
      {/* HERO */}
      <div className="gi-hero reveal" ref={(el) => (revealRefs.current[0] = el)}>
        <h1>
          Graphics Design & <span>Industrial Animation</span>
        </h1>
        <p>
          We transform complex engineering concepts into powerful visual
          experiences that sell, educate, and inspire.
        </p>
      </div>

      {/* VIDEO — AFTER HEADING */}
      <div className="gi-video reveal" ref={(el) => (revealRefs.current[1] = el)}>
        <div className="video-wrapper">
          <video
            src={IndustrialVideo}
            autoPlay
            unmuted
            loop
            playsInline
            controls
          />
        </div>
      </div>

      {/* SERVICES */}
      <div className="gi-services reveal" ref={(el) => (revealRefs.current[2] = el)}>
        <h2 className="section-title">What We <span>Do</span></h2>
        <div className="services-grid1">
          {services.map((item, i) => (
            <div className="service-card1" key={i}>
              <span className="icon">{item.icon}</span>
              <h4 className="fw-bold">{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <div className="gi-process reveal" ref={(el) => (revealRefs.current[3] = el)}>
        <h2 className="section-title">Our Industrial Animation <span>Process</span></h2>
        <div className="process-steps mt-3">
          {process.map((step, i) => (
            <div className="process-step" key={i}>
              <span className="step-no mx-3">0{i + 1}</span>
              <p className="mt-2">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="gi-cta reveal" ref={(el) => (revealRefs.current[4] = el)}>
        <h2 className="fw-bold">Ready to Visualize Your <span>Industry?</span></h2>
        <p>
          Let’s create visuals that communicate precision, performance &
          innovation.
        </p>
        <NavLink to='/contact'><button className="cta-btn">Request a Consultation</button></NavLink>
      </div>
    </section>
  );
};

export default GraphicsIndustrial;
