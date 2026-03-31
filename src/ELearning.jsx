import { useEffect, useRef, useState } from "react";
import "./ELearning.css";
import QuizSection from "./QuizSection";
import { NavLink } from "react-router-dom";
// import LearningVideo from "../../assets/videos/ELearning.mp4";

/* COURSE CATEGORIES */
const courseCategories = [
  "UI / UX Design",
  "Industrial Training",
  "3D Animation",
  "Motion Graphics",
  "Branding & Marketing",

];

/* STATISTICS */
const stats = [
  { value: 12000, label: "Active Learners" },
  { value: 250, label: "Courses Created" },
  { value: 40, label: "Industry Experts" },
  { value: 98, label: "Completion Rate " },
];

/* QUIZ QUESTIONS */
// const quizSample = [
//   {
//     q: "What is the primary goal of e-learning?",
//     options: [
//       "Entertainment",
//       "Knowledge Transfer",
//       "Gaming",
//       "Marketing",
//     ],
//     answer: 1,
//   },
// ];

const ELearning = () => {
  const revealRefs = useRef([]);
  const [count, setCount] = useState(stats.map(() => 0));
  const [selected, setSelected] = useState(null);

  /* REVEAL ANIMATION */
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

  /* COUNTER ANIMATION */
  useEffect(() => {
    stats.forEach((stat, i) => {
      let start = 0;
      const interval = setInterval(() => {
        start += Math.ceil(stat.value / 50);
        if (start >= stat.value) {
          start = stat.value;
          clearInterval(interval);
        }
        setCount((prev) => {
          const updated = [...prev];
          updated[i] = start;
          return updated;
        });
      }, 90);
    });
  }, []);

  return (
    <section className="el-page">

      {/* HERO */}
      <div className="el-hero reveal" ref={(el) => (revealRefs.current[0] = el)}>
        <h1>E-Learning <span>Solutions</span></h1>
        <p>
          Scalable digital education experiences designed for modern learners.
        </p>
      </div>

      {/* VIDEO */}
      <div className="el-video reveal" ref={(el) => (revealRefs.current[1] = el)}>
        <div className="video-wrapper">
          <video src="../E-Learning.mp4" autoPlay muted loop playsInline />
        </div>
      </div>

      {/* COURSE CATEGORY SLIDER */}
      <div
        className="el-category reveal"
        ref={(el) => (revealRefs.current[2] = el)}
      >
        <h2 className="section-title">Course <span>Categories</span></h2>
        <div className="category-slider">
          {courseCategories.map((cat, i) => (
            <div className="category-card" key={i}>
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* STATISTICS */}
      <div
        className="el-stats reveal"
        ref={(el) => (revealRefs.current[3] = el)}
      >
        {stats.map((item, i) => (
          <div className="stat-box" key={i}>
            <h3 className="fw-bold">{count[i]}+</h3>
            <p className="fw-bold">{item.label}</p>
          </div>
        ))}
      </div>

      {/* CERTIFICATES */}
      <div
        className="el-cert reveal"
        ref={(el) => (revealRefs.current[4] = el)}
      >
        <h2 className="section-title">Certification & <span>Recognition</span></h2>
        <div className="cert-grid">
          <div className="cert-badge">ISO Certified</div>
          <div className="cert-badge">Industry Approved</div>
          <div className="cert-badge">Skill Verified</div>
          <div className="cert-badge">Globally Recognized</div>
        </div>
      </div>

      {/* QUIZ PREVIEW */}
      {/* <div
        className="el-quiz reveal"
        ref={(el) => (revealRefs.current[5] = el)}
      >
        <h2 className="section-title">Interactive Quiz Preview</h2>
        <div className="quiz-box">
          <p className="quiz-q">{quizSample[0].q}</p>
          {quizSample[0].options.map((opt, i) => (
            <button
              key={i}
              className={`quiz-opt ${
                selected === i ? "active" : ""
              }`}
              onClick={() => setSelected(i)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div> */}
      <QuizSection/>

      {/* CTA */}
        <div
          className="el-cta reveal"
          ref={(el) => (revealRefs.current[5] = el)}
        >
          <h2 className="fw-bold">Start Your Learning Journey <span>Today</span></h2>
          <p>
            Upgrade your skills with industry-focused courses, expert mentors,
            and interactive learning experiences.
          </p>
          <NavLink to="/contact"><button className="cta-btn">Enroll Now</button></NavLink>
        </div>


      

    </section>
  );
};

export default ELearning;
