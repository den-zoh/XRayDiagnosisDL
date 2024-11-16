# Classifying Pneumonia and COVID X-Rays Using Deep Learning

## Desciption
It is more important than ever to equip medical practitioners with tools to quickly and accurately diagnose respiratory illness while offering patients convenient and cost-effective medical care. As of 2022, there are only 12 deep learning products FDA-approved for Computer Aided Diagnosis, none of which address COVID-19. This package includes a CNN classification model (trained on chest x-ray images), prediction API, and web visualization that assists medical practitioners in distinguishing between COVID, pneumonia, and "no diagnosis" within seconds and with over 95% accuracy. 

## Installation
### Running the API locally
1. Ensure Python version is >= 3.8

        python 
        exit()

2. Install Flask [TODO: what other installations are necessary? Can someone pull this down and see what's needed?]

        pip install Flask

3. From the `XRayDiagnosisDL` directory, start the API

        python -m api.prediction

### Running the visualization
TODO

## Execution
TODO: Update with accurate steps/details when finalized
1. Navigate to the visualization
2. Observe exploratory data analysis and model evaluation metrics in righthand pane
3. To perform a prediction task, select an x-ray image from the lefthand pane and click "Upload"
4. In middle pane, see applied data augmentation and relative predictive labels
5. In lefthand pane, toggle between original image, image segmentation, and image heatmap to see which image features were most influential in the classification of the original image