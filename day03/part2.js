import { readRaw } from '../common/inputting.js';

//const filename = 'input2-example.txt';
const filename = 'input.txt';

const memory = 'do()' + readRaw(filename) + 'don\'t()';

const mulRegex = /mul\((?<op1>[0-9]+),(?<op2>[0-9]+)\)/gm

// tbh the capture groups within capture groups drove me crazy and I'm not a big fan of unreadable regex
// this is pretty much the limit of readable regex for me
// so I'm doing something else 

const doRegex = /do\(\)(.*)don\'t/g

const dos = memory.split('do()').map(str => str.substring(0, str.indexOf('don\'t()')) || str);

const commands = dos.join('').matchAll(mulRegex).toArray();

const multiplications = commands.map(regexResult => {
	const ops = regexResult.groups;
	return (ops.op1 * ops.op2);
});

const res = multiplications.reduce((acc, res) => acc+res, 0);

console.log('RESULT', res);