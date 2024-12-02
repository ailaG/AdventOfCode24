// Input: rows = reports, columns = levels in report

// Safe report: levels are all increasing or decreasing, and by 1-3 from each other.

import { readTabbedLines } from '../common/inputting.js';
const debug = false;

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



// SOOOOO Part 2 starts here
// In my "bad attempts" folder you'll find attempts to read the reports line by line
// Nothing worked. Couldn't figure out what or why. It failed 100-odd tests that I couldn't find.
// I tried recursion and the spaghetti got messier.
// OVERCOMPLICATION. Will this suffer from O(m*n)? NO. O(m*n) it is.

function checkReportWithDampener(report) {
	// check original claim
	if (checkReport(report) === true) {
		return true;
	}

	// check with one step removed
	for (let i=0; i<report.length; i++) {
		const report_copy = [...report];
		report_copy.splice(i,1);
		if (checkReport(report_copy) === true) {
			return true;
		}
	}
	return false;
}


const safe_counter = reports.filter(r => checkReportWithDampener(r) == true).length;

console.log('RESULT', safe_counter);