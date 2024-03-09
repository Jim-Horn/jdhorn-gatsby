import React, { useState, useMemo } from 'react';
import data from './data';
import {
  Password,
  Container,
  Row,
  Column,
  Label,
  Possibilities,
  Results,
  Overlay,
} from './elements';

function getRandom(limit: number) {
  return parseInt(String(Math.random() * limit), 10);
}

function getRandomArray(arr: string[], len: number) {
  let result = [];
  while (len--) {
    result.push(arr[getRandom(arr.length)]);
  }
  return result.reverse();
}

const WordPasswords = () => {
  const [selectedSep, setSelectedSep] = useState('0');
  const [wordLength, setWordLength] = useState('2');
  const [passwordsLength, setPasswordLengths] = useState('6');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const separators = useMemo(() => {
    switch (selectedSep) {
      case '0':
        return [...data.numbers, ...data.other];
      case '1':
        return data.numbers;
      case '2':
        return data.other;
      default:
        return [''];
    }
  }, [selectedSep]);

  const refreshPasswords = () => {
    setRefreshTrigger(current => current + 1);
  };

  const sepOptions = [
    { val: '0', txt: 'Numbers, punctuation, & symbols' },
    { val: '1', txt: 'Numbers only' },
    { val: '2', txt: 'Punctuation & symbols only' },
    { val: '3', txt: 'None' },
  ];

  const buildOptions = (finish = 5, start = 1) => {
    let options = [];
    for (let i = start; i < finish + 1; i++) {
      options.push({ val: i, txt: i });
    }
    return options;
  };

  const buildPassword = () => {
    let wordsArray = getRandomArray(data.words, parseInt(wordLength, 10));
    let separatorsArray = getRandomArray(
      separators,
      parseInt(wordLength, 10) - 1,
    );
    let result = [];
    let key = 0;
    while (wordsArray.length) {
      result.push(
        <span className="word" key={`word-${++key}`}>
          {wordsArray.pop()}
        </span>,
      );
      result.push(
        <span className="sep" key={`sep-${key}`}>
          {separatorsArray.pop()}
        </span>,
      );
    }
    return result;
  };

  const passwordArray = useMemo(() => {
    return Array.from({ length: Number(passwordsLength) }, (_, i) => (
      <Password
        key={i}
        onClick={ev => {
          copyToClipboard(ev.currentTarget.innerText);
        }}>
        {buildPassword()}
      </Password>
    ));
  }, [passwordsLength, separators, wordLength, refreshTrigger]);

  const doCalculations = function () {
    const wordsCalc = Math.pow(data.words.length, parseInt(wordLength, 10));
    const sepCalc = Math.pow(separators.length, parseInt(wordLength, 10) - 1);
    return (wordsCalc * sepCalc).toLocaleString();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      })
      .catch(err => {
        console.error('Failed to copy password to clipboard', err);
      });
  };

  return (
    <Container>
      <Row>
        <Column span={3} mobileSpan={6} smallerSpan={12}>
          <Label>
            Words per password
            <br />
            <select
              onChange={ev => setWordLength(ev.target.value)}
              defaultValue={wordLength}>
              {buildOptions(5, 2).map(option => (
                <option key={option.val} value={option.val}>
                  {option.txt}
                </option>
              ))}
            </select>
          </Label>
        </Column>

        <Column span={3} mobileSpan={6} smallerSpan={12}>
          <Label>
            Separators
            <br />
            <select
              name="separators"
              id="separators"
              onChange={ev => setSelectedSep(ev.target.value)}
              defaultValue={selectedSep}>
              {sepOptions.map((el, idx) => (
                <option key={idx} value={el.val}>
                  {el.txt}
                </option>
              ))}
            </select>
          </Label>
        </Column>

        <Column span={3} mobileSpan={6} smallerSpan={12}>
          <Label>
            Number of passwords
            <br />
            <select
              onChange={ev => setPasswordLengths(ev.target.value)}
              defaultValue={passwordsLength}>
              {buildOptions(25).map(option => (
                <option key={option.val} value={option.val}>
                  {option.txt}
                </option>
              ))}
            </select>
          </Label>
        </Column>

        <Column span={3} mobileSpan={6} smallerSpan={12}>
          <button
            className="btn-sm btn-outline-success"
            onClick={refreshPasswords}>
            Refresh
          </button>
        </Column>
      </Row>
      <Row>
        <Column>
          <Possibilities>
            With the selected options, there are {doCalculations()} possible
            combinations.
            <br />
            Click a password to copy it to the clipboard.
          </Possibilities>
        </Column>
        <Column>
          <Results>{passwordArray}</Results>
        </Column>
      </Row>

      {isCopied && <Overlay>Copied!</Overlay>}
    </Container>
  );
};

export { WordPasswords };
