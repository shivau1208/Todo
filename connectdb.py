from Todo import app
from flask_mysqldb import MySQL



app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'ToDo'
app.config['MYSQL_PORT'] = 3306

mydb = MySQL(app)







