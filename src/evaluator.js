const operators = {
  "+": (a, b) => {
      return a + b;
  },
  "-": (a, b) => {
      if (typeof b === 'undefined') return -a;
      return a - b;
  },
  "*": (a, b) => {
      return a * b;
  },
  "/": (a, b) => {
      return a / b;
  },
  "%": (a, b) => {
      return a % b;
  },
  "^": (a, b) => {
      return Math.pow(a, b);
  },
};

const functions = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.cos,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  abs: Math.abs,
  round: Math.round,
  ceil: Math.ceil,
  floor: Math.floor,
  log: Math.log,
  exp: Math.exp,
  sqrt: Math.sqrt,
  max: Math.max,
  min: Math.min,
  random: Math.random,
};

const variables = {};

function evaluate(parseTree) {
  const output = '';
  const parseNode = (node) => {
    if (node.type === 'digit') return node.value;
    else if (operators[node.type]) {
      if (node.left) return operators[node.type](parseNode(node.left), parseNode(node.right));
      return operators[node.type](parseNode(node.right));
    }
    else if (node.type === 'identifier') {
      var value = args.hasOwnProperty(node.value) ? args[node.value] : variables[node.value];
      if (typeof value === 'undefined') throw node.value + ' is undefined';
      return value;
    }
    else if (node.type === "assign") {
      variables[node.name] = parseNode(node.value);
    }
    else if (node.type === "call") {
      for (let i = 0; i < node.args.length; i++) node.args[i] = parseNode(node.args[i]);
      return functions[node.name].apply(null, node.args);
    }
    else if (node.type === "function") {
      functions[node.name] = () => {
        for (let i = 0; i < node.args.length; i++) {
          args[node.args[i].value] = arguments[i];
        }
      }
    }
    const ret = parseNode(node.value);
    args = {};
    return ret;
    
  }

  const arguments = {};

  for (let i = 0; i < parseTree.length; i++) {
    const value = parseNode(parseTree[i]);
    if (typeof value !== 'undefined') output += value + "\n";
  }
  return output;
}

module.exports = evaluate;
