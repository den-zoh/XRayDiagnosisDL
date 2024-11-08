import json
import torch
import logging
from flask import Flask, jsonify, request

from api.CNN import SimpleCNN
from model.model_utils import run_inference_on_image, get_class_names

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

model = SimpleCNN()
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

def load_model(model_path):
    global model
    model = torch.load(model_path, map_location=torch.device('cpu'))

@app.route("/predict", methods=['POST'])
def predict():
    load_model("api/cnn.pth")

    # 1 = COVID, 2 = PNEUMONIA, 3 = NORMAL
    image_id = request.get_json().get("id")
    image = f"api/images/{image_id}.jpg"

    predicted_label, probabilities = run_inference_on_image(model, image)

    return jsonify({
        "predicted_label": predicted_label, 
        "predictions": {
            "original": {
                "prediction": predicted_label,
                "probabilities": dict(zip(get_class_names(), probabilities.tolist()[0])),
            },
            "augmentation": {
                "TODO-aug-1" : {},
                "TODO-aug-2" : {},
                "TODO-aug-3" : {},
                "TODO-aug-4" : {},
                "TODO-aug-5" : {},
                "TODO-aug-6" : {},
            }
        }
    }), 200

if __name__ == '__main__':
    app.run(debug=True)