// Input: rows = reports, columns = levels in report

// Safe report: levels are all increasing or decreasing, and by 1-3 from each other.

import { readTabbedLines } from '../common/inputting.js';
const debug = true;

//const filename = 'input-example.txt';
//const filename = 'input-example-b.txt';
const filename = 'input.txt';

const reports = readTabbedLines(filename);
if (debug) console.log('reports', reports);

// FOR PART 2 STUFF CTRL+F "crux of part 2". 

function checkReport(report) {
	//if (debug) console.log('report', JSON.stringify(report));
	const report_orig = [...report];
	// First value:
	let failed_steps = 0;

	let prev_sign = null;

	while (report.length >= 2) {
		const [level1, level2] = report.slice(0,2);
		let success = checkStep(level2, level1, prev_sign);

		if (success) {
			prev_sign = Math.sign(level2 - level1);
			report.splice(0,1); // remove level1
		} else {
			failed_steps++;
			if (failed_steps >= 2) {
				// Too many failed steps!!
				if (debug) console.log('FAILED report', JSON.stringify(report_orig));
				return false;
			}
			// OK, first penalty... Now what

			// No more steps?
			if (report.length == 2)
				return true; 

			// Which level do we skip? level1? level2?
			const level3 = report.at(2);
			console.log('moo[123]', level1, level2, level3);
			if (checkStep(level3, level1, prev_sign)) {
				// level2 is the culprit. Ex: 10 7 *99* 4
				if (debug) console.log('failed but lvl3-1 worked',level3,level1, JSON.stringify(report_orig)); 
				report.splice(1,1); // remove level2
			} else if (checkStep(level3, level2, prev_sign)) {
				// level1 is the culprit. Ex: 10 *11* 7 4
				if (debug) console.log('failed but lvl3-2 worked',level3,level2, JSON.stringify(report_orig));
				report.splice(0,1); // remove level1
			} else {
				// both options for a next step failed...
				if (debug) console.log('FAILED and no matter what we remove, it\'ll fail again!', JSON.stringify(report_orig));
				return false;
			}
		}
	}
	// we made it so far!
	//if (debug) console.log('Report passed');
	return true;


}


function checkStep(item2, item1, sign) {
	const delta = item2 - item1;

	if (Number.isInteger(sign) && Math.sign(delta) != sign) {
		console.log('sign bad! 1 2 s == ', sign, item1, item2, sign)
		return false;
	}

	if (Math.abs(delta)<1 || Math.abs(delta)>3) { // or if [1,2,3].contains(diff) but it doesn't convey the meaning
		console.log('delta bad!1 2 == ', delta, item1, item2);
		return false;
	}

	return true;
};

const safe_counter = reports.filter(r => checkReport(r) == true).length;

console.log('RESULT', safe_counter);