
from flask import Flask, request
from flask_cors import CORS
import torch
from diffusers import StableDiffusionPipeline
import base64
from io import BytesIO
import threading

# Use this to get lower resolution images that don't take as long to render¨
DOWNSCALING = 1

sem = threading.Semaphore()


model_id = "CompVis/stable-diffusion-v1-4"
device = "cuda"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, revision="fp16")
pipe = pipe.to(device) 

app = Flask(__name__, static_url_path="", static_folder="static")
CORS(app, resources={r"/api/*": {"origins": ["*"]}})
@app.route("/api/generate_photo", methods=["POST"])
def generate_photo():

    prompt = request.form["prompt"]
    width = int(request.form["width"])
    height = int(request.form["height"])
    # This completely ruins aspect ratios
    # I think it's fine, the images are resized in the browser anyway
    # width = min(width, 1024) // DOWNSCALING
    # height = min(height, 1024) // DOWNSCALING
    width = 8 * round(width / 8) 
    height = 8 * round(height / 8)
    # Make sure it doesn't kill my poor GPU :(
    sem.acquire()
    image = pipe(prompt, width=width, height=height).images[0]
    sem.release()
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    return { "image": img_str.decode("ascii") }

if __name__ == "__main__":
    app.run(debug=True, threaded=False)