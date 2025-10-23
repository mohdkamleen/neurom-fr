import { Carousel } from 'antd';

export default function MainBanner() {
    return (
        <div style={{ margin: '20px 5%',border:"1px solid gray"}}> 
            <Carousel arrows autoplay autoplaySpeed={5000} dots>
                {[
                    // "./img/banner1.jpeg",
                    // "./img/banner2.jpeg", 
                    // "./img/banner3.jpeg", 
                    "./img/banner4.jpg", 
                    "./img/banner5.jpg", 
                ].map((src, index) => (
                    <div key={index} className="carousel-image-container">
                        <img style={{width:"100%",maxHeight:"80vh"}} src={src} alt={`Team ${index + 1}`} />
                    </div>
                ))}
            </Carousel> 
        </div>
    );
}
