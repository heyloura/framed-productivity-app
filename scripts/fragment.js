;(async () => {
  // if we loaded this outside an iframe... bail.
  if(window.self === window.top) {
    window.location.replace("/");
  }
})();

// when everything is loaded
// set up an identifier so we have something to scope off of.
document.addEventListener("DOMContentLoaded", (event) => {
  let body = document.querySelector('body');
  let uuid = window.frameElement.getAttribute('id') ?? self.crypto.randomUUID();
  
  for(let attr of window.frameElement.attributes)
  {  
    for (let child of body.children) { 
      if(attr.name.includes('data-') && !attr.name.includes('data-scope')) {
        child.setAttribute(attr.name, attr.value);
      } 
      if(!child.getAttribute('data-scope')) {
        child.setAttribute('data-scope', uuid);
      }
    }
  }
});