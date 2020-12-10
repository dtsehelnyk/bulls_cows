'use strict';

const checkBtn = document.querySelector('#check-btn');
const rulesBtn = document.querySelector('#rules-btn');
const hideBtn = document.querySelector('#hide-btn');
const input = document.querySelector('#input-num');
const attemptsList = document.querySelector('#attempts-list');
const rules = document.querySelector('#rules');

// message variables
const messageBoxContent = document.querySelector('#message-box');
const mistakeLengthMessage
  = '<span class="red">Длина значения не равна "4"</span>';
const mistakeRepeatMessage
  = '<span class="red">Числа не должны повторяться</span>';
const victoryMessage
  = '<span class="green">Молодец! Теперь другое число)</span>';

let randomValue = createRandom();

// button click
checkBtn.addEventListener('click', e => {
  e.preventDefault();
  messageBoxContent.innerHTML = '';

  // length validation
  if (input.value.length !== 4) {
    messageBoxContent.innerHTML = mistakeLengthMessage;

    return;
  }

  // repeating chars validation
  const unrepeatingChars = Array.from(new Set(Array.from(input.value)));

  if (unrepeatingChars.length !== 4) {
    messageBoxContent.innerHTML = mistakeRepeatMessage;

    return;
  }

  // check user's value
  const checkResult = checkMatch(randomValue, input.value);

  // add user's attempt to the list
  attemptsList.insertAdjacentHTML('afterbegin', `<li>${input.value} 
    <span class="green">${checkResult.full}</span> 
    <span class="yellow">${checkResult.partial}</span></li>`);

  // user won
  if (checkResult.full === 4) {
    messageBoxContent.innerHTML = victoryMessage;
    attemptsList.innerHTML = '';
    randomValue = createRandom();
  }

  // clean the input
  input.value = '';

  window.console.log(randomValue);
});

// check user's value function
function checkMatch(computedNum, userNum) {
  let fullMatch = 0;
  let partialMatch = 0;
  const result = {};

  // check position match
  for (let i = 0; i < computedNum.length; i++) {
    if (computedNum[i] === userNum[i]) {
      fullMatch++;
    }
  }

  // check presence
  for (let i = 0; i < computedNum.length; i++) {
    if (userNum.includes(computedNum[i])) {
      partialMatch++;
    }
  }

  result.full = fullMatch;
  result.partial = partialMatch - fullMatch;
  window.console.table(result);

  return result;
}

// create a random number
function createRandom() {
  let randomVal = '';

  while (randomVal.length !== 4) {
    const randomNum = Math.floor(Math.random() * 10);

    if (!randomVal.includes(randomNum)) {
      randomVal += ('' + randomNum);
    }
  }

  return randomVal;
}

// show/hide rules
rulesBtn.addEventListener('click', () => {
  rules.classList.toggle('rules--hidden');
});

// hide rules
hideBtn.addEventListener('click', () => {
  rules.classList.add('rules--hidden');
});
