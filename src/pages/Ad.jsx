import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const Add = () => (
  <Carousel style={{width:"90%",margin:"0 auto"}} autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
    <div>
      <h3 style={contentStyle}>Make your bussiness easy with Inhsor</h3>
    </div>
    <div>
      <h3 style={contentStyle}>For Add contact us</h3>
    </div> 
  </Carousel>
);
export default Add;