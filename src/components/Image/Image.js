import React, { useState } from 'react';
import ImageUnavailable from '../../assets/no-image.png';
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
    <>
      {!load ? (
        <div className="image-loader-wrapper">
          <div className="image-loader"></div>
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
    </>
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
