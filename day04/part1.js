import { readLines } from '../common/inputting.js';

//const filename = 'input-example0.txt';
//const filename = 'input-example.txt';
const filename = 'input.txt';

const puzzle = readLines(filename).map(l=>l.split(''));


///////

function check(puzzle, row, col, direction) { // Direction as in north, northwest...     
	const orig = { row, col };
	if (direction.indexOf('N') >= 0) {
		if	(row == 0)
			return false;
		row -= 1;
	}
	if (direction.indexOf('S') >= 0) {
		if (row == puzzle.length - 1)
			return false;
		row += 1;
	}
	if (direction.indexOf('E') >= 0) {
		if (col == puzzle.at(0).length - 1)
			return false;
		col++;
	}
	if (direction.indexOf('W') >= 0) {
		if (col == 0)
			return false;
		col--;
	}
	return {row, col};
}

function checkAll(puzzle, row, col) {
	return ['N','NE','E','SE','S','SW','W','NW'].flatMap(direction => { 
			const next = check(puzzle, row, col, direction);
			if (!next) return false;
			return { direction, ...next } 
		})
		.filter(p => p !== false)
}

////////

const firstLetterLocations = puzzle.flatMap((row, rowInd) => {
	return row.map((value, colInd) => {
		if (value == 'X') {
			return { row: rowInd, col: colInd };
		}
		else
			return false;
	}).filter(p => p !== false);
});


const xmases = firstLetterLocations.flatMap(loc => {
	const neighbors = checkAll(puzzle, loc.row, loc.col);
	const words = neighbors.map(p1 => {
		const direction = p1.direction;
		let currWord = 'X' + puzzle[p1.row][p1.col];
		let currCoord = { row: p1.row, col: p1.col };

		for (let i=2; i<=3; i++) { // A, S
			const newCoord = check(puzzle, currCoord.row, currCoord.col, direction);
			if (newCoord === false)
				return false;
			currWord = currWord + puzzle[newCoord.row][newCoord.col];
			currCoord = newCoord;
		}
		return currWord;
	})
		.filter(w => w !== false);

	// Now we have tons of 4-letter words of all types...
	const hits = words.filter(word => word == 'XMAS');
	return hits.length;
});

const res = xmases.reduce((a,c) => a+c, 0);
console.log('RESULT', res);