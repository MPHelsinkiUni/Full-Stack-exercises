This is the backend to the phonebook application, implementing RESTful HTTP interface and manages the contact info of people inputted. It uses Node and Express. The frontend of this has been modified from part 2, thus it will be included as well.

# Running the application on a local device
1. Install the node modules with the command `npm install`
2. Create a .env file in the root with following content:
```
MONGODB_URI=your_database_connection_string
PORT=3001
```
3. You may run `node --watch index.js` in the root directory of the machine which will connect to a MongoDB cluster.

It is also deployed through Render on this link: https://full-stack-exercises-fcw6.onrender.com
