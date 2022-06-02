# save this as app.py
import time

import flask
from flask import Flask, abort,jsonify,request
from flask_cors import CORS
import random as rn
dataBot ={
    "greet":['fine!,How are you',"hello how is it",'Good day','Good Afternoon','Добры день',"Здравстйвут !","Привет","Как дела"],
    "help":"hi! ,To use this app you need  1. to log in with user name of your choice or leave default to unknown 2. press log in button , 3. then type your message in the input  4. and click the send icon",
    "bye":['Good bye, we hope you enjoyed the appp,','До свидания, мы надеемся, что вам понравилось приложение']
}


app = Flask(__name__)
CORS(app)
db = []
contants = []
for i in range(3):
    db.append({
        'name': 'Anton',
        'time': 12343,
        'text': 'text01923097'
    })


@app.route("/send", methods= ['POST'])
def send_message():
    '''
    функция для отправки нового сообщения пользователем
    :return:
    '''
    # TODO
    # проверить, является ли присланное пользователем правильным json-объектом
    # проверить, есть ли там имя и текст
    # Добавить сообщение в базу данных db
    data = flask.request.json
    if not isinstance(data, dict):
        return abort(400)

    if 'name' not in data or \
        'text' not in data:
        return abort(400)

    if not isinstance(data['name'], str) or \
        not isinstance(data['text'], str) or \
        len(data['name']) == 0 or \
        len(data['text']) == 0:
        return abort(400)

    text = data['text']
    name = data['name']
    message = {
        'text': text,
        'name': name,
        'time': time.time()
    }
    db.append(message)
    return {'ok': True}

@app.route("/",methods=['GET'])
def get_messages():
    try:
        after = float(request.args.get('after'))
        contants.append(request.args.get('username'))
        print(after)
    except:
        abort(400)
    
    for message in db:
        contants.append(message['name'])
    return jsonify({"msg":db,"contants":list(set(contants))})
@app.route("/help",methods=['GET'])
def chatBot():
    chat = request.args.get('chat')
    if chat=='greet':
        return rn.choice(dataBot['greet'])
    elif chat=='help':
        return dataBot['help']
    elif chat=='bye':
        return rn.choice(dataBot['bye'])
    else:
        return " !OOPs ,You need to enter only (help,greet,bye)"

app.run(host="localhost", port=5000, debug=True)
