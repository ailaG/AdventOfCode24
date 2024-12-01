import { readTabbedLines } from '../common/inputting.js';
const debug = true;

// Read file and organize
//const filename = 'input-example.txt';
const filename = 'input.txt';

const lists = readTabbedLines(filename)
	.reduce((acc, curr) => { 
			acc[0].push(curr[0]); acc[1].push(curr[1]); 
			return acc;
		}, 
		[[], []]
	);
lists.forEach( list => list.sort() );
if (debug) console.log('lists:',lists);
if (debug) console.log('lists LEN:',lists[0].length);

// Calculate distances
const distances = lists[0].map((_, index) => 
	Math.abs(
		lists[0][index] - lists[1][index]
	) 
);

const res = distances.reduce((acc, curr) => acc+curr, 0);

console.log('=== RESULT ===' , res);
