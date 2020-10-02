/* 
  [+] TODO:
    1. Make a function that accepts tokens and returns ATS.
      Use operator precedence parsing.
      * Associate every token with left binding power and operational function
      * If the operator manipulates tokens to its left, 
        associate it with a left denotative function. 
        If the operator does not manipulate the tokens on its left, 
        associate it with a null denotative function. 
        Identifiers and numbers also have a nud function associated with them.
*/

function parse(tokens) {
  const parseTree = [];
  const symbols = {};
  let i = 0;
  
  const bindingPower = (id, nud, lbp, led) => {
    const symbol = symbols[id] || {};
    symbols[id] = {
      lbp: symbol.lbp || lbp,
      nud: symbol.nud || nud,
      led: symbol.led || led
    }
  }

  const defineToken = (token) => {
    const symbol = Object.create(symbols[token.type]);
    symbol.type = token.type;
    symbol.value = token.value;
    return symbol;
  }

  const tokenize = () => {
    return defineToken(tokens[i]);
  }

  const next = () => {
    i++;
    return tokenize();
  }

  const defineExpression = (rbp) => {
    let left;
    let Token = tokenize();

    next();

    if (!Token.nud) throw "Unexpected token: " + Token.type;
    left = Token.nud(t);
    while (rbp < token().lbp) {
      Token = tokenize();
      next();
      if (!Token.led) throw "Unexpected token: " + Token.type;
      left = Token.led(left);
    }
    return left;
  }

  const infixExpression = (id, lbp, rbp, led) => {
    rbp = rbp || lbp;
    bindingPower(id, null, lbp, led || function (left) {
      return {
        type: id,
        left: left,
        right: defineExpression(rbp)
      };
    });
  }

  const prefixExpression = (id, rbp) => {
    bindingPower(id, function () {
      return {
        type: id,
        right: defineExpression(rbp)
      };
    });
  };

  prefixExpression("-", 7);
  infixExpression("^", 6, 5);
  infixExpression("*", 4);
  infixExpression("/", 4);
  infixExpression("%", 4);
  infixExpression("+", 3);
  infixExpression("-", 3);

  bindingPower(",");
  bindingPower(")");
  bindingPower("(end)");

  bindingPower("(", () => {
    value = defineExpression(2);
    if (tokenize().type !== ")") throw "Expected closing parenthesis ')'";
    next();
    return value;
  });
  bindingPower("number", (number) => {
      return number;
  });

  bindingPower("identifier", (name) => {
    if (tokenize().type === "(") {
      const args = [];
      if (tokens[i + 1].type === ")") next();
      else {
        do {
          next();
          args.push(defineExpression(2));
        } while (tokenize().type === ",");
        if (tokenize().type !== ")") throw "Expected closing parenthesis ')'";
      }
      next();
      return {
        type: "call",
        args: args,
        name: name.value
      };
    }
    return name;
  });
  infixExpression("=", 1, 2, (left) => {
      if (left.type === "call") {
        for (var i = 0; i < left.args.length; i++) {
          if (left.args[i].type !== "identifier") throw "Invalid argument name";
        }
        return {
          type: "function",
          name: left.name,
          args: left.args,
          value: defineExpression(2)
        };
      } else if (left.type === "identifier") {
        return {
          type: "assign",
          name: left.value,
          value: defineExpression(2)
        };
      }
      else throw "Invalid lvalue";
  });
  
  while (tokenize().type !== "(end)") {
    parseTree.push(defineExpression(0));
  }
  
  return parseTree;
}

module.exports = parse;