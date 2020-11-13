const routes = (app) => {

    app.route('/')

    .get((req, res) => {
        res.send(`This is get method on port`)
    })
    
    .put((req, res) => {
        res.send(`This is put method on port`)
    })
    
    .post((req, res) => {
        res.send(`This is post method on port`)
    })

    .delete((req, res) => {
        res.send(`This is delete method on port`)
    })
}
module.exports = routes