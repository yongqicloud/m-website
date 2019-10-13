module.exports = {
    get(num_id) {
        return $.ajax({
            url : `/api/sound/getsound?soundid=${num_id}`
        })
    },
    getDramaby(num_id){
        return $.ajax({
            url : `/api/dramaapi/getdramabysound?sound_id=${num_id}`
        })
    },
    getSoundLike(num_id){
        return $.ajax({
            url : `/api/sound/getsoundlike?type=15&sound_id=${num_id}`
        })
    },
    // getSoundLike(num_id){
    //     return $.ajax({
    //         url : `/api/dramaapi/getdramabysound?sound_id=${num_id}`
    //     })
    // }
}