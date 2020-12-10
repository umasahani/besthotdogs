const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { resolve } = require("path");

const stripe = require("stripe")("sk_test_51HuWrOK9N9A5Y7jvyll3R7JruulJTSZGFSAwcanOE7eoLMpqqEKqzhHWFqH8hxXegYZpL3jzGrR5wLTgi9AiEIce00RSx8GkAC");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1200;
};

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/amountdue', (req, res) => {
  const price = '10';
  var amountdue = price*req.query.dognum
  console.log('ttt', req.query.dognum)
  res.setHeader('Content-Type', 'application/json');
  res.send({amountdue});
});

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    metadata: {integration_check: 'accept_a_payment'},
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
