if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
const { route } = require('express/lib/application')
initializePassport(
    passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {username: req.user.username})
})

app.get('/login', checkNotAuthenticated, (req, res) =>{
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local',{
   successRedirect: '/',
   failureRedirect: 'login',
   failureFlash: true 
}))

app.get('/signup', checkNotAuthenticated, (req, res) =>{
    res.render('signup.ejs')
})

app.get('/profile', checkAuthenticated, (req,res) => {
    res.render('profile.ejs')
})

app.get('/fuelQuoteForm', checkAuthenticated, (req,res) => {
    res.render('fuelQuoteForm.ejs')
})

app.get('/fuelQuoteHistory', checkAuthenticated, (req,res) => {
    res.render('fuelQuoteHistory.ejs')
})


app.post('/signup', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword,
            passwordC: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/signup')
    }
    console.log(users)
})


//route for logging the user out
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

//protects routes from users that are not logged in
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next()
    }

    res.redirect('login')
}

//prevents logged in user from seeing login page again
function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})