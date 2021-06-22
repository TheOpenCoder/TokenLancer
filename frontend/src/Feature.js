import React from 'react';
import './Feature.css';

function Feature({ src, title, content }) {
    return (
        <div className="feature">
            <div className="single__top">
                <img src={src} alt="single" />
                <h3>{title}</h3>
            </div>
            <div className="feature__info">
                {/* <h4>{title}</h4> */}
                <h6>{content}</h6>
            </div>
        </div>
    )
}

export default Feature
