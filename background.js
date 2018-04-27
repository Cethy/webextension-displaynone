// Create context menu
browser.contextMenus.create({
  id: "display-none-item",
  title: "Display:none selected item",
});
browser.contextMenus.create({
  id: "cleanup",
  title: "Cleanup displayed:none items"
});

let responseCallback = null;
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  responseCallback = sendResponse;
  return true;
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'display-none-item':
      return responseCallback({type: 'display:none'});
    case 'cleanup':
      return responseCallback({type: 'cleanup'});
  }
});
