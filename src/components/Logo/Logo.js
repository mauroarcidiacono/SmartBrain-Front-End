import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return(
        <div className="ma4 mt0" style={{width: '150px'}}>
            <Tilt className="Tilt parallax-effect br2 shadow-2" perspective={1000}>
                <div className="inner-element" style={{ width: '150px', height: '150px' }}>
                    <div className="pa3">
                        <img style={{paddingTop: '5px'}} src={brain} alt="logo of a brain"/>
                    </div>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;