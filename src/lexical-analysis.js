function divideTokens(inputString) {  // TODO: add second argument to be an 'unexpected identifier error'
  const lexicalEntities = [];
  const pushToken = (value) => lexicalEntities.push(value);

  const detectParenthesis = (token) => /\(|\)/.test(token);
  const detectOperator = (token) => /[+\-*\/\^%=,]/.test(token);
  const detectDigit = (token) => /[0-9]/.test(token);
  const detectWhiteSpace = (token) => /\s/.test(token);
  const detectIdentifier = (token) => typeof token === 'string' && !detectOperator(token) && !detectDigit(token) && !detectWhiteSpace(token);

  inputString.replace(/\(/gm, ' ( ').replace(/\)/gm, ' )').split(/\s+/).forEach((token) => {
    if (detectParenthesis(token)) pushToken({type: 'operator', value: token});
    else if (detectOperator(token)) pushToken({type: 'operator', value: token});
    else if (detectDigit(token)) pushToken({type: 'digit', value: token});
    else if (detectWhiteSpace(token)) return;
    else if (token === '') return;
    else if (detectIdentifier(token)) pushToken({type: 'identifier', value: token});
    else throw new Error('unexpected identifier');
  });

  pushToken('(end)')

  return lexicalEntities;
}

module.exports = divideTokens;
