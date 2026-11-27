

const checkAPI = (req, res, next) => {
    const apiKey = req.header['x-api-key'];

    if(apiKey === "myscrect"){
        next();
    }else{
        res.status(401).json({success: false, error: "Unauthorized! Invalid or missing API Key"});
    }
}

module.exports = checkAPI