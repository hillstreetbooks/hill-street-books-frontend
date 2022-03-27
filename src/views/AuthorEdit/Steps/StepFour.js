import React, { useEffect, useState } from 'react';
import { Icon, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateVideos } from '../../../store';
import './Steps.scss';

const StepFour = () => {
  const videosInitialState = useSelector((state) => state.authorContent.videos);

  const dispatch = useDispatch();
  const [videos, setVideos] = useState(videosInitialState);
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  const handleInputChange = (event, arrayIndex) => {
    const { name, value } = event.target;
    setVideos(
      videos.map((item, index) =>
        index === arrayIndex ? { ...item, value: value } : item
      )
    );
  };

  const addVideo = () => {
    let listLength = videos.length > 0 ? videos.length - 1 : 0;
    if (!youtubeRegex.test(videos[listLength].value)) {
      setVideos(
        videos.map((item, index) =>
          index === listLength
            ? { ...item, error: 'Please enter a valid Youtube url!' }
            : item
        )
      );
      dispatch(
        updateVideos(
          videos.map((item, index) =>
            index === listLength
              ? { ...item, error: 'Please enter a valid Youtube url!' }
              : item
          )
        )
      );
    } else {
      setVideos([...videos, { value: '', error: '' }]);
      dispatch(updateVideos([...videos, { value: '', error: '' }]));
    }
  };

  const removeVideo = (index) => {
    let newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
    dispatch(updateVideos(newVideos));
  };

  useEffect(() => {
    setVideos(videosInitialState);
  }, [videosInitialState]);

  return (
    <div className="step-wrapper">
      {videos.map((element, index) => (
        <div className="video-list-wrapper" key={index}>
          <TextField
            name="video"
            error={element.error === '' ? false : true}
            id="outlined-basic"
            value={element.value || ''}
            onChange={(event) => {
              handleInputChange(event, index);
            }}
            label="Enter the YouTube URL for your video"
            variant="outlined"
            helperText={element.error}
          />
          {videos.length === 0 || index === videos.length - 1 ? (
            <Icon
              sx={{ color: '#577b46', fontSize: '2rem' }}
              onClick={addVideo}
            >
              add_circle
            </Icon>
          ) : null}
          {index ? (
            <Icon
              sx={{ color: '#577b46', fontSize: '2rem' }}
              onClick={() => removeVideo(index)}
            >
              remove_circle
            </Icon>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default StepFour;
