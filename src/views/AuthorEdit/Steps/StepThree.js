import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Icon, TextField } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Image, ImageEdit } from '../../../components';
import { updateBooks } from '../../../store';
import './Steps.scss';

const StepThree = forwardRef((props, ref) => {
  const bookInitialState = {
    title: '',
    price: '',
    publishedDate: moment(),
    publisher: '',
    isbn: '',
    bookCover: '',
    description: '',
    language: '',
    ageGroup: ''
  };

  const books = useSelector((state) => state.authorContent.books);
  const dispatch = useDispatch();

  const [book, setBook] = useState(bookInitialState);
  const [showModal, setShowModal] = useState(false);

  const showForm = () => {
    setBook(bookInitialState);
    setShowModal(true);
  };

  const updateBook = (event) => {
    const { name, value } = event.target;
    console.log(name + ' ' + value);
    setBook({ ...book, [name]: value });
  };

  const addBook = () => {
    let bookList = [...books];
    let check = false;
    bookList.forEach((item, index) => {
      if (item.isbn === book.isbn) {
        bookList[index] = book;
        check = true;
      }
    });
    if (!check) bookList.push(book);
    dispatch(updateBooks(bookList));
    setShowModal(false);
  };

  const viewBook = (item) => {
    setBook(item);
    setShowModal(true);
  };

  const removeBook = (event, index) => {
    event.stopPropagation();
    let bookList = [...books];
    bookList.splice(index, 1);
    dispatch(updateBooks(bookList));
  };

  const _renderBooks = () => {
    let bookList = [];
    books.forEach((item, index) => {
      bookList.push(
        <div
          className="book-wrapper"
          onClick={() => viewBook(item)}
          key={index}
        >
          <div className="book-cover-wrapper">
            <Image source={item.bookCover} altText={item.title} />
          </div>
          <div className="book-content">
            <div className="book-row">
              <div className="title">{item.title}</div>
            </div>
            <div className="book-row">
              <div className="description">{item.description}</div>
            </div>
            <div className="book-row">
              <div className="price">{item.price}</div>
              <Icon
                sx={{ color: '#577b46', fontSize: '2rem' }}
                onClick={(event) => removeBook(event, index)}
              >
                remove_circle
              </Icon>
            </div>
          </div>
        </div>
      );
    });
    return bookList;
  };

  const updateStore = (data) => dispatch(updateBooks(data));

  useImperativeHandle(ref, () => ({ data: books, updateStore }), [books]);

  return (
    <>
      <div className="book-list-wrapper">
        {!books.length ? (
          <div className="no-books" key={0}>
            No Books to display
          </div>
        ) : (
          _renderBooks()
        )}
      </div>
      <div className="step-wrapper">
        <Button buttonText="Add Book" handleClick={showForm} />
      </div>
      {showModal ? (
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="row">
              <TextField
                id="outlined-basic"
                value={book.title}
                name="title"
                onChange={updateBook}
                label="Title of the Book *"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                value={book.price}
                name="price"
                onChange={updateBook}
                label="Price *"
                variant="outlined"
              />
            </div>
            <div className="row">
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="Published Date *"
                  value={book.publishedDate}
                  name="publishedDate"
                  maxDate={moment()}
                  onChange={updateBook}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                id="outlined-basic"
                value={book.publisher}
                name="publisher"
                onChange={updateBook}
                label="Publisher *"
                variant="outlined"
              />
            </div>
            <div className="row">
              <TextField
                id="outlined-basic"
                value={book.isbn}
                name="isbn"
                onChange={updateBook}
                label="ISBN *"
                variant="outlined"
                type="email"
              />
              <TextField
                id="outlined-basic"
                value={book.language}
                name="language"
                onChange={updateBook}
                label="Language *"
                variant="outlined"
              />
            </div>
            <ImageEdit
              handleCrop={(value) => {
                updateBook({ target: { name: 'bookCover', value } });
              }}
              label="Book Cover"
              imageSource={book.bookCover}
            />
            <TextField
              id="outlined-basic"
              value={book.description}
              name="description"
              onChange={updateBook}
              label="About the Book"
              multiline
              minRows={12}
              variant="outlined"
            />

            <TextField
              id="outlined-basic"
              value={book.ageGroup}
              name="ageGroup"
              onChange={updateBook}
              label="Age Group"
              variant="outlined"
            />
            <div className="actions-wrapper">
              <Button buttonText="Add Book" handleClick={addBook} />
              <Button
                buttonText="Cancel"
                handleClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
});

export default StepThree;
