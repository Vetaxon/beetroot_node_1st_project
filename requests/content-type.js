
function validateContentType(req, res, next) {
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
        return res.status(400).json({message: 'Incorrect content-type, \'application/x-www-form-urlencoded\' required'})
    } else {
        req.kk = 111;
        next();
    }
}

module.exports = validateContentType;