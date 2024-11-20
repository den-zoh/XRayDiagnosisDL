from typing import List
import enum
import numpy as np
import cv2
import torch
import torch.nn.functional as F

from PIL import Image
from torchvision import transforms
from torchvision.transforms import Compose


DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


class Classes(enum.Enum):
    """enum holding our different class categories"""

    COVID19 = "COVID19"
    NORMAL = "NORMAL"
    PNEUMONIA = "PNEUMONIA"


def get_class_names() -> List[str]:
    """getting the list of class names"""

    return [member.name for member in Classes]


def model_transformations() -> Compose:
    """Transformations for our Pytorch model"""

    def apply_clahe(image):
        """
        CLAHE applies the technique locally in small regions of the image, preventing noise 
        amplification in homogenous areas.
        Beneficial in highlighting specific regios of interest without introducing excessive noise.
        """
        img = np.array(image)
        if len(img.shape) == 3:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        return clahe.apply(img)
    
    def apply_noise_reduction(img):
        """applies Non-Local Means Denoising."""
        img = np.array(img)
        denoised_img = cv2.fastNlMeansDenoising(img, h=10, templateWindowSize=7, searchWindowSize=21)
        return Image.fromarray(denoised_img)


    transform = transforms.Compose(
        [
            # transforms.Lambda(apply_clahe),
            # transforms.Lambda(apply_noise_reduction),
            transforms.Resize((400, 300)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.5], std=[0.5]),
        ]
    )
    return transform


def run_inference_on_image(model, image) -> tuple[str, np.ndarray]:
    """Running inference on a single image"""

    if isinstance(image, str):
        img = Image.open(image).convert("L")
    else:
        img = image

    transformations = model_transformations()

    # Applying transformations on the image
    img_tensor = transformations(img).unsqueeze(0)
    img_tensor = img_tensor.to(DEVICE)

    # Running inference
    with torch.no_grad():
        output = model(img_tensor)

    probabilities = F.softmax(output, dim=1)

    # Get the predicted class index and its probability
    predicted_class_idx = torch.argmax(probabilities, dim=1).item()
    predicted_class_prob = probabilities[0, predicted_class_idx].item()

    # Get the class label
    class_names = get_class_names()

    predicted_label = class_names[predicted_class_idx]

    print(
        f"Predicted Class: {predicted_label}, Probability: {predicted_class_prob:.4f}"
    )

    return predicted_label, probabilities.cpu().numpy()
