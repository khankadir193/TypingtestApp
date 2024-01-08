import React, { useState } from 'react';

const TypingContentMove = () => {
  const [inputText, setInputText] = useState('');

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyUp = (event) => {
    // Move cursor to the end of the input field after each keyup event
    event.target.selectionStart = event.target.selectionEnd = inputText.length;
  };

  return (
    <div>
      <h1>Dynamic Text Input</h1>
      <p>Type something here:</p>
      <p style={{whiteSpace:'nowrap',textOverflow:'clip'}}>
      As customers of all races, nationalities, and cultures visit the Dekalb Farmers Market by the thousands, 
      I doubt that many stand in awe and contemplate the meaning of its existence. But in the capital of the 
      Sunbelt South, the quiet revolution of immigration and food continues to upset and redefine the meanings
       of local, regional, and global identity.
      </p>
      {/* Input field with dynamic text */}
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default TypingContentMove;
