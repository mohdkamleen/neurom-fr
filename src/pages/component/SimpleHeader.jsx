import { ArrowLeftOutlined } from '@ant-design/icons';
import '../../css/Header.css'   
import { useNavigate } from 'react-router-dom';

export default function (props) {   
const navigate = useNavigate()
    return (
        <>
            <div style={{  display: "flex",gap:"40px", alignItems: "center", background: "white", position: "fixed", top: "0px", left: "0", right: "0", padding: "40px 5%", height: "60px", zIndex: "99" }}> 
                <b><ArrowLeftOutlined style={{ fontSize: "20px" }}  onClick={() => navigate(-1)} /></b>
                <h2>{props.title}</h2> 
            </div> 
        </>)
}

