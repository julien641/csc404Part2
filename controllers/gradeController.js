const grader = require("./grader");
const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: "Courses"})
});


var newstudentGrades = [];
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("contacts").find({gpa: {$gte: 2.5}}).toArray(function (err, result) {
        if (err) throw err;
        newstudentGrades = result;
        db.close();
    });
});

router.showCourses = (req, res) => {
    res.render("courses", {
        allCourses: newstudentGrades, title: "Course List"
    });
};



router.addCourses = (req, res) => {
    var studentName = req.body.name;
    var grades = [];
//console.log(req);
    grades.push(req.body.csc141grade);
    grades.push(req.body.csc142grade);
    grades.push(req.body.csc240grade);
    grades.push(req.body.csc241grade);

    if (studentName == "") {
        res.render("newcourse", {title: "New Course", error: "Missing Student Name"});

    } else {
        var isnotemptie = true;
        grades.forEach((item, index) => {

            if (item == "") {
                isnotemptie = false
            }else{

                item.trim().toUpperCase();
            }
        });
        var gpa = grader.compGPA(grades);
        if (isnotemptie === false) {
            res.render("newcourse", {title: "New Course", error: "Missing Grade"});
        }else if (gpa === false) {
            res.render("newcourse", {title: "New Course", error: "Incorrect inputed grade"});
        } else {
            flooredgpa = (Math.floor(gpa * 10) / 10);
            let allCourses = newstudentGrades;
            var myobj = {"name": studentName, "gpa": flooredgpa};

            MongoClient.connect(url, function (err, db) {
                if (err) {
                    res.render("newcourse", {title: "New Course", error: "Unable to connect to server"});
                }
                var dbo = db.db("test");
                dbo.collection("contacts").insertOne(myobj, function (err, res) {
                    if (err) {
                        res.render("newcourse", {title: "New Course", error: "Unable to insert student"});
                    }
                    db.close();
                });
            });

            if (flooredgpa >= 2.5 && !(studentName == "")) {
                allCourses.push(myobj);
            }
            res.render("newcourse", {
                title: "New Course",
                error: "Student Name: " + studentName + " GPA: " + flooredgpa
            });

        }
    }
};

router.getNewCourse = (req, res) => {
    res.render("newcourse", {title: "New Course", error: ""});
};
module.exports = router;
