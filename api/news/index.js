let Api = require("../index")

const addPost = async (data) => {
    return await Api.post(`/post/add`, data)
}


module.exports = {addPost: addPost}
