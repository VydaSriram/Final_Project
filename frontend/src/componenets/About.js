import React from "react";

function About() {
  return (
    <>
      <div>
        <h1
          style={{
            color: "blueviolet",
            textAlign: "center",
            marginTop: "1.3%",
            marginLeft: "35%",
            color: "#104c91",
            backgroundColor: "#efc9af",
            width: "16%",
            borderRadius:"3%"
          }}
        >
          {" "}
          ABOUT US
        </h1>
        <div
          className="division"
          style={{
            border: "solid",
            borderWidth: ".6mm",
            marginLeft: "15%",
            marginRight: "15%",
            marginTop: "2%",
          }}
        >
          <p style={{ margin: "1.5%" }}>
            Vehicle Store is completely authorized website where user can view
            the vehicles availabel ,then can login to cart and buy the vehicles
            and admin can login to add,remove or update data about the vehicles
          </p>
          <p style={{ margin: "1.5%" }}>
            OWNERS : RIYAZUDDIN ,SRIRAM
            <br />
            <br />
            Contact us at : 1234566543,8978967546
            <br />
            <br /> © Copyright 2022 Vehicle Store
            - All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
