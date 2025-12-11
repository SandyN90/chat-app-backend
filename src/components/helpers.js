const fs = require('fs');
const { User } = require('./schema')

const getMessage = ()=> {
    const data = fs.readFileSync('./src/assets/message.txt');
    console.log("data", atob(data.toString()));
    return data.toString();
}

const saveMessage= async (data) => {
    let encodedMsg = data;;

    try{
        const savedFile = fs.readFileSync('./src/assets/message.txt');
        let savedData = savedFile.toString();
        if(savedData.length){
            savedData = JSON.parse(atob(savedData));
            
            const [key, value] = Object.entries(encodedMsg)[0];

            savedData[key] = value;
            encodedMsg = btoa(JSON.stringify(savedData));
        }else{
            encodedMsg = btoa(JSON.stringify(encodedMsg));
        }

        fs.writeFileSync('./src/assets/message.txt', encodedMsg);

        return true;
    }catch(err) {
        console.log(err)
        return false;
    }

}

const registerUser = async (data) => {
    const userSchema = new User({...data});
    const res = await userSchema.save();
    return res;
};

const loginUser = async (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let userData;
    try {
        if (emailRegex.test(data.email)) {
            userData = await User.findOne({email: data.email});
        }else {
            userData = await User.findOne({username: data.username});
        }
        return userData;
    }catch(error) {
        return error;
    }
}

const updatePassword = async (email, password) => {
    try {
        const userdata = await User.updateOne({email}, {$set: {password}});
        return userdata;
    }catch(error) {
        return error;
    }
}

module.exports = {getMessage, saveMessage, registerUser, loginUser, updatePassword}