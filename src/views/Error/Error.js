import React from 'react';
import './Error.scss';

function ErrorScreen() {
  const SHOPIFY_URL =
    process.env.SHOPIFY_URL || 'https://hill-street-books.myshopify.com/';
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - The Page can't be found</h2>
        </div>
        <a href={SHOPIFY_URL}>Go To Homepage</a>
      </div>
    </div>
  );
}

export default ErrorScreen;
