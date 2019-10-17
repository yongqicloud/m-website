module.exports = {
    get(page_id) {
        return $.ajax({
            dataType : 'json',
            url : `/api/mobileWeb/getchanneldetail?&order=3&channel_id=${page_id}`
        })
    }
}