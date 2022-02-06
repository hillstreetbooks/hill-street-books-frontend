import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import UserBadge from '../../assets/user-badge-two.png';
import { UserContext } from '../../App';
import './Header.scss';

const Header = ({ showProfile }) => {
  const SHOPIFY_URL =
    process.env.SHOPIFY_URL || 'https://hill-street-books.myshopify.com/';
  const [welcomeText, setWelcomeText] = useState('Sign In');
  const [menu, toggleMenu] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleMenu = () => {
    if (user) {
      toggleMenu(!menu);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="header-wrapper">
      <div className="logo-wrapper">
        <a className="logo" href={SHOPIFY_URL}>
          Hill Street Books
        </a>
      </div>
      {showProfile ? (
        <div className="user-section">
          <div onClick={handleMenu} className="menu-wrapper">
            <Image fallbackImage={UserBadge} />
            <div className="details">{welcomeText}</div>
          </div>
          {menu ? <div className="menu">{welcomeText}</div> : null}
        </div>
      ) : null}
    </div>
  );
};

Header.defaultProps = {
  showProfile: true
};

Header.propTypes = {
  showProfile: PropTypes.bool
};

export default Header;
