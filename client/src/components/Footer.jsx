import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import './Footer.css';

export default function Footer() {
  return (
    <MDBFooter className='bg-secondary text-white text-center text-md-start main__footer'>
      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg="6" md="12" className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Footer Content</h5>

            <p>
              We strive to make it easy for you and your team
              to get work done. No matter what project, workflow,
              or type of team, it will help keep things organized.

            </p>
          </MDBCol>

          <MDBCol lg="3" md="6" className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Links</h5>

            <ul className='list-unstyled mb-0'>
              <li>
                <a href='/about' className='text-white'>
                  About Us
                </a>
              </li>
              <li>
                <a href='/contact' className='text-white'>
                  Contact Us
                </a>
              </li>

            </ul>
          </MDBCol>

          <MDBCol lg="3" md="6" className='mb-4 mb-md-0'>
            <h5 className='text-uppercase mb-0'>Links</h5>

            <ul className='list-unstyled'>
              <li>
                <a href='#!' className='text-white'>
                  FAQ
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Sign In
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Sign Up
                </a>
              </li>
            </ul>
          </MDBCol>
          <span className='footer__copyright'>
            © 2022 Copyright:  <a className='text-white' href='/'>
              Doable.com
            </a>
          </span>
        </MDBRow>
      </MDBContainer>




    </MDBFooter>
  );
};
