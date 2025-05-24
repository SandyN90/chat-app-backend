const express = require('express');
const router = express.Router();

const { getMessage, saveMessage, registerUser, loginUser } = require('../components/helpers')

const app = express();

router.get('/', (req, res) => {
    const data = getMessage();

    res.json({ msg: atob(data) });
})

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const status = saveMessage(data)
        if (status) {
            res.json("sucssesfully posted")
            res.status(201);
        } else {
            res.json("Error while saving data");
            res.status(500);
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/register', async (req, res) => {
    try {
        const { body } = req;
        await registerUser(body);
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(409).json({ error: `${field} already exists` });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        const { body } = req;
        const userData = await loginUser(body);
        if (userData.password === body.password) {
            return res.status(201).json({ message: 'User Login successfully' });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
});

module.exports = router;