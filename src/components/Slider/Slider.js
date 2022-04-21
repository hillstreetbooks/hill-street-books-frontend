import React from 'react';
import PropTypes from 'prop-types';
import { Swiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Slider.scss';

const Slider = ({
  autoplay,
  children,
  spaceBetween,
  centeredSlides,
  centerInsufficientSlides,
  initialSlide,
  slidesPerView,
  navigation,
  pagination,
  loop
}) => {
  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        initialSlide={initialSlide}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        navigation={navigation}
        centerInsufficientSlides={centerInsufficientSlides}
        centeredSlides={centeredSlides}
        pagination={{ clickable: pagination }}
        loop={loop}
        autoplay={autoplay}
        breakpoints={{
          0: {
            slidesPerView: 1
          },
          500: {
            slidesPerView: 2
          },
          900: {
            slidesPerView: 3
          },
          1100: {
            slidesPerView: slidesPerView
          }
        }}
      >
        {children}
      </Swiper>
    </div>
  );
};

Slider.defaultProps = {
  autoplay: false,
  initialSlide: 0,
  slidesPerView: 3,
  spaceBetween: 0,
  centeredSlides: false,
  draggable: false,
  navigation: true,
  pagination: false,
  loop: false
};

Slider.propTypes = {
  autoplay: PropTypes.bool,
  draggable: PropTypes.bool,
  initialSlide: PropTypes.number,
  spaceBetween: PropTypes.number,
  centeredSlides: PropTypes.bool,
  navigation: PropTypes.bool,
  pagination: PropTypes.bool,
  loop: PropTypes.bool
};

export default React.memo(Slider);
