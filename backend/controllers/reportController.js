const Report = require("../models/reportModel")
const Exam = require("../models/examModel")
const User = require("../models/userModel")

//add attempts

const addReport = async(req,res) => {
    try{
       const report = new Report(req.body);
       await report.save()
       res.send({
        message: "Attempt added successfully",
        data: null,
        success: true
       })
    }
    catch(error){
        res.send({
            message: error.message,
            data: error,
            success: false
        })
    }
}

// get all attempts
const getAllAttempts = async(req,res) => {
    try{
        const user_admin = await User.findOne({
            _id: req.body.userid
        })
        if(user_admin.isAdmin){
            const { examName, userName } = req.body
            const exam = await Exam.find({
                name: {
                    $regex: examName,
                }, 
            })
            const matchedExamIds = exam.map((exam)=>exam._id)
            const user = await User.find({
                name: {
                    $regex: userName,
                }, 
            })
            const matchedUserIds = user.map((user)=>user._id)
            const reports = await Report.find({
                exam: {
                  $in: matchedExamIds,
                },
                user: {
                  $in: matchedUserIds,
                },
            }).populate("exam").populate("user").sort({createdAt: -1})
            if(reports){
                res.send({
                    message: "All Attempts fetched successfully.",
                    data: reports,
                    success: true
                })
            }
            else{
                res.send({
                    message: "No Attempts to display.",
                    data: null,
                    success: false
                })
            }   
        }
        else{
            res.send({
                message: "Cannot Fetch All Attempts.",
                data: null,
                success: false
            })
        }
    }
    catch(error){
        res.send({
            message: error.message,
            data: error,
            success: false
        })
    }
}

const getAllAttemptsByUser = async(req,res) => {
    try{
        const reports = await Report.find({user: req.body.userid}).populate("exam").populate("user").sort({createdAt: -1})
        if(reports){
            res.send({
                message: "All Attempts fetched successfully.",
                data: reports,
                success: true
            })
        }
        else{
            res.send({
                message: "No Attempts to display.",
                data: null,
                success: false
            })
        }
    }
    catch(error){
        res.send({
            message: error.message,
            data: error,
            success: false
        })
    }
}

const getInfoGrouped=async(req,res)=>{
    const userId = req.body.userId;
    try {
        const reports = await Report.find({ user: req.body.userid }).populate('exam');
        const performanceData = reports.reduce((acc, report) => {
            const exam = report.exam;
            const category = exam.category;
            const result = report.result;
      
            if (!acc[category]) {
              acc[category] = {
                totalMarks: 0,
                obtainedMarks: 0,
                exams: []
              };
            }
      
            acc[category].totalMarks += exam.totalMarks;
            acc[category].obtainedMarks += result.correctAnswers.length;
            acc[category].exams.push({
              examId: exam._id,
              examName: exam.name,
              obtainedMarks: result.correctAnswers.length,
              totalMarks: exam.totalMarks,
              date: report.createdAt
            });
      
            return acc;
          }, {});
      
          res.json(performanceData);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
      

module.exports = {addReport,getAllAttempts, getAllAttemptsByUser,getInfoGrouped}
