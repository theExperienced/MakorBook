require('dotenv').config();
const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const Server = WebSocket.Server;

const app = express();

/////NODE WS

const wss = new Server({ port: 3001 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

const socket = new WebSocket('wss://ws.bitstamp.net');

socket.onopen = () => {
  console.log('stringify');
  socket.send(
    JSON.stringify({
      event: 'bts:subscribe',
      data: {
        channel: 'detail_order_book_btcusd',
      },
    })
  );
};

socket.onmessage = (evt) => {
  const message = JSON.parse(evt.data);
  const {
    data: { asks, bids },
  } = message;
  if (wss.clients) {
    wss.clients.forEach((client) => {
      const newData = JSON.stringify({ asks, bids });
      if (client.readyState === WebSocket.OPEN) {
        client.send(newData);
      }
    });
  }
};

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('CONNECTED');
});
