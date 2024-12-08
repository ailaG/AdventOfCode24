import { readLines } from '../common/inputting.js';
// Note to reader: If this was prod code maybe I'd have thrown errors instead of returning false and filtering. It's not, however.


//const filename = 'input-example0.txt';
//const filename = 'input-example.txt';
const filename = 'input.txt';

const puzzle = readLines(filename).map(l=>l.split(''));


///////

function check(puzzle, row, col, direction, returnVal='coord') { // Direction as in north, northwest...
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
	if (returnVal == 'content')
		return puzzle[row][col];
	return {row, col};
}

////////

const mainLetterLocations = puzzle.flatMap((row, rowInd) => {
	return row.map((value, colInd) => {
		if (value == 'A') {
			return { row: rowInd, col: colInd };
		}
		else
			return false;
	}).filter(p => p !== false);
});


const x_mases = mainLetterLocations.flatMap(loc => {
	const { row, col } = loc;
	const diag1 = [
		check(puzzle, row, col, 'NW', 'content'),
		check(puzzle, row, col, 'SE', 'content')
	];
	const diag2 = [
		check(puzzle, row, col, 'NE', 'content'),
		check(puzzle, row, col, 'SW', 'content')
	];
	if (diag1.includes(false) || diag2.includes(false))
		return false;

	// let is_x_mas = true;
	// ['M', 'S'].forEach(l => {
	// 	console.log('checking l',l, diag1.includes(l), diag2.includes(l));
	// 	if (!diag1.includes(l))
	// 		is_x_mas = false;
	// 	if (!diag2.includes(l))
	// 		is_x_mas = false;
	// })

	diag1.sort();
	diag2.sort();
	if (diag1.join('') !== 'MS' || diag2.join('') !== 'MS')
		return false;
	return loc;


});

const res_arr = x_mases.filter(p => p !== false)
console.log('RESULT', res_arr.length);