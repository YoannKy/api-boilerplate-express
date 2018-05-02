module.exports = (server) => {
    return {
        create: require('./create')(server),
        callback: require('./callback')(server),
    };
};