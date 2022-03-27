import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import ImageEdit from '../../../components/ImageEdit/ImageEdit';
import { resetUserDetails, updateUserDetails } from '../../../store';
import './Steps.scss';

const StepOne = forwardRef((props, ref) => {
  const userDetailsInitialState = useSelector(
    (state) => state.authorContent.author_details
  );

  const dispatch = useDispatch();
  const [words, setWords] = useState(0);
  const [userDetails, setUserDetails] = useState(userDetailsInitialState);

  const updateDetails = (target) => {
    const { name, value } = target;
    setUserDetails({
      ...userDetails,
      [name]: { ...userDetails[name], value: value }
    });
  };

  const updateStore = (data) => dispatch(updateUserDetails(data));

  const resetStore = () => dispatch(resetUserDetails());

  const validateFields = (data) => {
    let check = true;
    let temp = data;
    Object.keys(userDetails).forEach((item) => {
      if (
        item !== 'website' &&
        item !== 'display_picture' &&
        userDetails[item].value === ''
      ) {
        temp = {
          ...temp,
          [item]: { ...temp[item], error: 'This field cannot be empty' }
        };
        check = false;
      } else {
        temp = {
          ...temp,
          [item]: { ...temp[item], error: '' }
        };
      }
    });
    setUserDetails(temp);
    return check;
  };

  useImperativeHandle(
    ref,
    () => ({ data: userDetails, validateFields, updateStore, resetStore }),
    [userDetails]
  );

  //Count number of words in the biography
  useEffect(() => {
    var wom = userDetails.biography.value.match(/\S+/g);
    setWords(wom ? wom.length : 0);
  }, [userDetails.biography.value]);

  useEffect(() => {
    setUserDetails(userDetailsInitialState);
  }, [userDetailsInitialState]);

  return (
    <div className="step-wrapper">
      <div className="row">
        <TextField
          id="outlined-basic"
          value={userDetails.first_name.value}
          name="first_name"
          onChange={(event) => {
            updateDetails(event.target);
          }}
          label="First Name *"
          variant="outlined"
          error={userDetails.first_name.error === '' ? false : true}
          helperText={userDetails.first_name.error}
        />
        <TextField
          id="outlined-basic"
          value={userDetails.last_name.value}
          name="last_name"
          onChange={(event) => {
            updateDetails(event.target);
          }}
          label="Last Name *"
          variant="outlined"
          error={userDetails.last_name.error === '' ? false : true}
          helperText={userDetails.last_name.error}
        />
      </div>
      <div className="row">
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="DOB *"
            value={moment(userDetails.dob.value)}
            maxDate={moment()}
            onChange={(value) => {
              updateDetails({ name: 'dob', value });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          value={userDetails.email.value}
          name="email"
          onChange={(event) => {
            updateDetails(event.target);
          }}
          label="Email *"
          variant="outlined"
          type="email"
          error={userDetails.email.error === '' ? false : true}
          helperText={userDetails.email.error}
        />
      </div>
      <ImageEdit
        handleCrop={(value) => {
          updateDetails({ name: 'display_picture', value });
        }}
        label="Your Display Picture"
        imageSource={userDetails.display_picture.value}
      />
      <div className="row">
        <TextField
          id="outlined-basic"
          value={userDetails.website.value}
          name="website"
          onChange={(event) => {
            updateDetails(event.target);
          }}
          label="Your Website"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={userDetails.location.value}
          name="location"
          onChange={(event) => {
            updateDetails(event.target);
          }}
          label="Location *"
          variant="outlined"
          error={userDetails.location.error === '' ? false : true}
          helperText={userDetails.location.error}
        />
      </div>
      <TextField
        id="outlined-basic"
        value={userDetails.biography.value}
        name="biography"
        onChange={(event) => {
          updateDetails(event.target);
        }}
        label="Write a little bit about yourself *"
        multiline
        minRows={12}
        variant="outlined"
        error={userDetails.biography.error === '' ? false : true}
        helperText={userDetails.biography.error}
      />
      <div>Number of words : {words}</div>
    </div>
  );
});

export default React.memo(StepOne);
