const user=require("./../user/shema");

const findbyPhone=(phone)=>{
    return user.findOne({phone})
 };
const createuser=(users)=>{
    return user.create(users);
 }
module.exports={
    findbyPhone,
    createuser}