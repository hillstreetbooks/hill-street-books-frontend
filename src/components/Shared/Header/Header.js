import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../../store';
import Image from '../../Image/Image';
import UserBadge from '../../../assets/user-badge-two.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { setAdminNotifications } from '../../../store';
import { AdminService } from '../../../services';
import './Header.scss';

const Header = () => {
  const SHOPIFY_URL =
    process.env.SHOPIFY_URL || 'https://hill-street-books.myshopify.com/';
  const [welcomeText, setWelcomeText] = useState('Sign In');
  const [menu, toggleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const userInfo = userState.info;
  const { notifications } = userState;
  const dispatch = useDispatch();
  const location = useLocation();
  const showProfile =
    location.pathname !== '/login' &&
    location.pathname !== '/registration' &&
    location.pathname !== '/';

  useEffect(() => {
    if (userInfo && userInfo?.name) setWelcomeText(`Hi ${userInfo.name}`);
    if (userInfo && userInfo?.isAdmin) {
      const { token } = userInfo;
      AdminService.fetchAdminNotifications(token)
        .then((response) => {
          dispatch(setAdminNotifications(response));
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  const navigateToAuthorPage = () => {
    toggleMenu(!menu);
    navigate(`/author/${userInfo._id}`);
  };

  const navigateToAuthorEditPage = () => {
    toggleMenu(!menu);
    navigate(`/author/edit/${userInfo._id}`);
  };

  const navigateToAuthorsPage = () => {
    toggleMenu(!menu);
    navigate(`/admin/dashboard`);
  };

  const viewAuthor = (data) => {
    console.log(data);
    const { userId, username } = data;
    const { token } = userInfo;
    AdminService.removeAdminNotifications(username, token).then((response) => {
      dispatch(setAdminNotifications(setAdminNotifications));
      navigate(`/author/${userId}`);
    });
  };

  const _renderNotifications = () => {
    let notificationList = [];
    if (!notifications.length) {
      notificationList.push(
        <div className="notification-tile" key={0}>
          <div className="details">
            <div className="time">No New Notifications</div>
          </div>
        </div>
      );
    } else {
      notifications.forEach((notification, index) => {
        notificationList.push(
          <div
            className="notification-tile"
            key={index}
            onClick={() => viewAuthor(notification)}
          >
            <div className="details">
              <div className="name">{notification.name}</div>
              <div className="time">{notification.lastUpdatedAt}</div>
            </div>
          </div>
        );
      });
    }
    return notificationList;
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
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
          {userInfo && userInfo?.isAdmin ? (
            <div className="notification-wrapper" onClick={toggleNotifications}>
              <FontAwesomeIcon icon={faBell} />
              {notifications.length !== 0 ? (
                <div className="notification-count">{notifications.length}</div>
              ) : null}
              {showNotifications ? (
                <div className="notification-list">
                  {_renderNotifications()}
                </div>
              ) : null}
            </div>
          ) : null}
          <div onClick={handleMenu} className="menu-wrapper">
            <Image fallbackImage={UserBadge} />
            <div className="details">{welcomeText}</div>
          </div>
          {menu ? (
            userInfo && userInfo?.isAdmin ? (
              <div className="menu">
                <span className="menu-item" onClick={navigateToAuthorsPage}>
                  View Authors
                </span>
                <span className="menu-item" onClick={navigateToProfile}>
                  View Profile
                </span>
                <span className="menu-item" onClick={handleSignOut}>
                  Sign out
                </span>
              </div>
            ) : (
              <div className="menu">
                <span className="menu-item" onClick={navigateToAuthorPage}>
                  Author Page
                </span>
                <span className="menu-item" onClick={navigateToAuthorEditPage}>
                  Edit Author Page
                </span>
                <span className="menu-item" onClick={navigateToProfile}>
                  View Profile
                </span>
                <span className="menu-item" onClick={handleSignOut}>
                  Sign out
                </span>
              </div>
            )
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default memo(Header);
