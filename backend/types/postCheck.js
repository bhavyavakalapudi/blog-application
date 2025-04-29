const zod = require('zod')

const postBody = zod.object({
    title: zod.string(),
    content: zod.string()
})

module.exports = {
    postBody
}