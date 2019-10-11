module.exports = {
    get() {
        return $.ajax({
            url : `/api/mobileWeb/catalogroot`
        })
    }
}