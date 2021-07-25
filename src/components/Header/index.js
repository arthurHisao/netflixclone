import React from 'react';
import logo from '../assets/img/logo.png';
import user from '../assets/img/smile.png';
import './Header.css';

export default({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={logo} alt="logo" />
                </a>
            </div>

            <div className="header--user">
                <img src={user} alt="usuario"/>
            </div>
        </header>
    );
}