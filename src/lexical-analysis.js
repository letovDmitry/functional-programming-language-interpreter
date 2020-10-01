function divideTokens(inputString) {  // TODO: add second argument to be an 'unexpected identifier error'
  const lexicalEntities = [];
  const pushToken = (type, value) => lexicalEntities.push({ type, value });

  const detectParenthesis = (token) => /\(|\)/.test(token);
  const detectOperator = (token) => /[+\-*\/\^%=,]/.test(token);
  const detectDigit = (token) => /[0-9]/.test(token);
  const detectWhiteSpace = (token) => /\s/.test(token);
  const detectIdentifier = (token) => typeof token === 'string' && !detectOperator(token) && !detectDigit(token) && !detectWhiteSpace(token);

  inputString.replace(/\(/gm, ' ( ').replace(/\)/gm, ' )').split(/\s+/).forEach((token) => {
    if (detectParenthesis(token)) pushToken('operator', token);
    else if (detectOperator(token)) pushToken('operator', token);
    else if (detectDigit(token)) pushToken('digit', token);
    else if (detectWhiteSpace(token)) return;
    else if (token === '') return;
    else if (detectIdentifier(token)) pushToken('identifier', token);
    else throw new Error('unexpected identifier');
  });

  console.log(inputString.replace(/\(/gm, ' ( ').replace(/\)/gm, ' ) ').split(/\s+/))

  return lexicalEntities;
}

console.log(divideTokens('f(n) = 35'))
