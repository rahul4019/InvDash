import express from "express"

const app = express()
const port = 8000

app.listen(port, () => {
  console.log(`App is up and running at ${port}`)
})
