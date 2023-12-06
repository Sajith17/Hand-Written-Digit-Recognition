from flask import Flask, request, render_template, url_for, jsonify, redirect, session
import base64
import os
import cv2
from classification import classify

app = Flask(__name__)
app.secret_key = '0123456789'

@app.route('/', methods = ['GET','POST'])
def home():
    if request.method == 'POST':
        data = request.form.get('input_data')
        data_url_prefix = 'data:image/png;base64'
        base64Data = str(data)[len(data_url_prefix):]
        image_data = base64.b64decode(base64Data)
        save_directory = os.path.join(app.root_path, 'static')
        os.makedirs(save_directory, exist_ok=True)
        image_path = os.path.join(save_directory, 'image.png')
        with open(image_path, 'wb') as image_file:
            image_file.write(image_data)
        number,probability = classify(image_path)
        session['result'] = [str(number),f'{probability}%','image.png']
        return jsonify(redirect_url = url_for('result'))
    else:
        if 'result' in session:
            del session['result']
        return render_template('main.html')

@app.route('/result')
def result():
    if 'result' in session:
        input_result = session['result']
        return render_template('result.html', input_result = input_result)
    else:
        return redirect(url_for('home'))

if __name__=='__main__':
    app.run(debug=True)