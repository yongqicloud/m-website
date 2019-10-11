module.exports = {
    get() {
        return $.ajax({
            url : `/api/sound/newhomepagedata`
        })
    }
}