# Todo

#### Todo application to add daily tasks.
#### Application will work as Single page application using AJAX and JSON.                                                                          
#### To clone the application use below link:
# <img src='https://github.com/shivau1208/S-ToDo/assets/102743170/eaf9cd13-edf7-498b-9018-57bc6e0b7407' width='28' /> [Todo](https://github.com/shivau1208/S-ToDo)
## Previews
![](https://github.com/shivau1208/S-ToDo/assets/102743170/ce078b10-8294-475e-8f71-97bbeffdf80d)
![](https://github.com/shivau1208/S-ToDo/assets/102743170/563d8670-d5c4-4642-99ab-880901866656)

## Developement Setup
```
1. Install Python > 3.11
2. Create enviornment with python.
3. pip install -r requirement.txt
4. python run.py
```

## Build Docker Image with Dockerfile
```docker build -t todo <CWD>```

## Run the Container with Docker
```
docker run -p 5000:5000 --name TodoContainer todo
```

## Mongo DB Connection
```
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

```
