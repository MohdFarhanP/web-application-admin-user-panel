const express = require('express');
const app = express();
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const hbs = require('hbs');
const path = require('path');
const connectdb = require('./db/connect');
const session = require('express-session')
const nocache = require('nocache');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(nocache())
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,
        maxAge:1000*60*60*24
     }
}));


app.use('/user', userRouter);
app.use('/admin', adminRouter);

connectdb();

app.listen(3050)