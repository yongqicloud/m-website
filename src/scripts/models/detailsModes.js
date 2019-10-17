module.exports = {
    get(num_id) {
        return $.ajax({
            dataType : 'json',
            url : `/api/sound/getsound?soundid=${num_id}`
        })
    },
    getDramaby(num_id){
        return $.ajax({
            dataType : 'json',
            url : `/api/dramaapi/getdramabysound?sound_id=${num_id}`
        })
    },
    getSoundLike(num_id){
        return $.ajax({
            dataType : 'json',
            url : `/api/sound/getsoundlike?type=15&sound_id=${num_id}`
        })
    },
    getSortedImage(num_id){
        return $.ajax({
            dataType : 'json',
            url : `/api/sound/getSortedImage?soundid=${num_id}`
        })
    }
}