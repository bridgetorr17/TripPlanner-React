const ensureAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.json({success: false, message: 'user not logged in'})
    }
}

const forwardAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/dashboard');
    }
    else{
        return next();
    }
}

export { ensureAuth, forwardAuth }