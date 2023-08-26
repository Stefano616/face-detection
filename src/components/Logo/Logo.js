import React from "react";
import Tilt from 'react-parallax-tilt';
import icon from './icon-face-id.png';
import './Logo.css';

const Logo = () => {
    return (
        <Tilt className="logo br2  shadow-white ma4">
            <div className='ma4 mt pa2' >
                <img src={icon} alt="Logo" style={{ paddingTop: '5px' }} />
                <a target="_blank" href="https://icons8.com/icon/62053/face-id">Face ID</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
            </div>
        </Tilt>
    );
}

export default Logo;