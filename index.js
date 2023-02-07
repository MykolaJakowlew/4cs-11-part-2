const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/", (req, res) => {
 res.status(200).send("Hello world");
});

app.get("/json", (req, res) => {
 res.status(200).send({ value: 'second api' });
});

const data = [
 { id: 0, name: 'name - 0' },
 { id: 1, name: 'name - 1' },
 { id: 2, name: 'name - 2' },
 { id: 3, name: 'name - 3' },
];

app.get("/items/:id", (req, res) => {
 const { id } = req.params;
 console.log('id:', id);
 const elem = data.find(e => e.id == id);
 if (!elem) {
  return res.status(400).send({ message: "Element was not found" });
 }
 res.status(200).send(elem);
});

app.get("/items", (req, res) => {
 let { ids } = req.query;
 ids = ids.split(',').map(id => parseInt(id, 10));

 const elems = data.filter(e => ids.includes(e.id));
 res.send({ data: elems });
});

app.post("/item", (req, res) => {
 console.log(req.body);
 const { id, name } = req.body;

 const elem = data.find(e => e.id == id);
 if (elem) {
  return res.status(400)
   .send({ message: `Element with id:${id} already exists` });
 }

 const item = { id, name };
 data.push(item);

 res.status(201).send(item);
});

app.listen(8080, () => {
 console.log("server started");
});