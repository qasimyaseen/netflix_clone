import React, { useEffect, useState } from "react";
import "./nav.css";

function Nav() {
  const [show, handleShow] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`Nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
        alt="Netflix logo"
      />

      <img
        className="nav_avatar"
        src="https://i.pinimg.com/564x/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.jpg"
        alt="smile logo"
      />
    </div>
  );
}

export default Nav;
