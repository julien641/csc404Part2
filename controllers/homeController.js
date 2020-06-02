
const express = require('express');
const router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', {dcourses ,title: "Courses"})
});
/*
CSC141
CSC142
CSC240
CSC241
*/

console.log('in homeController pass 1');
router.showCourses = (req, res) => {
    res.render("courses", {
        allCourses: courses, title: "Course List"
    });
};
console.log('in homeController pass 2');
/*
router.addCourses = (req, res) => {
    console.log("in homeController addCourses");
    var newcourseName = req.body.name;
    console.log("name " + newcourseName);
    var newCoursePrice = req.body.price;
    let allCourses = courses;
    allCourses.push({name: newcourseName, price: newCoursePrice});
    res.render("courses", {
        allCourses: courses
    });
};
*/
console.log('in homeController pass 3');
router.getNewCourse = (req, res) => {
    console.log("in homeController getNewCourse");
    res.render("newcourse", {title: "New Course"});
};
module.exports = router;

