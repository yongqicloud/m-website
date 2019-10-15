
module.exports = {
    get(page_id) {
        return $.ajax({
            // 187162
            url : `/api/sound/soundalllist?albumid=${page_id}`
        })
    }
}