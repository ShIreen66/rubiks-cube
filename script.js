const cube = new Cube();

function colorToHex(color) {
  switch (color) {
    case 'r': return 'red';
    case 'g': return 'green';
    case 'b': return 'blue';
    case 'y': return 'yellow';
    case 'o': return 'orange';
    case 'w': return 'white';
    default: return 'gray';
  }
}

function getCubeSvg(stateString) {
  const colors = stateString.split('');
  let svg = `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">`;

  const facePositions = [
    { x: 100, y: 0 },   
    { x: 200, y: 100 }, 
    { x: 100, y: 100 }, 
    { x: 100, y: 200 }, 
    { x: 0, y: 100 },   
    { x: 300, y: 100 }, 
  ];

  let index = 0;
  facePositions.forEach(pos => {
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      svg += `<rect x="${pos.x + col * 30}" y="${pos.y + row * 30}" width="30" height="30" fill="${colorToHex(colors[index])}" stroke="black"/>`;
      index++;
    }
  });

  svg += `</svg>`;
  document.getElementById('svg-output').innerHTML = svg;
}

function displayStep(stepName) {
  const log = document.getElementById('steps-log');
  const state = cube.getStateString();
  log.innerHTML += `<p><strong>${stepName}</strong></p>`;
  getCubeSvg(state);
}

function scrambleCube() {
  document.getElementById('steps-log').innerHTML = '<h3>Scrambling Cube...</h3>';
  cube.scramble();
  displayStep('After Scramble');
}

function solveCube() {
  document.getElementById('steps-log').innerHTML += '<h3>Solving Cube...</h3>';
  const reverseMoves = cube.reverseMoves();
  reverseMoves.forEach((move, idx) => {
    cube.move(move);
    displayStep(`Step ${idx + 1}: Reverse Move ${move}`);
  });
  document.getElementById('steps-log').innerHTML += '<h3>Cube Solved!</h3>';
}

function resetCube() {
  document.getElementById('steps-log').innerHTML = '<h3>Resetting Cube...</h3>';
  cube.reset();
  displayStep('Initial State');
}

window.onload = () => {
  resetCube();
};
