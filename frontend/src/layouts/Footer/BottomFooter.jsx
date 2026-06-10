import React from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsPinterest,
  BsYoutube,
} from "react-icons/bs";

const BottomFooter = () => {
  return (
    <div
      className="bottom-footer border-top py-3"
      style={{
        backgroundColor: "#f7f7f7",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side: Copyright Text */}
          <div className="col-md-4 text-md-start text-center">
            <p className="mb-0 text-muted">
              © 2025,{" "}
              <Link to="/" className="">
                Mutasim Naib
              </Link>
              <br />
              All rights reserved
            </p>
          </div>

          {/* Middle: Phone Number */}
          <div className="col-md-4 text-center">
            <div className=" align-items-center justify-content-center gap-2">
              <i className="bi bi-telephone text-muted"></i>
              <Link to="tel:8008008841" className=" fw-bold">
                8008008841
              </Link>
              <br />
              <span className="text-muted small">Working 8:00 - 22:00</span>
            </div>
          </div>

          {/* Right Side: Social Icons with React Icons */}
          <div className="col-md-4 text-md-end text-center mt-md-0 mt-2">
            <Link to="#" className=" pe-5">
              <BsFacebook size={20} />
            </Link>
            <Link to="#" className=" pe-5">
              <BsTwitter size={20} />
            </Link>
            <Link to="#" className=" pe-5">
              <BsInstagram size={20} />
            </Link>
            <Link to="#" className=" pe-5">
              <BsPinterest size={20} />
            </Link>
            <Link to="#" className="">
              <BsYoutube size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
