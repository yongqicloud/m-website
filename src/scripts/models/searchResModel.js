module.exports = {
    getinputVal(input_val){
        return $.ajax({
            url : `/api/dramaapi/search?s=${input_val}&p=1`
        })
    },
    getsearch({value,type = 3,page_size=10,p = 1}){
        return $.ajax({
            url : `/api/sound/getsearch?s=${value}&type=${type}&page_size=${page_size}&p=${p}`
        })
    }
    
}