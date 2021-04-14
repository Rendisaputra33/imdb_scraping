const express = require("express")
const scraper = require("./scraper")
const fs = require("fs")
const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.send("hello world!");
});

app.get('/movies/:title', (req, res) => {
    scraper
        .getMovies(req.params.title)
        .then((movies) => {

            fs.readFile('data/movies.json', 'utf-8', (err, data) => {
                const file = JSON.parse(data)
                file.push(movies)
                console.log(file)

                fs.writeFile('data/movies.json', JSON.stringify(file), (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                })
            })


            // send data sheet to user
            res.json({
                status: 200,
                count_data: movies.length,
                message: 'success',
                data: movies
            })
        })
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});

app.get('/coba', (req, res) => {

    fs.readFile('data/movies.json', 'utf-8', (err, data) => {
        const dataparse = JSON.parse(data)
        res.json({
            count_data: dataparse.length,
            status: 200,
            movies: dataparse
        })
    })

})

app.get('/search/:title', (req, res) => {

    scraper
        .get_data(req.params.title)
        .then((movies) => {

            fs.readFile('data/list-movies.json', 'utf-8', (err, data) => {
                const file = JSON.parse(data)
                file.push(movies)
                console.log(file)

                fs.writeFile('data/list-movies.json', JSON.stringify(file), (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                })
            })

            res.json({
                status: 200,
                message: 'success',
                data: movies
            })
        })

})
