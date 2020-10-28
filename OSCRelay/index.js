var osc = require("osc");
const express = require('express')
const app = express()
const port = 3000

const receivedMessagesArray = [];

app.get('/', (req, res) => {
  res.send({ messages: receivedMessagesArray })
})

app.listen(port, () => {
  console.log(`endpoint listening at ${port}`)
})


/**
 * 
 */
var udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 8000,
  remoteAddress: "192.168.0.214",
  remotePort: 4560,
  broadcast: true

});

/**
 * Port is ready to accept connections
 */
udpPort.on("ready", function () {
  console.log("ready")
});

udpPort.on("connection", function (e) {
  console.log(e, "connection made")

});


udpPort.on("message", function (oscMessage) {
  console.log("message received: ")
  console.log(oscMessage);

  //do something with the message

  receivedMessagesArray.push(oscMessage);

  udpPort.send({
    address: oscMessage.address,
    args: [
      {
        type: "i",
        value: oscMessage['args'][0] ? oscMessage['args'][0] : 1
      }
    ]
  })
});

udpPort.on("error", function (err) {
  console.log(err);
});

udpPort.open();