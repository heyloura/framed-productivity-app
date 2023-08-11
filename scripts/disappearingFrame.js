/* Make the iframe hidden while loading  */
(async () => {
  let div = document.createElement('div');
  let ref = document.getElementsByTagName('base')[0] || 
            document.getElementsByTagName('script')[0];

  div.innerHTML = '<style> iframe { visibility: hidden; } </style>';
  ref.parentNode.insertBefore(div, ref);
})();  

/* Copy the contents of the iframe into the DOM and execute scripts  */
function disappear(frame) {
let body = (frame.contentDocument.body||frame.contentDocument);
let children = [...body.children];

for(let child of children) {
  let scope = child.getAttribute('data-scope');

  if(child.tagName === 'SCRIPT'){
    let script = document.createElement("script");
    script.setAttribute('data-scope', scope);    
    script.text = child.innerHTML;
    document.body.appendChild( script );
  } else if(child.tagName === 'STYLE'){
    let doc = document.implementation.createHTMLDocument("");
    let styleElement = document.createElement("style");
    styleElement.textContent = child.innerHTML;
    doc.body.appendChild(styleElement); // to compute the css rules
    child.innerHTML = '';
    
    // scope out the styles
    for(var style of styleElement.sheet.cssRules) {
      let selectors = style.selectorText;
      let scoped = [];
      
      for(var selector of selectors.split(',')){
        scoped.push(`[data-scope='${scope}'] ${selector}`);
      }
      
      child.innerHTML += style.cssText.replace(selectors, scoped.join(', ')) + ' ';
    }

    frame.before(child);
  }
  else {
    frame.before(child);
  }
}

frame.remove();
}