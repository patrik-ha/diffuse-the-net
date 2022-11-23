chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ "isOn": false }, function(){});
});