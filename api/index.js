let api = require("axios")


const instance = api.create({
    baseURL: 'http://localhost:3021',
    headers: {'Content-Type': "application/json", 'charset': "UTF-8"}
})


class Api {
    static async get(url) {
        return await instance.get(url)
    }

    static async post(url, data) {
        return await instance.post(url, data)
    }
}

module.exports = Api
