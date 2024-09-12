const Admin = require("../model/adminModel");
const bcrypt = require('bcrypt')
const user = require('../model/userModel')


const loadLogin = (req,res)=>{
    res.render('admin/login')
}
const loginBtn = async(req,res)=>{
    try{
    const {username,password} = req.body;

    let adminExist =await Admin.findOne({userName:username})

    if(!adminExist){
        return res.render('admin/login',{message:'invalid credintials'})
    }
    const match = await bcrypt.compare(password,adminExist.password)

    if(!match){
        return res.render('admin/login',{message:'invalid credintials'})
    }else{
        req.session.admin = true;   
        res.redirect('/admin/dashboard')
    }
}catch(err){
    console.log('admin login error:',err)
}

}
const loadDashboard = async(req,res)=>{
    let adminExist = req.session.admin;
    if (!adminExist){
        return res.redirect('/admin/login');
    }else{
        const users = await user.find({})
        res.render('admin/dashboard',{data:users})
    }
}  
const edituser = async(req,res)=>{
    try{

        
        const {id,username,password} = req.body;
        console.log(req.body);
        const hashpass = await bcrypt.hash(password,10)

        await user.findOneAndUpdate(
            {_id:id},
            {$set:{userName:username,password:hashpass}}
        );
        
        res.redirect('/admin/dashboard')

    }catch(err){
        console.log('editing part',error)
    }
}  
const deleteUser = async(req,res)=>{
    try{
        const {id} = req.body;
        
        await user.findByIdAndDelete(id)
        res.redirect('/admin/dashboard')
    }catch(error){

    }
}
const addUser = async(req,res)=>{
    try{
        const {UserName,Password} =  req.body;
        console.log(req.body);
        

        const hashedpass = await bcrypt.hash(Password,10)

        const addedUser = await user.create({
            userName:UserName,
            password:hashedpass
        });
        await addedUser.save();

        res.redirect('/admin/dashboard');
        
    }catch(error){
        console.log(error);
        
    }
}
const logout = (req,res)=>{
    req.session.admin = null;
    res.redirect('/admin/login')
}
const search = async(req,res)=>{
    try{
        
    const {search} = req.body;
    const users = await user.find({
        userName:{$regex:search,$options:"i"}
    });
    res.render('admin/dashboard',{data:users})
}catch(err){
    console.log(err);
    
}
}
module.exports = {
    loadLogin,
    loginBtn,
    loadDashboard,
    edituser,
    deleteUser,
    addUser,
    logout,
    search
}