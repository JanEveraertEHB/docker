const express = require('express')
const app = express()
const port = 3000


const answers = [{
  q: "hello",
  a: "Hi!"
}, {
  q: "goods",
  a: "I have no wares, sorry!"
}, {
  q: "steal",
  a: "Oh dear heavens no!"
}]

app.get('/', (req, res) => {
  res.send({ messages: [] })
})

app.get('/ask', (req, res) => {
  let answered = false;
  const words = req.query.q.split(" ");
  words.sort((a, b) => b.length - a.length)

  for (let i = 0; i < words.length - 1; i++) {
    answers.forEach((element) => {
      if (element.q.includes(words[i])) {
        res.send(element.a);
        answered = true;
        return;
      }
    })
  }
  if (!answered) res.send("Sorry, I didn't get that")
})

app.listen(port, () => {
  console.log(`endpoint listening at ${port}`)
})
