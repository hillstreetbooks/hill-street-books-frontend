import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import YouTube from 'react-youtube';
import { Button, Image, Loader, Slider } from '../../components';
import { AuthorContentService } from '../../services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faPinterest
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { resetAuthorContent } from '../../store';
import './Author.scss';

const Author = ({ isAdmin }) => {
  const userInfo = useSelector((state) => state.user.info);
  const authorContent = useSelector((state) => state.authorContent);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authorId } = useParams();
  const { author_details, social_links, books, videos } = authorContent;
  const [details, setDetails] = useState({
    author_details,
    social_links,
    books,
    videos
  });
  const SHOPIFY_URL =
    process.env.SHOPIFY_URL || 'https://hill-street-books.myshopify.com/';
  const [showModal, setShowModal] = useState(false);
  const [book, setBook] = useState({});
  const [isLoading, updateLoader] = useState(false);
  const [authorNotFound, setAuthorNotFound] = useState(false);
  const opts = {
    height: '360',
    width: '100%',
    playerVars: {
      autoplay: 0
    }
  };

  const socialLinks = {
    facebook: faFacebook,
    instagram: faInstagram,
    twitter: faTwitter,
    pinterest: faPinterest
  };

  const _renderSlides = () => {
    let bookList = [];
    for (let i = 0; i < 9; i++) {
      bookList.push(
        <SwiperSlide key={i}>
          <div
            className="book-wrapper"
            onClick={() => viewBook(details.books[0])}
          >
            <div className="book-cover-wrapper">
              <Image
                source={details.books[0].bookCover}
                altText={details.books[0].title}
              />
            </div>
            <div className="book-content">
              <div className="book-row">
                <div className="title">{details.books[0].title}</div>
              </div>
              <div className="book-row">
                <div className="description">
                  {details.books[0].description}
                </div>
              </div>
              <div className="book-row">
                <div className="price">{details.books[0].price}</div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    }
    // details.books.forEach((item, index) => {
    //   //for (let i = 0; i < 3; i++) {
    //   bookList.push(
    //     <SwiperSlide key={index}>
    //       <div className="book-wrapper" onClick={() => viewBook(item)}>
    //         <div className="book-cover-wrapper">
    //           <Image source={item.bookCover} altText={item.title} />
    //         </div>
    //         <div className="book-content">
    //           <div className="book-row">
    //             <div className="title">{item.title}</div>
    //           </div>
    //           <div className="book-row">
    //             <div className="description">{item.description}</div>
    //           </div>
    //           <div className="book-row">
    //             <div className="price">{item.price}</div>
    //           </div>
    //         </div>
    //       </div>
    //     </SwiperSlide>
    //   );
    //   //}
    // });
    return bookList;
  };

  const _renderVideos = () => {
    let videoList = [];
    details.videos.forEach((video, index) => {
      if (video && video.value !== '') {
        var url = new URL(video.value);
        var videoId = url.searchParams.get('v');
        videoList.push(
          <div className="video-item" key={index}>
            <YouTube videoId={videoId} opts={opts} />
          </div>
        );
      }
    });

    return videoList;
  };

  const _renderSocialLinks = () => {
    let list = [];
    list.push(
      <a target="_blank" href={`mailto:${userInfo.username}`} key={0}>
        <FontAwesomeIcon icon={faEnvelope} />
      </a>
    );
    Object.keys(details.social_links).forEach((item, index) => {
      if (details.social_links[item] !== '')
        list.push(
          <a target="_blank" href={details.social_links[item]} key={index + 1}>
            <FontAwesomeIcon icon={socialLinks[item]} />
          </a>
        );
    });
    return list;
  };

  const viewBook = (item) => {
    setBook(item);
    setShowModal(true);
    //document.body.style.overflow = showModal ? 'auto' : 'hidden';
  };

  useEffect(() => {
    const { token } = userInfo;
    updateLoader(true);
    AuthorContentService.fetchContent(authorId, token)
      .then((response) => {
        if (response && Object.keys(response).length > 0) {
          setDetails(response);
          updateLoader(false);
        } else if (isAdmin) {
          updateLoader(false);
          setAuthorNotFound(true);
        } else {
          dispatch(resetAuthorContent());
          navigate(`/author/edit/${authorId}`);
          updateLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
        updateLoader(false);
      });
  }, [authorId]);

  return (
    <>
      <>
        {!authorNotFound ? (
          <div className="author-content-wrapper">
            <div className="title">
              {`${details?.author_details?.first_name?.value} 
          ${details?.author_details?.last_name?.value}`}
            </div>
            <div className="author-content-row">
              <div className="display-picture-wrapper">
                <Image
                  source={details?.author_details?.display_picture.value}
                />
              </div>
              <div className="description">
                {details?.author_details?.biography.value}
              </div>
            </div>
            <div className="heading">Come Join the Adventure!</div>
            {!details.books.length ? (
              <div className="no-books" key={0}>
                No Books to display
              </div>
            ) : (
              <Slider
                slidesPerView={5}
                spaceBetween={30}
                //loop={true}
                centerInsufficientSlides={true}
              >
                {_renderSlides()}
              </Slider>
            )}
            <div className="heading">Watch the books come alive</div>
            {!details.videos.length ? (
              <div className="no-books" key={0}>
                No Videos to display
              </div>
            ) : (
              <div className="video-wrapper">{_renderVideos()}</div>
            )}
            <div className="social-links-wrapper">
              <div className="heading">Reach me using</div>
              <div className="contents">{_renderSocialLinks()}</div>
            </div>
            {showModal ? (
              <div className="modal-overlay">
                <div className="modal-wrapper">
                  <div>{book.title}</div>
                  <div className="row">
                    <div className="book-cover">
                      <Image source={book.bookCover} altText={book.title} />
                    </div>
                    <div className="book-details">
                      <div className="description">{book.description}</div>
                      <div className="row">
                        <div className="price">{book.price}</div>
                      </div>
                      <div className="buttons-wrapper">
                        <Button
                          buttonText="Add To Cart"
                          handleClick={() =>
                            (window.location.href =
                              'https://hill-street-books.myshopify.com/')
                          }
                        />
                        <Button
                          buttonText="Cancel"
                          handleClick={() => {
                            setShowModal(!showModal);
                            // document.body.style.overflow = showModal
                            //   ? 'auto'
                            //   : 'hidden';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <h1>Oops!</h1>
                <h2>404 - The Author does not have a content page.</h2>
              </div>
              <a href={SHOPIFY_URL}>Go To Homepage</a>
            </div>
          </div>
        )}
      </>

      {isLoading ? <Loader /> : null}
    </>
  );
};

export default memo(Author);
