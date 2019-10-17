module.exports = {
    getDefault(){
        return $.ajax({
            dataType : 'json',
            url : `/api/mobileWeb/catalogs`  
        })
    },
    getAllDynamic(page_id = 5){
        return $.ajax({
            dataType : 'json',
            url : `/api/mobileWeb/catalogrank?cid=${page_id}`
        })
    },
    get(page_id){
        return $.ajax({
            dataType : 'json',
            url : `/api/mobileWeb/catalogmenu?order=3&cid=${page_id}&page_size=4` 
        })
    },
}