import { useState } from "react";
import "../style/header.css";
import "../style/tailwind.css";
import logo from "../assets/Big Logo.svg";
import slogo from "../assets/Shortlogo.svg";
import searchlogo from "../assets/search.svg";

export default function Header() {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const openNav = () => {
        setIsMenuActive(true);
    };

    const closeNav = () => {
        setIsMenuActive(false);
    };

    return (
        <>
            <div className="header">
                <div className="togglemenu">
                    <button onClick={openNav} className="menu-btn">☰</button>
                    <div id="mySidenav" className={`sidenav ${isMenuActive ? "active" : ""}`}>
                        <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
                        <a href="/"><img src={logo} alt="Logo" /></a>
                        <a href="/home">Home</a>
                        <a href="/about">About</a>
                        <a href="/video">Video</a>
                        <a href="/contact">Contact</a>
                    </div>
                </div>
                <div className="slogo">
                    <a href="/"><img src={slogo} alt="Logo" /></a>
                </div>
                <div className="search">
                    <div className="search-box">
                        <button className="btn-search"><img src={searchlogo} alt="Logo" /></button>
                        <input type="text" className="input-search" placeholder="Type to Search..." />
                    </div>

                </div>
            </div>
            <div
        className="gap"
        style={{ height: "60px", backgroundColor: "transparent" }}
      ></div>
        </>
    );
}