module.exports = (server) => {
    return {
        sampleClient : require('./sampleClient')(server),
    }
}