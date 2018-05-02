const router = require('express').Router();

module.exports = () => {

    router.get('/',
        (req, res) => { res.json({api : 'v1.0'});}
    );

    return router;
};
