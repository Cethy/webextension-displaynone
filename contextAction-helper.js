/**
 * Register the right-clicked element and wait for background script notification to act
 */
document.addEventListener("mousedown", function(event){
  //right click
  if(event.button === 2) {
    browser.runtime.sendMessage({action: 'rclick'})
      .then((message) => {
        switch (message.type) {
          case 'display:none':
            return displayNone(event.target);
          case 'cleanup':
            return cleanup();
        }
      });
  }
}, true);

let modifiedNodes = [];

const displayNone = (target) => {
  const displayValue = target.style.display || '';
  const cleanup = () => {target.style.display = displayValue};
  const hide    = () => {target.style.display = 'none'};

  modifiedNodes.push(cleanup);
  hide();
};

const cleanup = () => {
  modifiedNodes.forEach(cleanup => cleanup());
  modifiedNodes = [];
};
