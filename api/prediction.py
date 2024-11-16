import json
import torch
import logging
from imgaug import augmenters as imgaug
from PIL import Image, ImageEnhance
from flask import Flask, jsonify, request

from api.CNN import SimpleCNN
from model.model_utils import run_inference_on_image, get_class_names

app = Flask(__name__)

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
    image = f"api/images/({image_id}).jpg"
    image = Image.open(image).convert("L")

    original_predicted_label, original_probabilities = run_inference_on_image(model, image)

    # AUGMENTATION 1
    img1 = image.rotate(5)
    aug1_predicted_label, aug1_probabilities = run_inference_on_image(model, img1)

    # AUGMENTATION 2
    img2 = image.rotate(180)
    aug2_predicted_label, aug2_probabilities = run_inference_on_image(model, img2)

    # AUGMENTATION 3
    img3 = ImageEnhance.Brightness(image).enhance(1.2)
    aug3_predicted_label, aug3_probabilities = run_inference_on_image(model, img3)

    # AUGMENTATION 4
    img4 = ImageEnhance.Contrast(image).enhance(1.1)
    aug4_predicted_label, aug4_probabilities = run_inference_on_image(model, img4)
    # imaugs.Contrast(factor=1.1),

    # AUGMENTATION 5
    img5 = ImageEnhance.Sharpness(image).enhance(0)
    aug5_predicted_label, aug5_probabilities = run_inference_on_image(model, img5)

    # AUGMENTATION 6
    img6 = ImageEnhance.Sharpness(image).enhance(2)
    aug6_predicted_label, aug6_probabilities = run_inference_on_image(model, img6)


    # find the most common prediction among original and augmentation
    labels = [
        original_predicted_label, 
        aug1_predicted_label, 
        aug2_predicted_label, 
        aug3_predicted_label, 
        aug4_predicted_label, 
        aug5_predicted_label, 
        aug6_predicted_label
    ]
    predicted_label = max(set(labels), key=labels.count)

    return jsonify({
        "predicted_label": predicted_label, 
        "predictions": {
            "original": {
                "prediction": original_predicted_label,
                "probabilities": dict(zip(get_class_names(), original_probabilities.tolist()[0])),
            },
            "augmentation": {
                "5_degree_rotation" : {
                    "prediction": aug1_predicted_label,
                    "probabilities": dict(zip(get_class_names(), aug1_probabilities.tolist()[0])),
                },
                "horizontal_flip" : {
                    "prediction": aug2_predicted_label,
                    "probabilities": dict(zip(get_class_names(), aug2_probabilities.tolist()[0])),
                },
                "increase_brightness" : {
                    "prediction": aug3_predicted_label,
                    "probabilities": dict(zip(get_class_names(), aug3_probabilities.tolist()[0])),
                },
                "increase_contrast" : {
                    "prediction": aug4_predicted_label,
                    "probabilities": dict(zip(get_class_names(), aug4_probabilities.tolist()[0])),
                },
                "increase_blur" : {
                    "prediction": aug5_predicted_label,
                    "probabilities": dict(zip(get_class_names(), aug5_probabilities.tolist()[0])),
                },
                "increase_sharpness" : {
                    "prediction": aug6_predicted_label,
                    "probabilities": dict(zip(get_class_names(), aug6_probabilities.tolist()[0])),
                },
            }
        }
    }), 200

if __name__ == '__main__':
    app.run(debug=True)