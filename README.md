# Luppy API 

This is the Luppy platform API.

### Dependencies

Luppy API requires [node.js] to run.

### 💻 Tech
Luppy API uses some open source projects to work properly:

  * [node.js]
  * [postgresql]
  * [prisma]
  * [typescript]
  * [express]

### 🔨 Installation

To run this project, you must install all dependecies running the command below inside the repo, then just start the project.

```sh
$ npm install
```
or
```sh
$ yarn
```

After installing depedencies, you must have docker with postgresql image or postgresql installed then:
 - Create a database named luppy
 - Create a .env file with the connection string to connect the database
 - Then run "yarn prisma migrate deploy" to run all migrations to the database

.env example:

```sh
DATABASE_URL="postgresql://luppy:luppypassword@localhost:5432/luppy"
```


after installing all dependecies run this command to start the application:

```sh
$ npm run dev
```
or
```sh
$ yarn dev
```

Then Luppy API will start in localhost at:

```sh
localhost:3333
```

### 🎮 Using
To use this application, you can check all routes in src/shared/infra/http/routes, and start using.
Also is being developed a Swagger documentation about the routes.


### 📚 About

This game is part of a project, to web development subject of computer engineering at FACENS.

Here are the group members:

* Leandro Ciric de Souza
* Thiago Henrique Gomes


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [socket.io]: <https://socket.io/>
   [nodemon]: <https://github.com/remy/nodemon>
   [postgresql]: <https://www.postgresql.org/>
   [prisma]: <https://www.prisma.io/>
   [typescript]: <https://www.typescriptlang.org/>
   [express]: <https://expressjs.com/>

