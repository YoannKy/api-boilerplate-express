module.exports = (server) => {
    return {
        client : require('./client')(server),
    }
}
