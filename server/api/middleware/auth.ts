import { Request, Response, NextFunction } from 'express';

const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()){
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

const forwardAuth = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()){
        res.redirect('/dashboard');
    }
    else{
        return next();
    }
}

export { ensureAuth, forwardAuth }