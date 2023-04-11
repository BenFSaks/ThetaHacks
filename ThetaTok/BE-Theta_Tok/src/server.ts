import express, { Express, Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express()
const port: number = 3000
const i: string = "Ben"

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.post('/hi', (req,res: Response) => {
    console.log(req.body.email);
    res.send(req.body.email);
})