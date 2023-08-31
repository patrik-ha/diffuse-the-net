function updateButton(state) {
    var button = document.getElementById("power-button");
    if(state) {
        button.classList.add("on");
        button.innerHTML = "On";
    } else {
        button.classList.remove("on");
        button.innerHTML = "Off";
    }
}

function updateSuffix(suffix) {
    document.getElementById("prompt-suffix").value = suffix;
}

// Feel like I'm back in 2013!!
window.onload = () => {
    if (document.getElementById("prompt-suffix") != null) {
        document.getElementById("prompt-suffix").oninput = () => {
            var inputValue = document.getElementById("prompt-suffix").value;
            chrome.storage.sync.set({ "promptSuffix": inputValue }, function () { });
        }
        chrome.storage.sync.get(["promptSuffix"], function (items) {
            if (items["promptSuffix"]) {
                updateSuffix(items["promptSuffix"]);
            }
        });
    }

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
    


