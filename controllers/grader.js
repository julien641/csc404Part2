/*   




*/
"use strict";
module.exports = {
    compGPA: function(array) {
        var sum = 0;
        var totalclass = 0;
        var i;
        var error=true;
        for (i in array) {
 
            if (array[i].toUpperCase() == "A") {
                sum += 3*4.00;
                totalclass+=3;
            } else if (array[i].toUpperCase() == "A-") {
                sum += 3*3.67;
                totalclass+=3
            } else if (array[i].toUpperCase() == "B+") {
                sum += 3*3.330;
                totalclass+=3
            } else if (array[i].toUpperCase() == "B") {
                sum += 3*3.00;
                totalclass+=3
            } else if (array[i].toUpperCase() == "B-") {
                sum += 3*2.670;
                totalclass+=3;
            } else if (array[i].toUpperCase() == "C+") {
                sum += 3*2.330;
                totalclass+=3
            } else if (array[i].toUpperCase() == "C") {
                sum += 3*2;
                totalclass+=3
            } else if (array[i].toUpperCase() == "C-") {
                sum += 3*1.67;
                totalclass+=3
            } else if (array[i].toUpperCase() == "D+") {
                sum += 3*1.330;
                totalclass+=3
            } else if (array[i].toUpperCase() == "D") {
                sum += 3*1.0;
                totalclass+=3
            } else if (array[i].toUpperCase() == "D-") {
                sum += 3*0.670;
                totalclass+=3
            } else if (array[i].toUpperCase() == "F") {
                sum += 3*0.0;
                totalclass+=3
            }
            else if (array[i].toUpperCase() == "Z") {
                sum += 3*0.0;
                totalclass+=3
            }else{
                return false;
            }


        }
        if(sum==0||totalclass==0){
return 0;
        }
        return sum / totalclass;
    },
    //TODO
    
    student: function (name, GPA) {
        this.name = name.toString();
        this.GPA = GPA;
    },
    postresult:function(threshhold, studentarray){
        console.log(`The student that has a higher or equal GPA of:${threshhold}`);
        for (var i = 0; i < studentarray.length; i++) {
            if (studentarray[i].GPA >= threshhold) {
                console.log(`Student Name: ${studentarray[i].name.toString()}  GPA:${studentarray[i].GPA.toString()}`);
            }
        }


    }
  };
