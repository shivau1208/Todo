from Todo import app
from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()

url = os.getenv('DB_URL')
db_name = os.getenv('DB_NAME')
client = MongoClient(url)
db = client[db_name]
listcollection = db.todolist

