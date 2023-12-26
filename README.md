# S-ToDo

#### S-ToDO application to add daily tasks.
#### Application will work as Single page application using AJAX and JSON.
#### To clone the application use below link:
[S-ToDo](https://github.com/shivau1208/S-ToDo.git)

## Developement Setup
```
1. Install Python > 3.11
2. Create enviornment with python.
3. pip install -r requirement.txt
```

## Build Docker Image with Dockerfile
```docker build -t Todo <CWD>```

## Run the Container with Docker
```
docker run -p 5000:5000 --name TodoContainer --image Todo
```

## Setup SQL DB with ToDo_App.sql
***Note:*** Use PostgreSQL.
