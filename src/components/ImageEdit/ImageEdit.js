import React, { useEffect, useState } from 'react';
import Cropper from 'react-cropper';
import PropTypes from 'prop-types';
import 'cropperjs/dist/cropper.css';
import './ImageEdit.scss';

export const ImageEdit = ({ imageSource, handleCrop }) => {
  const [image, setImage] = useState(imageSource);
  const [cropData, setCropData] = useState(imageSource);
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      handleCrop(cropper.getCroppedCanvas().toDataURL());
    }
  };

  useEffect(() => {
    setImage(imageSource);
    setCropData(imageSource);
  }, [imageSource]);

  return (
    <div className="image-edit-wrapper">
      <div style={{ width: '100%' }}>
        <div className="image-actions-wrapper">
          <input type="file" onChange={onChange} />
          <button onClick={getCropData}>Crop Image</button>
        </div>
        {image !== '' ? (
          <div className="image-crop">
            <Cropper
              style={{ maxHeight: '300px', height: '100%', width: '100%' }}
              zoomTo={0.5}
              initialAspectRatio={1}
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
          </div>
        ) : null}
      </div>
      {image !== '' ? (
        <div className="cropped-image-wrapper">
          <div className="box">
            <div className="title">Cropped Image</div>
            {cropData ? (
              <img className="cropped-image" src={cropData} alt="cropped" />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

ImageEdit.defaultProps = {
  imageSource: '',
  handleCrop: () => {
    return;
  }
};

ImageEdit.propTypes = {
  imageSource: PropTypes.string,
  handleCrop: PropTypes.func
};

export default React.memo(ImageEdit);
