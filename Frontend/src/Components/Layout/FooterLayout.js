import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function FooterLayout() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
      <MDBContainer className='p-4 pb-0'>
        <section className=''>
          <p className='d-flex justify-content-center align-items-center'>
            <h2 style={{marginRight:"6%", marginBottom:"0.8%", color:"powderblue"}}>AirHub  </h2>
            <span className='me-3' style={{fontSize:"15px", color:"powderblue"}}>Feel the miles.</span>
          </p>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright: AirHub
      </div>
    </MDBFooter>
  );
}