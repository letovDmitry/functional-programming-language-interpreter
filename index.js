const lex = require('./src/lexical-analysis');
const evaluate = require('./src/evaluator');
const parse = require('./src/parser');

const input = '50 - 2'
console.log(evaluate(parse(lex(input))))