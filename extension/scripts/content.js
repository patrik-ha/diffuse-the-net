function fixImage(image, alternate) {
    image.style.filter = "none";
    image.src = alternate;
    image.srcset = alternate;
    image.style.objectFit = "scale-down";
    // Some websites have their images in some sort of picture-frame, need to fix those
    if(image.parentElement.tagName == "PICTURE") {
        var siblings = image.parentElement.children;
        for(var j = 0; j < siblings.length; j++) {
            siblings[j].src = alternate;
            siblings[j].srcset = alternate;
        }
    }
}

async function requestAlternate(image, suffix) {
    let formData = new FormData();
    formData.append("prompt", image.alt + " " + suffix);
    formData.append("width", image.width);
    formData.append("height", image.height);
    return await fetch("http://127.0.0.1:5000/api/generate_photo", {
        method : "POST",
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        b64image = "data:image/png;base64," + data["image"]
        return b64image;
    });
}


(async() => {
    // Ugly, ugly callback code (but not as ugly as the images that are generated)
    chrome.storage.sync.get(["isOn", "promptSuffix"], async function (items) {
        if (!items["isOn"]) {
            return;
        }
        var promptSuffix = "";

        if (items["promptSuffix"]) {
            promptSuffix = items["promptSuffix"];
        };

        var images = document.getElementsByTagName("img"); 
        // Loop through to blur everything
        for(var i = 0; i < images.length; i++) {
            if(images[i].alt && images[i].width > 60 && images[i].height > 60) {
                images[i].style.filter = "blur(10px)";
            }
        }
        // Loop through to send requests
        for(var i = 0; i < images.length; i++) {
            if(images[i].alt && images[i].width > 60 && images[i].height > 60) {
                var res = await requestAlternate(images[i], promptSuffix);
                if(res != null) {
                    fixImage(images[i], res);
                }
            }
        }
    });
})();

