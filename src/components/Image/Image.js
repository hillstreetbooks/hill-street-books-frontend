import React, { useState } from 'react';
import ImageUnavailable from '../../assets/no-image-available.png';
import PropTypes from 'prop-types';
import './Image.scss';

const Image = ({ source, altText, fallbackImage }) => {
  const [load, setLoad] = useState(false);

  const addDefaultSrc = (event) => {
    event.target.src = fallbackImage || ImageUnavailable;
    setLoad(true);
  };

  const handleImageLoad = () => {
    setLoad(true);
  };

  return (
    <div className="image-wrapper">
      {!load ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : null}
      <img
        className="image"
        src={source}
        alt={altText}
        style={!load ? { display: 'none' } : {}}
        onLoad={handleImageLoad}
        onError={addDefaultSrc}
      />
    </div>
  );
};

Image.defaultProps = {
  source: '',
  altText: '',
  fallbackImage: ''
};

Image.propTypes = {
  source: PropTypes.string,
  altText: PropTypes.string,
  fallbackImage: PropTypes.string
};

export default React.memo(Image);
