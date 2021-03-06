const btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold'),
  btnNew = document.querySelector('.btn--new'),
  btnSubmit = document.querySelector('.btn--submit'),
  playerOne = document.querySelector('.player--0'),
  playerTwo = document.querySelector('.player--1'),
  dice = document.querySelector('.dice'),
  currentOne = document.querySelector('#current--0'),
  currentTwo = document.querySelector('#current--1'),
  scoreOne = document.querySelector('#score--0'),
  scoreTwo = document.querySelector('#score--1'),
  nameOne = document.querySelector('#name--0'),
  nameTwo = document.querySelector('#name--1'),
  inputNewScore = document.querySelector('.input--endscore'),
  state = {
    currentPlayer: 0,
    currentScore: 0,
    totalScores: [0, 0],
    isPlaying: !0,
    endScore: 60,
  };
function init() {
  (dice.style.display = 'none'),
    (state.currentPlayer = 0),
    (state.totalScores = [0, 0]),
    (state.currentScore = 0),
    (state.isPlaying = !0),
    removeWinnerClass(),
    (currentOne.textContent = 0),
    (currentTwo.textContent = 0),
    (scoreOne.textContent = 0),
    (scoreTwo.textContent = 0);
}
function toggleActive() {
  playerOne.classList.toggle('player--active'),
    playerTwo.classList.toggle('player--active');
}
function switchPlayer() {
  0 === state.currentPlayer
    ? (state.currentPlayer = 1)
    : (state.currentPlayer = 0);
}
function setContent(e, t = currentOne, n = currentTwo) {
  0 === state.currentPlayer ? (t.textContent = e) : (n.textContent = e);
}
function addWinnerClass() {
  0 === state.currentPlayer &&
    (playerOne.classList.add('player--winner'),
    (nameOne.textContent = 'WINNER')),
    1 === state.currentPlayer &&
      (playerTwo.classList.add('player--winner'),
      (nameTwo.textContent = 'WINNER'));
}
function removeWinnerClass() {
  playerOne.classList.remove('player--winner'),
    playerTwo.classList.remove('player--winner'),
    (nameOne.textContent = 'Player 1'),
    (nameTwo.textContent = 'Player 2');
}
function clearInput() {
  inputNewScore.value = '';
}
btnRoll.addEventListener('click', function () {
  if (state.isPlaying) {
    const e = Math.trunc(6 * Math.random() + 1);
    (dice.style.display = 'block'),
      dice.setAttribute('src', `./dice-${e}.png`),
      (state.currentScore += e),
      setContent(state.currentScore),
      1 === e &&
        ((state.currentScore = 0),
        setContent(0),
        switchPlayer(),
        toggleActive());
  }
}),
  btnHold.addEventListener('click', function () {
    if (state.isPlaying && state.currentScore >= 1) {
      if (
        ((state.totalScores[state.currentPlayer] += state.currentScore),
        (dice.style.display = 'none'),
        setContent(state.totalScores[state.currentPlayer], scoreOne, scoreTwo),
        setContent(0),
        state.totalScores[state.currentPlayer] >= state.endScore)
      )
        return addWinnerClass(), void (state.isPlaying = !1);
      switchPlayer(), (state.currentScore = 0), toggleActive();
    }
  }),
  btnNew.addEventListener('click', init),
  btnSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    const t = inputNewScore.value;
    t &&
      (0 === state.currentScore &&
        0 === state.totalScores.reduce((e, t) => e + t) &&
        (state.endScore = +t),
      clearInput());
  }),
  init();
//# sourceMappingURL=index.b24a5160.js.map
