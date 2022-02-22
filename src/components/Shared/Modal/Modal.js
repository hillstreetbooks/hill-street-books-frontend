import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4
};

const PopupModal = ({ show, toggleVisibility, title, message }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={show}
        onClose={toggleVisibility}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={show}>
          <Box sx={style}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                fontSize: '1.25rem'
              }}
            >
              <div
                style={{
                  display: 'inline',
                  padding: '.25rem .5rem',
                  border: '1px solid black',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={toggleVisibility}
              >
                X
              </div>
            </div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 4, mb: 4 }}>
              {message}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

PopupModal.defaultProps = {
  show: false,
  title: '',
  message: ''
};

PopupModal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string
};

export default PopupModal;
