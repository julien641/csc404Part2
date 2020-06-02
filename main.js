const port = 3000;
//var  http = require("http");
//var  httpStatus = require("http-status-codes");
var express = require('express');
var app = express();
const path = require('path');


const layouts = require("express-ejs-layouts");
var homeController = require("./controllers/homeController");
var gradeController = require("./controllers/gradeController");

app.use (
  express.urlencoded({
    extended: false
  })
);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.set( 'view engine', 'ejs' );
app.use(layouts);
var courses = [
    "CSC141",
    "CSC142",
    "CSC240",
    "CSC241"
];
//index
app.get( '/', (req,res) => {
  res.render('index', {courses,title: "CSC Courses"});
});


app.get('/courses', gradeController.showCourses);
app.post ('/courses/submit', gradeController.addCourses);


app.post('/newcourse', gradeController.addCourses, gradeController.showCourses);
app.get('/newcourse', gradeController.getNewCourse);
//app.createServer( router.handle )

app.listen( app.get("port"),  () => {
  console.log(`Server running on port ${port}`);
} );
module.exports = {app}