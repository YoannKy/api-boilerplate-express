/* Check if the body request has the mandatory parameters
 */
module.exports = (requirement) => {
    return (req, res, next) => {

        if (!req.body || !Object.keys(req.body).length) {
            return res.status(400).json({error: 'No parameters found in the POST request'});
        }

        for (let property in requirement.obj) {
            if (requirement.obj[property].required) {
                if (!req.body[property]) {
                  return res.status(400).json({error: `${property} is a required parameter`});
                }
            }
        }
        next();
    }
};
