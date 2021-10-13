const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnSubmit = document.querySelector('.btn--submit');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const currentOne = document.querySelector('#current--0');
const currentTwo = document.querySelector('#current--1');
const scoreOne = document.querySelector('#score--0');
const scoreTwo = document.querySelector('#score--1');
const nameOne = document.querySelector('#name--0');
const nameTwo = document.querySelector('#name--1');
const inputNewScore = document.querySelector('.input--endscore');

const state = {
  currentPlayer: 0,
  currentScore: 0,
  totalScores: [0, 0],
  isPlaying: true,
  endScore: 60,
};

function init() {
  dice.style.display = 'none';
  state.currentPlayer = 0;
  state.totalScores = [0, 0];
  state.currentScore = 0;
  state.isPlaying = true;
  removeWinnerClass();
  currentOne.textContent = 0;
  currentTwo.textContent = 0;
  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
}

// Reusable functions

//------------------------------------------------------

function toggleActive() {
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
}

function switchPlayer() {
  state.currentPlayer === 0
    ? (state.currentPlayer = 1)
    : (state.currentPlayer = 0);
}

function setContent(content, firstEl = currentOne, secEl = currentTwo) {
  state.currentPlayer === 0
    ? (firstEl.textContent = content)
    : (secEl.textContent = content);
}

function addWinnerClass() {
  if (state.currentPlayer === 0) {
    playerOne.classList.add('player--winner');
    nameOne.textContent = 'WINNER';
  }
  if (state.currentPlayer === 1) {
    playerTwo.classList.add('player--winner');
    nameTwo.textContent = 'WINNER';
  }
}

function removeWinnerClass() {
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  nameOne.textContent = 'Player 1';
  nameTwo.textContent = 'Player 2';
}

function clearInput() {
  inputNewScore.value = '';
}

//------------------------------------------------------

btnRoll.addEventListener('click', function () {
  if (state.isPlaying) {
    const diceRoll = Math.trunc(Math.random() * 6 + 1);
    dice.style.display = 'block';
    dice.setAttribute('src', `/dice-${diceRoll}.png`);
    state.currentScore += diceRoll;

    // Set content current
    setContent(state.currentScore);

    if (diceRoll === 1) {
      // Set current score back to 0
      state.currentScore = 0;

      // Set content current
      setContent(0);

      // Switch player
      switchPlayer();

      // Toggle active class
      toggleActive();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (state.isPlaying && state.currentScore >= 1) {
    state.totalScores[state.currentPlayer] += state.currentScore;

    dice.style.display = 'none';

    // Set content total score
    setContent(state.totalScores[state.currentPlayer], scoreOne, scoreTwo);

    // Set content current
    setContent(0);

    // Check if score is >= 60
    if (state.totalScores[state.currentPlayer] >= state.endScore) {
      // Add winner class
      addWinnerClass();
      state.isPlaying = false;
      return;
    }

    // Switch player
    switchPlayer();

    // Set current score back to 0
    state.currentScore = 0;

    // Toggle active class
    toggleActive();
  }
});

btnNew.addEventListener('click', init);

btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  const val = inputNewScore.value;
  if (!val) return;

  // To prevent that players can change endscore during game
  if (
    state.currentScore === 0 &&
    state.totalScores.reduce((acc, cur) => acc + cur) === 0
  )
    state.endScore = +val;
  console.log('Hey');

  clearInput();
});

init();
