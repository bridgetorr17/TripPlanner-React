const ensureAuth = (req, res, next) => {
    console.log('routed through ensure auth')

    if(req.isAuthenticated()){
        console.log('user IS logged in')
        return next();
    }
    else{
        res.json({
            success: false, 
            message: 'user not logged in',
            redirect: '/'
        })
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