const express = require('express');
const router = express.Router();

const { getMessage, saveMessage, registerUser, loginUser, updatePassword, validateEmail } = require('../components/helpers')

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
        return res.status(201).json({ ok: true, message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(409).json({ ok: false, error: `${field} already exists` });
        } else {
            return res.status(500).json({ ok: false, error: 'Internal server error' });
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        const { body } = req;
        const userData = await loginUser(body);
        if (userData.password === body.password) {
            return res.status(201).json({ ok: true, message: 'User Login successfully' });
        } else {
            return res.status(401).json({ ok: false, error: 'Invalid username or password' });
        }
    } catch (error) {
        return res.status(401).json({ ok: false, error: 'Invalid username or password' });
    }
});

router.post('/validate-email', async (req, res) => {
    try {
        const { body } = req;
        const { email } = body;
        const isVerified = await validateEmail(email);
        if (isVerified) {
            res.status(200).json({ ok: true, message: 'Email verified successfully' });
        } else {
            res.status(409).json({ ok: false, error: 'Email is not exist, please enter correct email' })
        }
    } catch (error) {
        return res.status(401).json({ ok: false, error: 'Email is not registered, Create new accound' });
    }
});

router.patch('/reset-password', async (req, res) => {
    try {
        const { email, password } = req.body;
        await updatePassword(email, password);
        res.status(200).json({ ok: true, message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({ ok: false, error: 'Internal server error' });
    }
})


module.exports = router;