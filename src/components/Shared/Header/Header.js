import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../../store';
import Image from '../../Image/Image';
import UserBadge from '../../../assets/user-badge-two.png';
import './Header.scss';

const Header = () => {
  const SHOPIFY_URL =
    process.env.SHOPIFY_URL || 'https://hill-street-books.myshopify.com/';
  const [welcomeText, setWelcomeText] = useState('Sign In');
  const [menu, toggleMenu] = useState(false);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.info);
  const dispatch = useDispatch();
  const location = useLocation();
  const showProfile =
    location.pathname !== '/login' && location.pathname !== '/registration';

  useEffect(() => {
    if (userInfo && userInfo?.name) setWelcomeText(`Hi ${userInfo.name}`);
  }, [userInfo]);

  const handleMenu = () => {
    if (userInfo && userInfo?.name) {
      toggleMenu(!menu);
    } else {
      navigate('/login');
    }
  };

  const handleSignOut = () => {
    toggleMenu(!menu);
    dispatch(signOut());
    setWelcomeText('Sign In');
    navigate('/login');
  };

  const navigateToProfile = () => {
    toggleMenu(!menu);
    navigate('/profile');
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
          {menu ? (
            <div className="menu">
              <span className="menu-item" onClick={navigateToProfile}>
                View Profile
              </span>
              <span className="menu-item" onClick={handleSignOut}>
                Sign out
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Header;
