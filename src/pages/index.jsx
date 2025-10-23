import { } from '@ant-design/icons' 
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";
import LogoHeader from './component/LogoHeader';

export default function(){  

    return (
        <div>
            <LogoHeader />
            <br />
            <Header /> 
            <br />
            <br />
            <br />
            <Outlet /> <br />
            <Footer />
        </div>
    )
}
 

