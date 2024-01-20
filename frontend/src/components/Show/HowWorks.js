import React from "react";
import "./HowWorks.css";

const HowWorks = (props) => {
  return (
    <div className="How-Works">
      <div className="header-works">
        <h3>How BT-PARKING Works</h3>
      </div>
      <div className="body-works">
        <div className="content-left">
          <div className="image"></div>
          <div className="note">Look</div>
          <div className="text">
            <p>
              Search and compare prices at thousands of parking facilities
              across VietNam.
            </p>
          </div>
        </div>
        <div className="content-center">
          <div className="image-center"></div>
          <div className="note-center">Book</div>
          <div className="text-center">
            <p>
            Pay securely and receive a prepaid parking pass instantly via email or in the app.
            </p>
          </div>
        </div>
        <div className="content-right">
          <div className="image-right"></div>
          <div className="note-right">Park</div>
          <div className="text-right">
            <p>
            When you arrive, follow the instructions included in your pass, park, and go!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HowWorks;
