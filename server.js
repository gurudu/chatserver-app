const express = require('express');
const app = express();
const http = require('http').Server(app);

let port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`server is listening for requests on port ${port}`);
});

app.get('/', (req, res) => {
   res.send('<h1>Hallo world</h1>');
});