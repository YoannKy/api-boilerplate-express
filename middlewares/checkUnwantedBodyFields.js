/**
 *  check if fields not allowed are sent
 *  @param {Array} fields - An array of fields that are not allowed
 */
module.exports = (fields) => {
    return (req, res, next) => {
        for (let field of fields) {
            if (req.body[field]) {
                return res.status(403).json({error: `${field} is not allowed`});
            }
        }
        next();
    };
};
