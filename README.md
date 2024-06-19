# S-ToDo

#### S-ToDO application to add daily tasks.
#### Application will work as Single page application using AJAX and JSON.                                                                          
#### To clone the application use below link:
# <img src='https://github.com/shivau1208/S-ToDo/assets/102743170/eaf9cd13-edf7-498b-9018-57bc6e0b7407' width='28' /> [S-ToDo](https://github.com/shivau1208/S-ToDo.git)
## Previews
![](https://github.com/shivau1208/S-ToDo/assets/102743170/ce078b10-8294-475e-8f71-97bbeffdf80d)
![](https://github.com/shivau1208/S-ToDo/assets/102743170/563d8670-d5c4-4642-99ab-880901866656)

## Developement Setup
```
1. Install Python > 3.11
2. Create enviornment with python.
3. pip install -r requirement.txt
```

## Build Docker Image with Dockerfile
```docker build -t todo <CWD>```

## Run the Container with Docker
```
docker run -p 5000:5000 --name TodoContainer todo
```

## Setup SQL DB with ToDo_App.sql
***Note:*** Use PostgreSQL.

## Mongo DB Connection
```
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Access the database
db = client['mydatabase']

# Access the collection
collection = db['mycollection']

# Insert a document
collection.insert_one({"name": "Alice", "age": 30})

# Find one document
document = collection.find_one({"name": "Alice"})
print("Find one:", document)

# Find multiple documents
documents = collection.find({"age": {"$gt": 25}})
print("Find multiple:")
for doc in documents:
    print(doc)

# Update a document
collection.update_one({"name": "Alice"}, {"$set": {"age": 31}})

# Update multiple fields in the document
collection.update_one(
    {"name": "Alice"},  # Query to match the document
    {
        "$set": {
            "age": 31,
            "city": "New York",
            "email": "alice@example.com"
        }
    }
)

# Verify the update
updated_document = collection.find_one({"name": "Alice"})
print(updated_document)

# Delete a document
collection.delete_one({"name": "Alice"})

```