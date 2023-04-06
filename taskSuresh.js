var mongoose = require( 'mongoose' );
var taskSuresh = new mongoose.Schema({
    id:{type:String},
    tenant_id : {type: String},
    Bank_Name : {type: String},
    Name:{type:String},
    Type:{type:String},
    Start_Date:{type:Date},
    End_Date:{type:Date},
    Summary:{type:String},
    Task_Owner:{type:String},

	},{ collection : 'taskSuresh'}, {strict: false});
var taskSuresh = module.exports = mongoose.model('taskSuresh', taskSuresh);