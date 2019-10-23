
module.exports = {
    get(page_id) {
        return $.ajax({
            url : `/api/dramaapi/getdrama?drama_id=${page_id}`
        })
    }
}