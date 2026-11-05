import React from 'react';
import PropTypes from 'prop-types';
import "./Footer.css";

const Footer = ({ clase, desc1, desc2, desc3 }) => {

    const currentYear = new Date().getFullYear(); 

    return (
        <footer className="footer">
            <nav className={clase}> 
                <ul>
                    <li><a href="#" title="Ir a Facebook">{desc1}</a></li>
                    <li><a href="#" title="Ir a Instagram">{desc2}</a></li>
                    <li><a href="#" title="Ir a LinkedIn">{desc3}</a></li>
                </ul>
            </nav>
            <span>© Copyright - {currentYear}</span>
        </footer>
    );
}

Footer.propTypes = {
    clase: PropTypes.string,
    desc1: PropTypes.string,
    desc2: PropTypes.string,
    desc3: PropTypes.string,
};

export default Footer;