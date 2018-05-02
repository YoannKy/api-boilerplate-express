/* Check if the body request has the mandatory parameters
 */
module.exports = (requirements) => {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({error: 'No parameters found in the POST request'});
        }

        if (requirements.constructor.name === 'Schema') {
            let schema = requirements;
            for (let property in schema.obj) {
                if (schema.obj[property].required) {
                    if (!req.body[property])
                        return res.status(400).json({error: `${property} is a required parameter`});
                }
            }
        }
        next();
    }
};
