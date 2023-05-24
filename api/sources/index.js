const Api = require("../index")

const getCities = async () => {
    return await Api.get(`/sources/all`)
}

module.exports = {
    getCities: getCities,
}
