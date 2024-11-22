import requests
from statistics import mean
from sklearn import metrics
import matplotlib.pyplot as plt
import seaborn as sns

if __name__ == '__main__':
    correct = 0
    correct1 = 0
    correct2 = 0
    correct3 = 0
    correct4 = 0
    correct5 = 0
    correct6 = 0
    correct_prediction = 0

    # Used for calculating average number of labels 
    counts = []

    # Grab the ids of all three test classes' photos: COVID [460-575], NORMAL [1266 - 1582], PNEUMONIA [3418-4272]
    covid = list(range(460, 575, 1))
    normal = list(range(1266, 1582, 1))
    pneumonia = list(range(3418, 4272, 1))
    sample_10 = list(range(460,470,1))

    photo_ids = covid + normal + pneumonia

    y_test = []
    y_pred = []

    for id in photo_ids:
        x = requests.post("http://127.0.0.1:5000/predict", json={"id": id})
        if not x.ok:
            print("error")
        resp = x.json()

        true_label = ''
        if id <= 1582 and id >= 1266:
            true_label = 'NORMAL'
        elif id <= 575 and id >= 460:
            true_label = 'COVID19'
        else:
            true_label = 'PNEUMONIA'
        
        y_test.append(true_label)

        original = resp['predictions']['original']['prediction']
        aug1 = resp['predictions']['augmentation']['5_degree_rotation']['prediction']
        aug2 = resp['predictions']['augmentation']['horizontal_flip']['prediction']
        aug3 = resp['predictions']['augmentation']['increase_blur']['prediction']
        aug4 = resp['predictions']['augmentation']['increase_sharpness']['prediction']
        aug5 = resp['predictions']['augmentation']['increase_contrast']['prediction']
        aug6 = resp['predictions']['augmentation']['increase_brightness']['prediction']
        prediction = resp['predicted_label']

        y_pred.append(prediction)

        if original == true_label:
            correct += 1
        if aug1 == true_label:
            correct1 += 1
        if aug2 == true_label:
            correct2 += 1
        if aug3 == true_label:
            correct3 += 1
        if aug4 == true_label:
            correct4 += 1
        if aug5 == true_label:
            correct5 += 1
        if aug6 == true_label:
            correct6 += 1
        if prediction == true_label:
            correct_prediction += 1
        
        num_unique_labels = len(set([
            original, 
            aug1, 
            aug2, 
            aug3, 
            aug4, 
            aug5, 
            aug6
        ]))

        counts.append(num_unique_labels)

        if num_unique_labels == 3:
            print(f"3 labels predicted: {id}")

        if prediction != true_label:
            print(f"incorrect classification: {id}")

    total = len(photo_ids)
    print(f"original_accuracy: {correct/total}")
    print(f"aug1_accuracy: {correct1/total}")
    print(f"aug2_accuracy: {correct2/total}")
    print(f"aug3_accuracy: {correct3/total}")
    print(f"aug4_accuracy: {correct4/total}")
    print(f"aug5_accuracy: {correct5/total}")
    print(f"aug6_accuracy: {correct6/total}")
    print(f"predicted_label_accuracy: {correct_prediction/total}")
    print(f"avg_num_labels: {mean(counts)}")
    print(f"one label: {counts.count(1)}")
    print(f"two labels: {counts.count(2)}")
    print(f"three labels: {counts.count(3)}")

    class_names = ['COVID19', 'NORMAL', 'PNEUMONIA']
    cm = metrics.confusion_matrix(y_test, y_pred, labels=class_names)
    print(cm)
    plt.figure(figsize=(10, 7))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=class_names, yticklabels=class_names)
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.title('Confusion Matrix')
    plt.savefig('confusion_matrix.jpg')

    print(metrics.balanced_accuracy_score(y_test, y_pred))
    print(metrics.f1_score(y_test, y_pred, average="weighted"))
