class Cube {
  constructor() {
    this.reset();
  }

  reset() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      F: Array(9).fill('r'),
      B: Array(9).fill('o'),
      L: Array(9).fill('g'),
      R: Array(9).fill('b'),
    };
    this.scrambleMoves = [];
  }

  getStateString() {
    return [...this.faces.U, ...this.faces.R, ...this.faces.F, ...this.faces.D, ...this.faces.L, ...this.faces.B].join('');
  }

  rotateFace(face) {
    const f = this.faces[face];
    this.faces[face] = [
      f[6], f[3], f[0],
      f[7], f[4], f[1],
      f[8], f[5], f[2],
    ];
  }

  move(move) {
    this.rotateFace(move);
  }

  scramble(moves = 10) {
    const possibleMoves = ['U', 'D', 'F', 'B', 'L', 'R'];
    this.scrambleMoves = [];
    for (let i = 0; i < moves; i++) {
      const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      this.move(move);
      this.scrambleMoves.push(move);
    }
  }

  reverseMoves() {
    return this.scrambleMoves.slice().reverse();
  }
}
