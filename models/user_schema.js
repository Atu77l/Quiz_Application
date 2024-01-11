const mongoose=require('mongoose');

const quiz_score=new mongoose.Schema({
    quiz_id:String,
    score:String,
    timeStamp:{type:String,default:new Date().toLocaleDateString()}
});

const userSchema=new mongoose.Schema({
    username:String,
    email: {
        type: String,
        unique: true
    },hashpass:String,
    role:String,
    quizzes:[quiz_score],
});


module.exports=mongoose.model('user',userSchema);