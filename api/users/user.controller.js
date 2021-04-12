const { create,getUserByUserId,getUsers,updateUser,deleteUser, getUserByuserEmail }= require("./user.services");
const {genSaltSync, hashSync, compareSync}=require("bcrypt");
const {sign}= require("jsonwebtoken");
module.exports={
    createUser:(req, res)=>{
        const body =req.body;
        const salt=genSaltSync(10);
        body.password =hashSync(body.password,salt);
        create(body, (err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message:"db connection err"
                });
            }
            return res.status(200).json({
                success: 1,
                data:results
            });

        });
    },
    getUserByUserId:(req, res)=>{
        const id= req.params.id;
        getUserByUserId(id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"record not found"
                });
            }
            return res.json({
                success:1,
                data:results
            })
        });

    },
    getUsers:(req,res)=>{
        getUsers((err,results)=>{
            if (err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    updateUser:(req,res)=>{
        const body =req.body;
        const salt =genSaltSync(10);
        body.password =hashSync(body.password,salt);
        updateUser(body,(err,results)=>{
            if (err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data: "upadated successfully"
            });
        });
    },
    deleteUser:(req,res)=>{
        const body =req.body;
        deleteUser(body,(err,results)=>{
            if (err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"record not found"
                });
            }
            return res.json({
                success:1,
                data: "user deleted successfully"
            });
        });
    },
    login: (req, res) =>{
        const body= req.body;
        getUserByuserEmail(body.email,(err, results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
            return res.json({
                success:0,
                data:"invalid email or password"
            });
            }
        
            const result = compareSync(body.password, results.password);
            if(result){
                result.password =undefined;
                const jsonwebtoken=sign({result:results},process.env.KEY,{
                    expiresIn:"1h"
                });
                return res.json({
                    success:1,
                    message:"login successfully",
                    token:jsonwebtoken
                });
            }else {
                return res.json({
                    success:0,
                    data:"invalid email or password"
                });
            }
        });
    }
    
};