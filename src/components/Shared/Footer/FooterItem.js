import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const FooterItem = ({ title, content, icon, link }) => {
  return (
    <div className="footer-item">
      <div className="title">{title}</div>
      <a href={link} className="content">
        {icon ? <FontAwesomeIcon icon={icon} /> : null}
        {content}
      </a>
    </div>
  );
};

FooterItem.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};

export default FooterItem;
