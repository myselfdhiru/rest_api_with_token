const pool =require("../../config/database");


module.exports ={
    create:(data, callback)=>{
        pool.query(
            `insert into registration(id,fname,lname,gender,email,password,number)
            values(?,?,?,?,?,?,?)`,
            [
                data.id,
                data.fname,
                data.lname,
                data.gender,
                data.email,
                data.password,
                data.number

            ],
            (error, results, fields)=>{
                if (error){
                   return callback(error);

                }
                return callback(null, results);
            }
            
        );
    },
    getUsers: callback=>{
        pool.query(
            `select id, fname, lname, gender, email, number from registration`,
            [],
            (error, results, fields)=>{
                if (error){
                    callback(error);

                }
                return callback(null,results);

            }
        );
    },
    getUserByUserId: (id, callback)=>{
        pool.query(
            `select id, fname, lname, gender, email, number from registration where id =?`,
            [id],
            (error, results, fields)=>{
                if (error){
                    callback(error);

                }
                return callback(null,results[0]);

            }
        );
    },
    updateUser: (data, callback)=>{
        pool.query(
            `update registration set fname=?, lname=?, gender=?, email=?, password=?, number=? where id =?`,
            [data.fname,
            data.lname,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
            ],
            (error, results, fields)=>{
                if (error){
                    callback(error);

                }
                return callback(null,results[0]);

            }
        );
    },
    deleteUser: (data, callback)=>{
        pool.query(
            `delete from registration where id =?`,
            [data.id],
            (error, results, fields)=>{
                if (error){
                    callback(error);

                }
                return callback(null,results[0]);

            }
        );
    },
    getUserByuserEmail:(email, callback)=>{
        pool.query(
            `select *from registration where email =?`,
        [email],
        (error, results, fields)=>{
            if(error){
                callback(error);
            }
            return callback(null, results[0]);
        }
            );

    }
};
