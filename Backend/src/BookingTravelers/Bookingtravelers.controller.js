const Bookingtravelers = require("./Bookingtravelers.model")

const index = async (req,res) =>{
     return res.json("i am index function");
}
const store = async (req,res) =>{
     return res.json("i am store function");
}
const show = async (req,res) =>{
     return res.json("i am show function");
}
const deleted = async (req,res) =>{
     return res.json("i am deleted function");
}
const updated = async (req,res) =>{
     return res.json("i am deleted function");
}


module.exports = {
    index,
    store,
    show,
    deleted,
    updated
};