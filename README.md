# Classifying Pneumonia and COVID X-Rays Using Deep Learning

## Desciption
It is more important than ever to equip medical practitioners with tools to quickly and accurately diagnose respiratory illness while offering patients convenient and cost-effective medical care. As of 2022, there are only 12 deep learning products FDA-approved for Computer Aided Diagnosis, none of which address COVID-19. This package includes a CNN classification model (trained on chest x-ray images), prediction API, and web visualization that assists medical practitioners in distinguishing between COVID, pneumonia, and "no diagnosis" within seconds and with over 95% accuracy. 

## Installation
### Running the API locally
1. Ensure Python version is >= 3.8

        python 
        exit()

2. Install the following

        pip install Flask
        pip install torch torchvision
		
3. From the `CODE` directory, start the API

        python -m api.prediction

4. Sample curl request:

        curl -X POST http://127.0.0.1:5000/predict -v -d "{\"id\":500}" -H "Content-Type":"application/json"

### Running the visualization
1. Place all the files and the `images` folder in the same location.
2. Open the `index.html` file in any browser.  
   **Best results on a MacBook Air 15".**

## Execution
#### Pane Descriptions

##### Left Pane
- Click sample X-rays to load them.

##### Middle Pane
- Click **Augments** to see the augmented X-ray images.
- Click **Results** to see the model predictions.
- Click **Similar** to see X-rays the model chose as similar.

##### Right Pane
- Click any chart thumbnail to zoom in.