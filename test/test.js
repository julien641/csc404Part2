console.log("hello");
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const app = require('../main');
var request = require('supertest');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var server;
var website="/newcourse";
var website2="/courses";
/*



*/

const incorectegrade="Incorrect inputed grade";
const missinggrade="Missing Grade";
const missingname="Missing Student Name";

function returnsformatedstring(name,gpa){
    return "Student Name: " + name + " GPA: " + gpa;
}

describe('simple test of about route with params', function () {
    beforeEach(function () {
        server = require('../main').app;

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("test").dropDatabase();;

        });
    });

        it('Insert Student julien with a gpa of 4 should show up on qualified students', function (done) {
            newcoursetest(

                returnsformatedstring("julien",4),
                {
                    'name': "julien",
                    'csc141grade': "a",
                    'csc142grade': "a",
                    'csc240grade': "a",
                    'csc241grade': "a"
                },
                {"name":"julien","gpa":4},

                true,
                true,
                {"name":"julien","gpa":4},
                {"name":"julien","gpa":4},
           );
            done();
        });


        it('Insert Student bob with a gpa of 2.2 should not show up on qualified students', function (done) {
            newcoursetest(

                returnsformatedstring("bob",2.2),
                {
                    'name': "bob",
                    'csc141grade': "a",
                    'csc142grade': "b",
                    'csc240grade': "c",
                    'csc241grade': "f"
                },
                {"name":"bob","gpa":2.2},
                true,
                false,
            {"name":"bob","gpa":2.2}
            );


            done();
        });


        it('wont Insert Student dude because of a invalid grade', function (done) {
        newcoursetest(

            incorectegrade,
            {
                'name': "dude",
                'csc141grade': "a",
                'csc142grade': "b",
                'csc240grade': "c",
                'csc241grade': "t"
            },
            {"name":"dude"},
            false,
            false


        );


        done();
    });

    it('wont Insert Student dude because of a invalid grade', function (done) {
        newcoursetest(

            missingname,
            {
                'name': "",
                'csc141grade': "a",
                'csc142grade': "b",
                'csc240grade': "c",
                'csc241grade': "t"
            },
            null,
            false,
            false


        );


        done();
    });
    it('wont Insert Student dude because of a invalid grade', function (done) {
        newcoursetest(
            missinggrade,
            {
                'name': "grace",
                'csc141grade': "",
                'csc142grade': "b",
                'csc240grade': "c",
                'csc241grade': "a"
            },
            {"name": "grace"},
            false,
            false)
        done();

    });
        it('wont Insert Student dude because of a invalid grade', function (done) {
            newcoursetest(
                returnsformatedstring("grace",0),
                {
                    'name': "grace",
                    'csc141grade': "f",
                    'csc142grade': "f",
                    'csc240grade': "f",
                    'csc241grade': "f"
                },
                {"name": "grace","gpa":0},
                true,
                false,
                {"name": "grace","gpa":0},

            );

            done();
        });
    it('wont Insert Student dude because of a invalid grade', function (done) {
        newcoursetest(
            missingname,
            {
                'name': "",
                'csc141grade': "",
                'csc142grade': "b",
                'csc240grade': "c",
                'csc241grade': "a"
            },
            null,
            false,
            false)
        done();

    });
    it('wont Insert Student dude because of a invalid grade', function (done) {
        newcoursetest(
            missinggrade,
            {
                'name': "bob",
                'csc141grade': "",
                'csc142grade': "b",
                'csc240grade': "c",
                'csc241grade': "a"
            },
            null,
            false,
            false)
        done();

    });

    });



 function newcoursetest(
                       error="",
                       data,//inserted data
                       expectedinsertion=null,
                       isinserted= false,// expected db object
                       isshown=false,
                       result2=null) //==expected shown data
{
    request(server).post(website)
        .send(data)
        .expect(200)
        .end( function (err, response) {
            if (err) {
            }
            expect(response.text).to.have.string(error);

            MongoClient.connect(url,
                function (err, db) {
                    if (err) {

                    } else {
                        var results;
                        var dbo = db.db("test");
                        dbo.collection("contacts").find({"name": expectedinsertion.name}).toArray(
                            function (err, result) {

                                if (err) {
                                    console.log("ewrr"+err);
                                }
                                console.log(result);
                                if(!isinserted) {
                                    expect( isEmpty(result) ).to.equal(true);
                                }
                                if(isinserted) {
                                   if(! isEmpty(result)) {
                                           expect(result[0].name === expectedinsertion.name).to.equal(isinserted);
                                           expect(result[0].gpa == expectedinsertion.gpa).to.equal(isinserted);
                                   }
                                    }



                                    request(server).get(website2)
                                        .expect(200)
                                        .end(function (err, response) {
                                            if (err) {
                                                //    console.log(err);
                                            }else {

                                                // the variable is defined
                                    if(isinserted) {
                                        if ( result2.gpa < 2.5) {
                                            expect(response.text).to.not.have.string(result2.name);
                                        } else {
                                            expect(response.text).to.have.string(result2.gpa);
                                            expect(response.text).to.have.string(result2.name);
                                        }
                                    }
                                            }

                                        });


                                    db.close();




                            }
                        );
                    }
                }
            );


        });

}
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


 function dbtestfind(name) {
    var results;
    MongoClient.connect(url,
        function (err, db) {
            if (err) {

            } else {
                var dbo = db.db("test");
                dbo.collection("contacts").find({name: name}).toArray(
                    function (err, result) {
                        if (err) {
                            console.log("ewrr"+err);
                        } else {

                            results = result[1];
                            db.close();
                        }
                    }
                );
            }
        }
    );
    return results;

}
