const jsdom = require("jsdom")
const {JSDOM} = jsdom
let parsers = require("./parsers/index")
let { getCities} = require("./api/sources")
const Api = require("./api/index")
const {addPost} = require("./api/news");


const parsersType = {
    dom: (data, config, id) => {
        const {document} = (new JSDOM(data)).window
        const ads = [...document.querySelectorAll(config.selector)]

        return ads.map(elem => {
            const {url, image, description, title, status} = config.object;
            return {
                url: url(elem),
                image: JSON.stringify(image) === undefined ? image(elem) : JSON.stringify(image),
                title: title(elem),
                description: JSON.stringify(description) === undefined ? description(elem) : JSON.stringify(description),
                meta: null,
                source: id,
                status: status
            }
        })
    },
}

const getDataFromUrl = async (url, parser, hash, typeSource) => {
    try {
        let {data: body} = await Api.get(url)
        const functionParser = parsersType[typeSource]
        return functionParser(body, parser, hash)
    } catch (error) {
        console.log(error)
        return []
    }
}

(async () => {
    try {
        const {data: cities} = await getCities()
        if (cities.length === 0) return false
        cities.map(cite => {
            cite.source.map(async source => {
                const {href, type_source, hash} = source;
                if (parsers[hash]) {
                    const listNews = await getDataFromUrl(href, parsers[hash], hash, type_source)
                    await addPost(listNews)
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
})()
