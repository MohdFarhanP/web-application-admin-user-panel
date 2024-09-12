const User = require('../model/userModel');
const bcrypt = require('bcrypt')
const saltRound = 10;

const signupUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        
        let exist = await User.findOne({ userName:username});
       
       if (!exist) {
            const hashPassword = await bcrypt.hash(password,saltRound);
            const newUSer = new User({
                userName:username,
                password:hashPassword
            });
            await newUSer.save();
           return res.render('user/login', { message: 'user created successfully' });
        } else {
            return res.render('user/signup', { message: 'user already exists' })
        }
    } catch (error) {
        console.error('sign up error:', error);
    }

};
const loginUser = async (req,res) => {
    try{
        const {username,password} = req.body;
        
        const existUser = await User.findOne({userName:username});
        if(!existUser){
           return res.render('user/login',{msg:'user not found'});
        }else{
            let match = await bcrypt.compare(password,existUser.password)
            if(!match){
                
                return res.render('user/login',{msg:"Incorrect Password"});
            }
            req.session.user = true;
            res.render('user/userhome',{msg:'Login succesfull'})
        }

    }catch(err){
        res.render("user/login",{msg:'something wrong in login page'});
    }
};

const loadSignup = (req,res)=>{
    res.render("user/signup");
};

const loadHome = (req,res)=>{
    res.render("user/userhome")
}
const loadLogin =(req,res)=>{
    res.render('user/login');
};
const logout = (req,res)=>{
    req.session.user = null;
    res.redirect("/user/login")
}

module.exports = {
    signupUser,
    loginUser,
    loadLogin,
    loadSignup,
    loadHome,
    logout
};  