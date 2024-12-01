import { readFileSync } from 'fs';

export function readRaw(filename) {
	const raw = readFileSync(filename, 'utf8');
	return raw;
}

export function readLines(filename) {
	// Non iterative
	return readRaw(filename).split("\n");
}

export function readTabbedLines(filename) {
	return readLines(filename).map(l => l.match(/\b(\w+)\b/g));
}