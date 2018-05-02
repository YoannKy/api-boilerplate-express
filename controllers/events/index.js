module.exports = (server) => {
    return {
        create: require('./create')(server),
    };
};
