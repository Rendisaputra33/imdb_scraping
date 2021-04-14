const fecth = require("node-fetch");
const cheerio = require("cheerio");
const { default: fetch } = require("node-fetch");
const url = `https://www.imdb.com/find?s=tt&q=`;

async function get_data(keywords) {
    return await fecth(`${url}${keywords}`)
        .then((results) => results.text())
        .then((results) => {
            const movies = []
            const $ = cheerio.load(results)
            $('.findResult').each((i, element) => {
                const $element = $(element)
                const $image = $element.find('td a img')
                const $title = $element.find('td.result_text a')
                const imdbID = $title.attr('href')
                const movie = {
                    'title': $title.text(),
                    'poster': $image.attr('src'),
                    'imdbID': imdbID.match(/title\/(.*)\//)[1]
                }

                movies.push(movie)

            })

            return movies
        })

}

async function getMovies(key) {

    return await fetch(`https://www.imdb.com/search/keyword/?keywords=${key}`)
        .then((value) => value.text())
        .then((result) => {

            const $ = cheerio.load(result)
            const Movies = []
            let count = 0

            $('.lister-item').each(function (i, element) {
                count += 1
                const $element = $(element)
                const $title = $element.find('h3 a')
                const $image = $element.find('.lister-item-image a img')
                // const $synopsis = $element.find('p.')
                const $genre = $element.find('.lister-item-content p.text-muted span.genre')
                const $certificate = $element.find('.lister-item-content p.text-muted span.certificate')
                const imdbID = $title.attr('href')
                const $runtime = $element.find('.lister-item-content p.text-muted span.runtime')
                const $year = $element.find('.lister-item-content span.lister-item-year')
                // console.log($year.text())

                const movie = {
                    'imdbID': imdbID.match(/title\/(.*)\//)[1],
                    'title': $title.text(),
                    'poster': $image.attr('src'),
                    'genre': $genre.text(),
                    'certificate': $certificate.text(),
                    'runtime': $runtime.text(),
                    'year': $year.text()
                }

                Movies.push(movie)
            })

            return Movies
        })
}

module.exports = {
    get_data,
    getMovies
}