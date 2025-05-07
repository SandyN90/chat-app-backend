const mongoose = require('mongoose');
// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/chatappdatabase',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

// Handle connection events
const db = mongoose.connection;
db
    .on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});