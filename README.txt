** Classifying Pneumonia and COVID X-Rays Using Deep Learning **

* Desciption * 
It is more important than ever to equip medical practitioners with tools to quickly and accurately diagnose respiratory illness while offering patients convenient and cost-effective medical care. As of 2022, there are only 12 deep learning products FDA-approved for Computer Aided Diagnosis, none of which address COVID-19. This package includes a CNN classification model (trained on chest x-ray images), prediction API, and web visualization that assists medical practitioners in distinguishing between COVID, pneumonia, and "no diagnosis" within seconds and with over 95% accuracy. 

* Installation *
Importing test dataset for API prediction
        1. Download the `test` directory from https://www.kaggle.com/datasets/prashant268/chest-xray-covid19-pneumonia (this should include 3 subfolder, one for each class)

        2. Strip the label from each image name so only the id surrounded by parentheses remains (e.g., COVID19(460).jpg becomes (460).jpg). If you are using zsh as your default terminal, this can be completed using the following script:

                zmv '{class-name}(*).jpg' '$1.jpg'

        3. Move the renamed files (without their subfolders) into the `CODE/api/image' folder.

        PLEASE NOTE: This step is absolutely necessary if you plan to run the API locally. If you only intend to run the visualization, this is not required.

Importing the dataset for model training
        1. Download the full dataset from https://www.kaggle.com/datasets/prashant268/chest-xray-covid19-pneumonia (this should include 2 subfolder, `test` and `train`)

        2. Move the test and train directories into CODE/IO/dataset

        3. Navigate to the `model` directory within CODE to access Jupyter notebooks used for training models (the final model is packaged within the `API` directory as `cnn.pth`)

        PLEASE NOTE: This step is absolutely necessary if you would like to run the attached notebooks locally. If you only intend to run the visualization, this is not required.

Running the API locally
        1. Ensure Python version is >= 3.8

                python 
                exit()

        2. Install the following

                pip install Flask
                pip install torch torchvision
                        
        3. From the `CODE` directory, start the API

                python -m api.prediction

        4. Sample curl request (where id corresponds to an id within the test dataset):

                curl -X POST http://127.0.0.1:5000/predict -v -d "{\"id\":500}" -H "Content-Type":"application/json"

Running the visualization
        1. Place all the files and the `images` folder in the same location.
        2. Open the `index.html` file in any browser.  
        **Best results on a MacBook Air 15".**

* Execution * 
Visualization Pane Descriptions
        Left Pane
        - Click sample X-rays to load them.

        Middle Pane
        - Click **Augments** to see the augmented X-ray images.
        - Click **Results** to see the model predictions.
        - Click **Similar** to see X-rays the model chose as similar.

        Right Pane
        - Click any chart thumbnail to zoom in.
