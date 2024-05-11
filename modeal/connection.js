const pool=require("./pool");

exports.query=(querytext,queryvalues)=>{
    return new Promise((resolve,reject)=>{
        pool.query(querytext,queryvalues)
        .then((results) => {
            resolve(results);
        })
        .catch(error=>{ 
            reject(error);
        })
    })
}