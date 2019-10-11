module.exports = {
    get({pageNo = 0}) {
        return $.ajax({
            url : `/api/explore/tagalbum?order=${pageNo}`
        })
    }
}