const path = require("path");
const express = require("express");

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(path.join(__dirname, '../public')));

// app.get('/', function(req, res){
//     res.render('index');
// });

app.listen(port, function(){
    console.log(`Started Server on port ${port}`);
});