module.exports = {
    get() {
        return $.ajax({
            dataType : 'json',
            url : `/api/mobileWeb/albumList`
        })
    }
}