#!/usr/bin/env python3

from sanic import Sanic, response
from sanic_mongodb_ext import MongoDbExtension
from umongo import Instance, Document, MotorAsyncIOInstance
from umongo.fields import StringField
from ast import literal_eval


app = Sanic(__name__)# Configuration
app.config.update({
  "MONGODB_DATABASE": "lionbridge",
  "MONGODB_URI": "mongodb+srv://oceankrish76:2r1Pa7Hc0LqlqSrd@cluster0-hoxdz.mongodb.net/lionbridge?retryWrites=true&w=majority",
  "MONGODB_CONNECT_OPTIONS": {
    "minPoolSize": 10,
    "maxPoolSize": 50,
  },
  "LAZY_UMONGO": MotorAsyncIOInstance(),
})
MongoDbExtension(app)

# Describe the model
@app.lazy_umongo.register
class Lists(Document):
  name = StringField(required = True, allow_none = False)
  url = StringField(required = True, allow_none = False)
  type = StringField(required = True, allow_none = False)

@app.route("/add-list", methods = ["POST",])
async def handle(request):
    post_data = literal_eval(request.body.decode())
    lists = Lists(name = post_data.get("name"), url = post_data.get("url"), type = post_data.get("type") )
    await lists.commit()

    return response.json(lists.dump())

@app.route("/get-lists")
async def handle(request):
    print(request.body)# lists = await Lists(name = request.args.name, url = request.args.url, type = request.args.type)# await lists.commit()# return response.json(lists.dump())

if __name__ == '__main__':
  app.run(host = '0.0.0.0', port = 8000)