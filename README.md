# Simple Chat Web using MERN and socket.io
The project is an implemented simple chat web app using MERN stack.
The project uses MongoDB as the database (NoSQL Database), Node JS (ExpressJS) as the backend,
and React (with Vite and support with DaisyUI) as the front end.

### Requirements
- NodeJS (version >= 16.20.1)
- MongoDB Service (mongoose version 7.x)
- Create a database (with authentication if you need it)

### Setup Server
- copy .env.example to .env
- fill all env variables
- open the terminal and change directory to `api/` folder
- execute `npm install` or `yarn install` to install all required npm packages
- execute `npm start` or `yarn start` to run the server service
- if success running the server service, you will see:
```
Server Running at 3000
DB is ready. [timestamp]
```
- you can access the server via `http://localhost:3000` (the port 3000 is based on your `.env`)

### Setup Client
- copy .env.example to .env
- fill all env variables
- open the terminal and change directory to `client/` folder
- execute `npm install` or `yarn install` to install all required npm packages
- execute `npm run dev` or `yarn dev` to run client service in development mode
- if success running the client service, you will see :
```
 VITE v4.x.x  ready in x ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```
- you can access the client app via `http://localhost:5173` (or use --host and --port to change the port and host)

### Project Limitation
- status offline or chatroom members only will be removed when user exiting the chatroom. (Cannot do automatic logout)
- socket only used for detecting new chat message on a chatroom

### Client Demo
[Click Here](https://mern-chat.pages.dev)
