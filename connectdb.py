from Todo import app
from pymongo import MongoClient

client = MongoClient('mongodb+srv://todo:6a6ydo!!1to0@cluster0.qbjau9n.mongodb.net')
db = client['Todo']
listcollection = db.todolist

