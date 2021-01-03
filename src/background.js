import './assets/img/icon-34.png';
import './assets/img/icon-128.png';

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({
    'url': chrome.extension.getURL('newtab.html'),
    'selected': true,
  });
});
