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
    },
    getinputVal(input_val){
        return $.ajax({
            url : `/api/dramaapi/search?s=${input_val}&p=1`
        })
    }
}