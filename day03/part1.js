import { readRaw } from '../common/inputting.js';

//const filename = 'input1-example.txt';
const filename = 'input.txt';

const memory = readRaw(filename);

const regex = /mul\((?<op1>[0-9]+),(?<op2>[0-9]+)\)/g

const commands = memory.matchAll(regex);

const multiplications = Array.from(commands).map(regexResult => {
	const ops = regexResult.groups;
	return (ops.op1 * ops.op2);
});

const res = multiplications.reduce((acc, res) => acc+res, 0);

console.log('RESULT', res);