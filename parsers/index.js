const data = {

    // Смоленск
    "bad44dcadad66326c0fa1bc98067e5b51fe058be61ec6707d292ae816e00919b": {
        selector: ".news-list > .block",
        object: {
            url: (element) => "https://www.rabochy-put.ru" + element.querySelector(".description > .title > a").href,
            title: (element) => element.querySelector(".description > .title > a").textContent,
            image: (element) => "https://www.rabochy-put.ru" + element.querySelector("a > img").src,
            description: (element) => element.querySelector(".description > [itemprop='articleBody']").textContent,
            meta: (element) => {
                return {
                    date: null,
                    time: null
                }
            }
        }
    },
}

module.exports = data
