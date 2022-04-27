import React from 'react';
import FooterItem from './FooterItem';
import { FOOTER_CONTENT } from '../../../constants/Strings';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="section-wrapper">
        {FOOTER_CONTENT.SECTION_ONE.map((item, index) => {
          return (
            <FooterItem
              title={item.TITLE}
              content={item.CONTENT}
              icon={item.ICON}
              link={item.LINK}
              key={index}
            />
          );
        })}
      </div>
      <div className="section-wrapper copyright">
        Copyright © {new Date().getFullYear()}, Hill Street Books
      </div>
    </div>
  );
};

export default Footer;
