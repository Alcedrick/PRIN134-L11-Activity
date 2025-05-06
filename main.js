const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const targetCountInput = document.getElementById('targetCountInput');
const setTargetsButton = document.getElementById('setTargetsButton');

let score = 0;
let targets = [];
let currentTargetIndex = 0; 

function createTarget(number) {
  const target = document.createElement('div');
  target.classList.add('target');
  target.style.position = 'absolute';
  target.textContent = number;
  gameArea.appendChild(target);

  target.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    if (target.style.display === 'none') return;

    
    if (parseInt(target.textContent) !== currentTargetIndex + 1) {
      return; 
    }

    target.style.display = 'none';
    currentTargetIndex++;

    const allHidden = targets.every(t => t.style.display === 'none');
    if (allHidden) {
      score++;
      scoreBoard.textContent = `Score: ${score}`;

      currentTargetIndex = 0;

      setTimeout(() => {
        targets.forEach(t => {
          t.style.display = '';
          moveTarget(t);
        });
      }, 500);
    }
  });

  return target;
}

function moveTarget(target) {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const maxX = gameAreaRect.width - target.offsetWidth;
  const maxY = gameAreaRect.height - target.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
}

function clearTargets() {
  targets.forEach(t => gameArea.removeChild(t));
  targets = [];
}

function setTargets() {
  let count = parseInt(targetCountInput.value);
  if (isNaN(count) || count < 1) count = 1;
  if (count > 5) count = 5;

  clearTargets();
  score = 0;
  scoreBoard.textContent = `Score: ${score}`;
  currentTargetIndex = 0; 

  for (let i = 1; i <= count; i++) {
    const target = createTarget(i);
    moveTarget(target);
    targets.push(target);
  }
}

setTargetsButton.addEventListener('click', setTargets);

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && (event.key === 'p' || event.key === 'P')) {
    event.preventDefault();
    setTargets();
  }
});

setTargets();
