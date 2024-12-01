import { readTabbedLines } from '../common/inputting.js';
const debug = false;

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
if (debug) console.log('lists', lists);

// At least 2 options here: make an array and add to it step by step, or create and then filter and count.
// While the latter is nice for not changing values, the former is simpler and more readable and debuggable.

// Create an object in the form of: { lists[0][0]: 0, lists[0][1]: 0, lists[0][2]: 0.... } and so on
// The keys are the values we are counting, the values are the counts
let counts = Object.fromEntries(
	lists[0].map(item => [item, 0])
);

lists[1].forEach(item => {
	if (counts.hasOwnProperty(item))
		counts[item]++;
});

if (debug) console.log('counts: ', counts)

const res =	lists[0]
	.map( value => value * counts[value] )
	.reduce((acc, curr) => acc+curr, 0);

console.log('=== RESULT ===' , res);