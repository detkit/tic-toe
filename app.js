const game = document.getElementById('gameboard');
const infoDisplay = document.getElementById('info');
const startCell = ['', '', '', '', '', '', '', '', ''];

let go = 'circle';
infoDisplay.textContext = 'Circle goes first';

function createBoard() {
	startCell.forEach((_cell, index) => {
		const cellEl = document.createElement('div');
		cellEl.classList.add('square');
		cellEl.id = index;
		cellEl.addEventListener('click', addGo);
		game.append(cellEl);
	});
}

createBoard();

function addGo(e) {
	const goDisplay = document.createElement('div');
	goDisplay.classList.add(go);
	e.target.append(goDisplay);
	go = go === 'circle' ? 'cross' : 'circle';
	infoDisplay.textContent = 'it is now ' + go + "'s go.";
	e.target.removeEventListener('click', addGo);
	checkScore();
}

function checkScore() {
	const allSqures = document.querySelectorAll('.square');

	const winnerCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	winnerCombos.forEach((array) => {
		const circleWins = array.every((cell) =>
			allSqures[cell].firstChild?.classList.contains('circle')
		);

		if (circleWins) {
			infoDisplay.textContent = 'Circle Win!';
			allSqures.forEach((square) =>
				square.replaceWith(square.cloneNode(true))
			);
			return;
		}
	});

	winnerCombos.forEach((array) => {
		const crossWins = array.every((cell) =>
			allSqures[cell].firstChild?.classList.contains('cross')
		);

		if (crossWins) {
			infoDisplay.textContent = 'Cross Win!';
			allSqures.forEach((square) =>
				square.replaceWith(square.cloneNode(true))
			);
			return;
		}
	});
}
