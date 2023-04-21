'use strict';

const checkBtn = document.querySelector('#check-btn');
const rulesBtns = document.querySelectorAll('.js-rules-btn');
const input = document.querySelector('#input-num');
const attemptsList = document.querySelector('#attempts-list');
const rules = document.querySelector('#rules');
const levels = document.querySelector('.content__levels');
let lengthOfRandom = 4;

// message variables
const messageBoxContent = document.querySelector('#message-box');
let mistakeLengthMessage
  = `<span class="red">Value length is not ${lengthOfRandom}</span>`;
const mistakeRepeatMessage
  = '<span class="red">Numbers must not be repeated</span>';
const victoryMessage
  = '<span class="green">Well done! Another number now:)</span>';

let randomValue = createRandom();

// button click
checkBtn.addEventListener('click', event => {
  event.preventDefault();
  messageBoxContent.innerHTML = '';

  // length validation
  if (input.value.length !== lengthOfRandom) {
    messageBoxContent.innerHTML = mistakeLengthMessage;

    return;
  }

  // repeating chars validation
  const unrepeatingChars = new Set(input.value);

  if (unrepeatingChars.size !== lengthOfRandom) {
    messageBoxContent.innerHTML = mistakeRepeatMessage;

    return;
  }

  // check user's value
  const checkResult = checkMatch(randomValue, input.value);

  // add user's attempt to the list
  attemptsList.insertAdjacentHTML(
    'afterbegin',
    `
    <li>
      ${input.value}
      <span class="green">${checkResult.full}</span>
      <span class="yellow">${checkResult.partial}</span>
    </li>
    `
  );

  // user won
  if (checkResult.full === lengthOfRandom) {
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
  const result = {
    full: 0,
    partial: 0,
  };
  let { full, partial } = result;

  for (let i = 0; i < computedNum.length; i++) {
    // check position match
    if (computedNum[i] === userNum[i]) {
      full++;
    }

    // check presence
    if (userNum.includes(computedNum[i])) {
      partial++;
    }
  }

  partial -= full;

  window.console.log(
    `Full match: ${full}\nPartial match: ${partial}`
  );

  return {
    full,
    partial,
  };
}

// create a random number
function createRandom() {
  let randomVal = '';

  while (randomVal.length !== lengthOfRandom) {
    const randomNum = Math.floor(Math.random() * 10);

    if (!randomVal.includes(randomNum)) {
      randomVal += randomNum;
    }
  }

  return randomVal;
}

// show/hide rules
function rulesToggler() {
  rules.classList.toggle('rules--hidden');
}

rulesBtns.forEach(toggler => {
  toggler.addEventListener('click', rulesToggler);
});

// limited input
function checkKeydown(key) {
  // backspace, enter
  if (!(key.which === 8 || key.which === 13
    // 0-9
    || (key.which >= 48 && key.which <= 57)
    // arrows
    || (key.which >= 37 && key.which <= 40))) {
    key.preventDefault();
  }
}

input.addEventListener('keydown', checkKeydown);

// change level
levels.addEventListener('click', event => {
  event.preventDefault();

  const button = event.target.closest('.content__levels-button');

  if (!button || !levels.contains(button)) {
    return;
  }

  [...levels.children].forEach(level => {
    level.classList.remove('button--level-active');
  });

  button.classList.add('button--level-active');

  input.value = '';
  messageBoxContent.innerHTML = '';
  attemptsList.innerHTML = '';

  lengthOfRandom = +button.innerHTML;
  input.placeholder = '* '.repeat(lengthOfRandom).trim();

  mistakeLengthMessage
    = `<span class="red">Value length is not ${lengthOfRandom}</span>`;

  randomValue = createRandom();
});
