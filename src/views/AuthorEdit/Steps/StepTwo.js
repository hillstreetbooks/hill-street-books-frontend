import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { resetSocialLinks, updateSocialLinks } from '../../../store';
import './Steps.scss';

const StepTwo = forwardRef((props, ref) => {
  const socialLinksInitialState = useSelector(
    (state) => state.authorContent.social_links
  );
  const dispatch = useDispatch();

  const [socialLinks, setSocialLinks] = useState(socialLinksInitialState);

  const updateDetails = (target) => {
    const { name, value } = target;
    setSocialLinks({
      ...socialLinks,
      [name]: value
    });
  };

  const updateStore = (data) => {
    dispatch(updateSocialLinks(data));
  };

  const resetStore = () => dispatch(resetSocialLinks());

  useEffect(() => {
    setSocialLinks(socialLinksInitialState);
  }, [socialLinksInitialState]);

  useImperativeHandle(
    ref,
    () => ({ data: socialLinks, updateStore, resetStore }),
    [socialLinks]
  );

  return (
    <div className="step-wrapper">
      <div className="row">
        <TextField
          id="outlined-basic"
          value={socialLinks.facebook}
          name="facebook"
          onChange={(event) => {
            updateDetails(event.target);
          }}
          label="Facebook"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={socialLinks.instagram}
          name="instagram"
          onChange={(event) => {
            updateDetails(event.target);
          }}
          label="Instagram"
          variant="outlined"
        />
      </div>
      <div className="row">
        <TextField
          id="outlined-basic"
          value={socialLinks.twitter}
          name="twitter"
          onChange={(event) => {
            updateDetails(event.target);
          }}
          label="Twitter"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={socialLinks.pinterest}
          name="pinterest"
          onChange={(event) => {
            updateDetails(event.target);
          }}
          label="Pinterest"
          variant="outlined"
        />
      </div>
    </div>
  );
});

export default StepTwo;
