function walk(node) {
  var child, next;

  switch (node.nodeType) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;
    case 3: // Text node
      handleText(node);
      break;
  }
}

function RegexItem(regex, replacement) {
	this.regex = regex;
	this.replacement = replacement;
}

var regexItems = [
    // could be smarter about Caps, and avoid dupes...
	new RegexItem(new RegExp('t*s+h*c*', 'g'), 'th'),
	new RegexItem(new RegExp('T*S+h*c*', 'g'), 'Th'),
	new RegexItem(new RegExp('ci', 'g'), 'thi'),
	new RegexItem(new RegExp('Ci', 'g'), 'Thi'),
	new RegexItem(new RegExp('ce', 'g'), 'the'),
	new RegexItem(new RegExp('Ce', 'g'), 'The'),
	new RegexItem(new RegExp('x', 'g'), 'kth')
];

function handleText(textNode) {
  regexItems.forEach(function(regexItem) {
  	textNode.nodeValue = textNode.nodeValue.replace(regexItem.regex, regexItem.replacement);
  });
}

walk(document.body);