import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote} - ${author}`)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div id="quote-box" className="quote-box">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p id="text">"{quote}"</p>
          <p id="author">- {author}</p>
          <button id="new-quote" onClick={fetchQuote}>New Quote</button>
          <a id="tweet-quote" onClick={tweetQuote} href="#!">Tweet this</a>
        </>
      )}
    </div>
  );
};

export default App;
