import React, { useState } from 'react';

function App() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);

  const apis = [
    {
      name: 'Cat Fact',
      url: 'https://catfact.ninja/fact',
      extract: data => data.fact,
    },
    {
      name: 'Dog Fact',
      url: 'https://dog-api.kinduff.com/api/facts',
      extract: data => data.facts[0],
    },
    {
      name: 'Useless Fact',
      url: 'https://uselessfacts.jsph.pl/random.json?language=en',
      extract: data => data.text,
    },
    {
      name: 'Chuck Norris Joke',
      url: 'https://api.chucknorris.io/jokes/random',
      extract: data => data.value,
    },
    {
      name: 'Number Trivia',
      url: 'http://numbersapi.com/random/trivia?json',
      extract: data => data.text,
    },
  ];

  const fetchRandomFact = async () => {
    setLoading(true);
    setFact('');
    try {
      const randomApi = apis[Math.floor(Math.random() * apis.length)];
      const response = await fetch(randomApi.url);
      const data = await response.json();
      const extractedFact = randomApi.extract(data);
      setFact(extractedFact);
    } catch (error) {
      setFact('Failed to fetch a fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>Random Fun Fact Generator</h1>
      <button
        onClick={fetchRandomFact}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Get Random Fact
      </button>
      <p style={{ marginTop: '20px', fontSize: '18px', maxWidth: '600px', margin: '20px auto' }}>
        {loading ? 'Loading...' : fact}
      </p>
    </div>
  );
}

export default App;
