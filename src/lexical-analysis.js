function divideTokens(inputString) {  // TODO: add second argument to be an 'unexpected identifier error'
  const lexicalEntities = [];
  const pushToken = (type, value) => lexicalEntities.push({ type, value });

  const detectOperator = (token) => /[+\-*\/\^%=(),]/.test(token);
  const detectDigit = (token) => /[0-9]/.test(token);
  const detectWhiteSpace = (token) => /\s/.test(token);
  const detectIdentifier = (token) => typeof token === 'string' && !detectOperator(token) && !detectDigit(token) && !detectWhiteSpace(token);

  inputString.split(/\s+/).forEach((token) => {
    if (detectOperator(token)) pushToken('operator', token);
    if (detectDigit(token)) pushToken('digit', token);
    if (detectIdentifier(token)) pushToken('identifier', token);
    // else throw new Error('unexpected identifier');
  });

  return lexicalEntities;
}
