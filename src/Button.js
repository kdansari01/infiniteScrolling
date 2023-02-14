import { useEffect, useState } from "react";
import "./button.css";

const Button = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.pageYOffset > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <button
        className={
          showScrollButton ? "show-scroll-button" : "hide-scroll-button"
        }
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ^
      </button>
    </div>
  );
};
export default Button;
