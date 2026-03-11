// ═══════════════════════════════
//   script.js — TRES EN RAYA
// ═══════════════════════════════

const WINS = [
  [0,1,2],[3,4,5],[6,7,8], // filas
  [0,3,6],[1,4,7],[2,5,8], // columnas
  [0,4,8],[2,4,6]          // diagonales
];

let board       = Array(9).fill('');
let turn        = 'X';  // X = Jugador 1 | O = Jugador 2
let over        = false;

const cells         = document.querySelectorAll('.cell');
const winnerOverlay = document.getElementById('winner-overlay');
const winnerText    = document.getElementById('winner-text');
const label         = document.getElementById('screen-label');
const btnReiniciar  = document.getElementById('btn-reiniciar');

// ── Clic en celda ──
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const i = parseInt(cell.dataset.i);
    if (over || board[i]) return;

    board[i] = turn;
    renderFicha(cell, turn);

    const winner = getWinner();
    if (winner) {
      over = true;
      const num = winner === 'X' ? '1' : '2';
      winnerText.textContent = '';
      winnerText.classList.remove('empate');
      winnerText.innerHTML = `JUGADOR ${num}<br>GANA`;
      winnerOverlay.classList.add('visible');
      label.textContent = `Juego — ¡Jugador ${num} gana!`;
      return;
    }

    if (board.every(c => c)) {
      over = true;
      winnerText.textContent = 'EMPATE';
      winnerText.classList.add('empate');
      winnerOverlay.classList.add('visible');
      label.textContent = 'Juego — Empate';
      return;
    }

    turn = turn === 'X' ? 'O' : 'X';
    const t = turn === 'X' ? '1' : '2';
    label.textContent = `Juego — Turno Jugador ${t}`;
  });
});

function renderFicha(cell, player) {
  if (player === 'X') {
    const span = document.createElement('span');
    span.className = 'ficha-x';
    span.textContent = 'X';
    cell.appendChild(span);
  } else {
    const div = document.createElement('div');
    div.className = 'ficha-o';
    cell.appendChild(div);
  }
}

function getWinner() {
  for (const [a, b, c] of WINS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// ── Reiniciar ──
btnReiniciar.addEventListener('click', () => {
  board = Array(9).fill('');
  turn  = 'X';
  over  = false;
  cells.forEach(c => { c.innerHTML = ''; });
  winnerOverlay.classList.remove('visible');
  winnerText.classList.remove('empate');
  label.textContent = 'Juego 1';
});
