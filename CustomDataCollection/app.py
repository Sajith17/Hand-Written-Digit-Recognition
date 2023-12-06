from flask import Flask, request, render_template, url_for, jsonify, redirect
import base64
import os
app = Flask(__name__)



@app.route('/', methods = ['GET','POST'])
def home():
    return render_template('home.html')

@app.route('/process_button',methods = ['POST'])
def process_button():
     button_value = request.form.get('input_data')
     print('HELLLO',button_value)
     redirect_url = url_for('canvas', input_value=button_value)
     return jsonify(redirect_url=redirect_url)    

@app.route('/canvas/<input_value>')
def canvas(input_value):
    return render_template('canvas.html', input_value=input_value)

@app.route('/recieve', methods = ['POST','GET'])
def recieve():
    data = request.get_json()
    base64Data = data.get('image')
    button_value = data.get('button_value')
    name = data.get('name')+'.png'
    data_url_prefix = 'data:image/png;base64,'
    base64Data = str(base64Data)[len(data_url_prefix):]
    while len(base64Data) % 4 != 0:
        base64Data += '='
    image_data = base64.b64decode(base64Data)
    save_directory = os.path.join(app.root_path, 'images')
    os.makedirs(save_directory, exist_ok=True)
    image_path = os.path.join(save_directory, name)
    with open(image_path, 'wb') as image_file:
        image_file.write(image_data)
    redirect_url = url_for('canvas', input_value=button_value)
    return jsonify(redirect_url=redirect_url) 


if __name__=='__main__':
    app.run(debug=True)