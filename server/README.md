# Datahouse API Documentation


## Get started

First, install dependencies with ````npm install````.

Start you mongoDB docker instance with
```docker-compose build``` and 
```docker-compose up```

Then, start the API with a 
```npm start```
. The API will listening on port 3003. If there is an internet connection, the API will automatically grab data on open.data.paris and fill the base.

## End points

First, you need to use /login or /register

|      Action                 |    Method     |       Endpoint     | 
| --------------------------- | ------------- | ------------------ |
|    Login one user           |     POST      |   /login            |
|    List all books           |      GET      |    /book           |
|    Create one books         |      POST     |    /book           |
|    Delete one books         |    DELETE     |    /book/id        |
|    Edit one books           |      PUT      |     /book/id       |
|    Get one books            |      GET      |    /book/id        |
|    Get avis for one book    |      GET      |   /book/id/avis    |
|    List all user            |      GET      |   /user            |
|    Create one user          |      POST     |   /register            |
|    Delete one user          |      DELETE   |   /user/id         |
|    Edit one user            |      PUT      |   /user            |
|    Get one user             |      GET      |   /user/id         |
|  Get all avis of one user   |      GET      |   /user/id/avis    |   
|  Create one avis for user   |      POST     |   /user/id/avis    |           
|  Delete one avis for user   |      DELETE   |   /user/id/avis/id    |           
|  Edit one avis for user     |      PUT      |   /user/id/avis/id    |           
|  Get one avis for user     |      GET       |   /user/id/avis/id    |           
