# React Space Todos
A sample todo app using ReactJS, MongoDB and Space Cloud. Space Cloud is an open source backend server that exposes realtime APIs on any database.

## Features
- Email Authentication
- Authorization (User can view only his own todos)
- Create, update and delete todos

## Prerequisites
- MongoDB
- NodeJS

## Serve front-end as a static app
It's not necessary to run the webpack service for using this app. To get a
static build of the front-end you simply run `npm run build` and
create-react-app will build a production build in the `build` directory. This
can be hosted pretty much anywhere.

## Steps
Follow the below steps to get the todo app up and running

### Step 1: Download Space Cloud

The first step is to download the `space-cloud` binary. This binary is the server connecting to your database and creating the endpoints for it. 

Download the binary for your OS from here:

- [Mac](https://spaceuptech.com/downloads/darwin/space-cloud.zip)
- [Linux](https://spaceuptech.com/downloads/linux/space-cloud.zip)
- [Windows](https://spaceuptech.com/downloads/windows/space-cloud.zip)

You can unzip the compressed archive

**For Linux / Mac:** `unzip space-cloud.zip`

**For Windows:** Right click on the archive and select `extract here`.

Make the `space-cloud` binary executable and add it to your path.

**For Linux / Mac:** `chmod +x space-cloud`

### Step 2: Download the config file

Space Cloud needs a config file in order to function properly. It relies on the config file to load information like the database connection string, security rules, etc.

You can find the config for this todo app [here](https://raw.githubusercontent.com/didair/react-space-todos/master/space-cloud.yaml). Feel free to explore the file.

### Step 3: Start Space Cloud

You can start `space-cloud` with the following command. Make sure MongoDB is running before this step.

**For Linux / Mac:** `./space-cloud run --config space-cloud.yaml`

**For Windows:** `space-cloud.exe run --config space-cloud.yaml`

That's it. Your backend is up and running!

### Step 4: Run the React app

```bash
git clone https://github.com/didair/react-space-todos.git
cd react-space-todos
npm install
npm start
```
### Step 5: Play with the app!
Open http://localhost:3000 in your browser and explore the app! Try creating some todos and deleting them.
