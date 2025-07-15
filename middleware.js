module.exports.isLoggedIn=(req, res,next) => {
    //req.user is an object that holds currently logged in users data.it automatically added by passport when user logs in successfully.
    if (!req.isAuthenticated()) {
        console.log(req.user)
        req.session.redirectUrl=req.originalUrl
        req.flash("error", "You are not logged in...");
        return res.redirect("/login");
    }
    next()
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}