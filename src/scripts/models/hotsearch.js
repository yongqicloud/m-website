module.exports = {
    get() {
        return $.ajax({
            url : `/api/mobileWeb/hotsearch`
        })
    },
    search(value){
        return $.ajax({
            url : `/api/sound/suggest?s=${value}`
        })
    }
}