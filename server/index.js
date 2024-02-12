const express = require('express');
const items = require("./public/items.json")

var cors = require('cors')
const app = express();

app.use(cors());
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  try {
      return res.json(items);
  } catch (err) {
      console.error(`Error while getting products`, err.message);
      next(err);
  }
})


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});