FROM node
WORKDIR /app
RUN pip install -r requirements.txt
COPY . .
CMD ["python","run.py"]
