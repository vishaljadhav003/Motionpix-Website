import { useEffect, useState } from "react";
import "./VisitorCounter.css";

const VisitorCounter = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);

  useEffect(() => {
    const VISIT_KEY = "total_visitors";
    const SESSION_KEY = "visit_recorded";

    const storedCount = Number(localStorage.getItem(VISIT_KEY)) || 0;

    // Count ONLY first open (not refresh)
    if (!sessionStorage.getItem(SESSION_KEY)) {
      const updatedCount = storedCount + 1;
      localStorage.setItem(VISIT_KEY, updatedCount);
      sessionStorage.setItem(SESSION_KEY, "true");
      setTotalVisitors(updatedCount);
    } else {
      setTotalVisitors(storedCount);
    }
  }, []);

  return (
    <div className="visitor-counter">
      <span className="pulse-dot-visitor" />
      <span className="visitor-text">
        {totalVisitors} people have visited this website.
      </span>
    </div>
  );
};

export default VisitorCounter;
