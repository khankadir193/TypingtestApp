import React, { useEffect, useState } from "react";
import "./styles.css";
import content from './content.json'
import keyPressSound from '../Audio/keyboard-click.mp3'

const TypingComp = () => {
    //this hooks while  click on start button for starting the typing test...
    const [completed, setCompleted] = useState([]);
    const [started, setStarted] = useState([]);

    //other typing test logics..
    const [text, setText] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [lastLetter, setLastLetter] = useState('');
    const [words, setWords] = useState([]);
    const [completedWords, setCompletedWords] = useState([]);
    const [startTime, setStartTime] = useState();
    const [progress, setProgress] = useState();
    const [wpm, setwWPM] = useState();
    const [timeElapsed, setTimeElapsed] = useState(0);




    useEffect(() => {
        const txt = content[Math.floor(Math.random() * content.length)];
        const words = txt.content.split(" ");
        const startTime = Date.now();

        setStartTime(startTime);
        setText(txt.content);
        setWords(words);
        setCompletedWords([]);
    }, [0]);



    const handleChange = e => {
        const inputValue = e.target.value;
        const lastLetter = inputValue[inputValue.length - 1];

        const currentWord = words[0];
        console.log(currentWord, "currentWord");

        // if space or '.', check the word
        if (lastLetter === " " || lastLetter === ".") {
            // check to see if it matches to the currentWord
            // trim because it has the space
            if (inputValue.trim() === currentWord) {
                // remove the word from the wordsArray
                // cleanUp the input
                const newWords = [...words.slice(1)];
                console.log(newWords, "newWords");
                console.log(newWords.length, "newWords.length");
                const newCompletedWords = [...completedWords, currentWord];
                console.log(newCompletedWords, "newCompletedWords");
                console.log("----------------");

                // Get the total progress by checking how much words are left
                const progress = (newCompletedWords.length / (newWords.length + newCompletedWords.length)) * 100;

                setProgress(progress);
                setWords(newWords);
                setCompletedWords(newCompletedWords);
                setInputValue('');
            } else if (inputValue.trim().length > 0) {
                const newWords = [...words.slice(1)];
                const newCompletedWords = [...completedWords, currentWord];
                const progress = (newCompletedWords.length / (newWords.length + newCompletedWords.length)) * 100;

                setProgress(progress);
                setWords(newWords);
                setCompletedWords(newCompletedWords);
                setInputValue('');
            }
        } else {
            setInputValue(inputValue);
            setLastLetter(lastLetter);
            console.log(inputValue, "this.state.inputValue");
            console.log(lastLetter, "this.state.lastLetter");
            console.log("================================");
        }
        calculateWPM();
    };

    const calculateWPM = () => {
        const now = Date.now();
        const diff = (now - startTime) / 1000 / 60; // 1000 ms / 60 s
        console.log(now, "now");
        console.log(startTime, "startTime");
        console.log(diff, "diff");
        console.log("**************");

        // every word is considered to have 5 letters
        // so here we are getting all the letters in the words and divide them by 5
        // "my" shouldn't be counted as same as "deinstitutionalization"
        console.log('completedWords...???', typeof completedWords);
        const wordsTyped = Math.ceil(completedWords.reduce((acc, word) => (acc += word.length), 0) / 5);
        console.log(completedWords, "completedWords");
        console.log(wordsTyped, "wordsTyped");
        console.log("+=+=+=+=+=+=");

        // calculating the wpm
        const wpm = Math.ceil(wordsTyped / diff);
        setwWPM(wpm);
        setTimeElapsed(diff);
    };

    const handleKeyDown = (event) => {

        console.log('event.key...??', event.key);
        // Check if a key is pressed
        if (event.key !== 'Meta' && event.key !== 'Control' && event.key !== 'Alt' && event.key !== 'ContextMenu' && event.key !== 'Shift') {
            const audio = new Audio(keyPressSound);
            // audio.play();
        }
    };


    return (
        <div>
            <div className="wpm">
                <strong>WPM: </strong>{wpm}<br /> <strong>Time: </strong>{Math.floor(timeElapsed * 60)}s
            </div>

            <div className="container">
                <h4>Start the typing test</h4>
                <progress value={progress} max="100" />

                <p className="text">
                    {text?.split(" ")?.map((word, w_idx) => {
                        let highlight = false;
                        let currentWord = false;

                        // this means that the word is completed, so turn it green
                        if (completedWords.length > w_idx) {
                            highlight = true;
                        }

                        if (completedWords.length === w_idx) {
                            currentWord = true;
                        }

                        return (
                            <span  className={`word ${highlight && "green"} ${currentWord && "underline"}`} key={w_idx}>
                                {word.split("").map((letter, l_idx) => {
                                    const isCurrentWord = w_idx === completedWords.length;
                                    const isWronglyTyped = letter !== inputValue[l_idx];
                                    const shouldBeHighlighted = l_idx < inputValue.length;

                                    return (
                                        <span className={`letter ${isCurrentWord && shouldBeHighlighted ? isWronglyTyped ? "red" : "green": ""}`} 
                                            key={l_idx}>
                                            {letter}
                                        </span>
                                    );
                                })}
                            </span>
                        );
                    })}
                </p>
                <input
                    type="text"
                    onChange={handleChange}
                    value={inputValue}
                    // autoFocus={started ? 'true' : 'false'}
                    autoFocus={true}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

export default TypingComp;
