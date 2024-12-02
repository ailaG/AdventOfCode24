// Input: rows = reports, columns = levels in report

// Safe report: levels are all increasing or decreasing, and by 1-3 from each other.

import { readTabbedLines } from '../common/inputting.js';
const debug = true;

//const filename = 'input-example.txt';
const filename = 'input.txt';

const reports = readTabbedLines(filename);
if (debug) console.log('reports', reports);

// I can do it functional. But it's so much easier not to.
// And I want to practice not overdoing things (google xkcd salt)

function checkReport(report) {
	let report_direction = Math.sign(report[1] - report[0]);

	for (let i=1; i<report.length; i++) {
		const diff_raw = report[i] - report[i-1];
		const diff = Math.abs(diff_raw),
			direction = Math.sign(diff_raw);

		if (direction != report_direction)
			return false;

		if (diff<1 || diff>3)  // or if [1,2,3].contains(diff) but it doesn't convey the meaning
		return false;
	}
	// All went well!
	return true;
};

const safe_counter = reports.filter(r => checkReport(r) == true).length;

console.log('RESULT', safe_counter);