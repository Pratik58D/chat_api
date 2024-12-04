import jwt from "jsonwebtoken";

export const generateToken = (userId,res)=>{

    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn : '7d'
    })

    res.cookie("jwtCookie",token,{
        maxAge  :7 * 24* 60 * 60 * 1000,   //Milli second
        httpOnly : true, //prevent xss attacks cross-site acripting attacks
        sameSite : "strict",  //CSRF attacks cross-site Resource attacks
        secure : process.env.NODE_ENV !== "development" 
    })

    return token;
}