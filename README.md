# Diffuse the NET

## What?
Using a custom Chrome extension to re-generate images on web-pages by only looking at their captions.
TODO: image or movie example here

## Why?
Most webpages these days have image-captions in addition to the actual image they want to display. If these captions are good enough, state-of-the-art image generation models can use these captions to generate similar images, without having to actually download the image itself, trading GPU compute for network bandwidth.

## No, but seriously, why?
It's funny. (citation needed)

It works, I guess, and you do save some bandwidth, in theory. But you are literally trading the second it takes downloading an image (maybe even less) with up to 10 seconds generating some ugly image that kind of looks the original image. (if the captions are any good) It might be pretty accurate for those kinds of articles that just use stock-photos, though.
If you are in the peculiar case that you have a ginormous GPU, but really slow internet, this is for you. Maybe you're on Moon Base 974 with your beefy gaming PC and just want to read some articles, but don't want to waste the bandwidth downloading images all day (?). 

The cost savings are so small that I didn't even bother implementing not loading the original images. It looks better when they are blurred out while Stable Diffusion is processing anyway. But in theory, it would work very well 8)

## How do I run this abomination?
1. If you haven't run Stable Diffusion locally yet, you need to set that up. In short, run ```pip install --upgrade diffusers transformers scipy```, ```huggingface-cli login```, and take it from there.
2. Clone the repo
3. Run ```python -m pip install -r requirements.txt``` (in a virtual environment, if you want)
4. Start the server by running ```flask --app api.py  run --no-reload```
5. Install the extension in Chrome, located in [/extension](/extension) (see [https://stackoverflow.com/a/24577660](https://stackoverflow.com/a/24577660), or if you're good at looking around you can go directly to [chrome://extensions/](chrome://extensions/), enable "Developer Mode", and click "Load Unpacked")
6. Go to some website, click the extension icon (which should now be in the top right, or in the extension menu in the top right), and turn it on
7. Now, if you refresh any website, the (sufficiently large) images (with captions) will blur out, and freshly generated ones from Stable Diffusion will be swapped in
8. Regret