function updateButton(state) {
    var button = document.getElementById("power-button");
    if(state) {
        button.classList.add("on");
        button.innerHTML = "On";
    } else {
        button.classList.remove("on");
        button.innerHTML = "Off"
    }
}
// Feel like I'm back in 2013!!
window.onload = () => {
    if(document.getElementById("power-button") != null) {
        document.getElementById("power-button").onclick = () => {
            chrome.storage.sync.get(["isOn"], function(items) {
                var state = items["isOn"];
                chrome.storage.sync.set({ "isOn": !state }, function(){
                    updateButton(!state);
                });
            });
        }
        chrome.storage.sync.get(["isOn"], function(items) {
            var state = items["isOn"];
            updateButton(state);
        });
    }
}
    


