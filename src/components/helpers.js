const fs = require('fs');
const { user } = require('./schema')

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
    const userSchema = new user({...data});
    const res = await userSchema.save();
    return res;
};

module.exports = {getMessage, saveMessage, registerUser}