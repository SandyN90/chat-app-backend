const express = require('express');
const router = express.Router();

const { getMessage, saveMessage } = require('../components/helpers')

const app = express();

router.get('/', (req, res)=> {
    const data = getMessage();
    
    res.json({msg: atob(data)});
})

router.post('/',   async (req, res)=> {
    try {
        
        console.log("data",{msg: req.body});
        const data = req.body
        const status = saveMessage(data)
        if(status) {
            res.json("sucssesfully posted")
            res.status(201);
        }else {
            res.json("Error while saving data");
            res.status(500);
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;