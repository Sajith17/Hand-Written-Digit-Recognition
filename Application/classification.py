from tensorflow.keras.models import load_model
import cv2
import numpy as np

model = load_model('model.h5')


def classify(image_path):
    image = cv2.imread(image_path)
    image = cv2.resize(image,(28,28))
    image = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    image = image/255
    image = np.array(image)
    input = np.array([image])
    y = model.predict(input)
    result_number =  np.argmax(y[0])
    probability = int(np.max(y[0])*100)
    return result_number, probability 


# print(classify(r"C:\Users\sajit\OneDrive\Desktop\Pythonn\Completed projects\Hand-written digit recognition\Application\static\image.png"))

