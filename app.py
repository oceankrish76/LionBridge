import flask 
from flask import jsonify
from flask import request
# from pymongo import MongoClient
# from bson.objectid import ObjectId
from bson import ObjectId
# from pymongo.objectid import ObjectId
from flask_pymongo import PyMongo
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'lionbridge'
app.config['MONGO_URI'] = 'mongodb+srv://oceankrish76:2r1Pa7Hc0LqlqSrd@cluster0-hoxdz.mongodb.net/lionbridge?retryWrites=true&w=majority'

mongo = PyMongo(app)

@app.route('/all-lists', methods=['GET'])
def get_all_lists():
  lists_ = mongo.db.LionBridge
  lists  = []
  for l in lists_.find():
    lists.append({'id': str(l['_id']),'name': l['name'], 'url': l['url'], 'type': l['type']})
  return jsonify({'result' : lists})

@app.route('/edit-list', methods=['POST'])
def edit_list():
  id = request.json['id']
  name = request.json['name']
  url = request.json['url']
  type = request.json['type']

  lists = mongo.db.LionBridge
  lists.find_one_and_update({'_id': ObjectId(id)}, {"$set": {"name": name, "url": url, "type": type}}, upsert=True)

  return jsonify({'result' : 'success'})

@app.route('/delete-list', methods=['POST'])
def delete_list():
  id = request.json['id']
  lists = mongo.db.LionBridge
  lists.delete_one({'_id': ObjectId(id)})

  return jsonify({'result' : 'success'})

@app.route('/add-new-list', methods=['POST'])
def add_star():
  lists = mongo.db.LionBridge
  name = request.json['name']
  url = request.json['url']
  type = request.json['type']
  insert_id = lists.insert({'name': name, 'url': url, 'type': type})
  # new_star = .find_one({'_id': insert_id })

  return jsonify({'result' : 'success'})

if __name__ == '__main__':
    app.run(debug=True)
