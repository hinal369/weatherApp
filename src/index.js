const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;
const viewPath = path.join(__dirname, "../views");
const staticPath = path.join(__dirname, "../public");

const app = express();
app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);
app.use(bodyParser.urlencoded())

app.get("/", (req, res) => {
    res.render('index');
})

app.post("/weather", async(req, res) => {
    const param = req.body;
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param.city}&units=metric&appid=a7c986e6dcf0863c0f56487a131fd25f`) 
    const dataObj  = await data.json();
    res.send(dataObj);
})

app.listen(port,() => {
    console.log(`Listening Port : ${port}`);
})