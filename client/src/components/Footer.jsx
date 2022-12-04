import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./Footer.css";

export default function Footer() {
  return (
    <MDBFooter className="text-white text-center text-md-start main__footer">
      <MDBContainer className="p-2">
        <MDBRow>
          <MDBCol lg="6" md="12" className="mb-2 mb-md-0">
            <h5 className="text-uppercase">About DOABLE</h5>
            <p>
              We strive to make it easy for you and your team to get work done.
              No matter what project, workflow, or type of team, it will help
              keep things organized.
            </p>
            <span>
              © 2022 Copyright:{" "}
              <a className="text-white" href="/">
                Doable.com
              </a>
            </span>
          </MDBCol>
          <MDBCol lg="6" md="6" className="mb-2 mb-md-0">
            <ul className="list-unstyled mb-0">
              <center>
                <a href="/about" className="text-white">
                  About Us
                </a>
                {"  "}
                <a href="/contact" className="text-white">
                  Contact Us
                </a>
                {"  "}
                <a href="#!" className="text-white">
                  FAQ
                </a>
                {"  "}
                <a href="/login" className="text-white">
                  Sign In
                </a>
                {"  "}
                <a href="#!" className="text-white">
                  Sign Up
                </a>
              </center>
            </ul>
            <section className="flex-child">
              <center>
                <div className="all__icons">
                  <MDBBtn
                    rippleColor="dark"
                    color="link"
                    floating
                    size="lg"
                    className="text-dark m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab className="fab fa-facebook-f" />
                  </MDBBtn>
                  
                  <MDBBtn
                    rippleColor="dark"
                    color="link"
                    floating
                    size="lg"
                    className="text-dark m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab className="fa-twitter" />
                  </MDBBtn>

                  <MDBBtn
                    rippleColor="dark"
                    color="link"
                    floating
                    size="lg"
                    className="text-dark m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab className="fa-google" />
                  </MDBBtn>

                  <MDBBtn
                    rippleColor="dark"
                    color="link"
                    floating
                    size="lg"
                    className="text-dark m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab className="fa-instagram" />
                  </MDBBtn>

                  <MDBBtn
                    rippleColor="dark"
                    color="link"
                    floating
                    size="lg"
                    className="text-dark m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab className="fa-linkedin" />
                  </MDBBtn>

                  <MDBBtn
                    rippleColor="dark"
                    color="link"
                    floating
                    size="lg"
                    className="text-dark m-1"
                    href="#!"
                    role="button"
                  >
                    <MDBIcon fab className="fa-github" />
                  </MDBBtn>
                </div>
              </center>
            </section>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}
