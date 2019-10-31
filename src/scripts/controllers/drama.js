const dramaView = require('../views/drama.art')
const dramaModel = require('../models/dramaModel')
class Drama{
    async render(page_id){
        // let page_id = 1910
        let dramaResult = await dramaModel.get(page_id); 
        let insertHTML = dramaResult.info.drama.abstract
        let dramaHTML = dramaView({
            list : dramaResult.info
        })
        $('main .list-container .tab-content').html(dramaHTML)
        $('.intro-content').html(insertHTML)
    }
    bindEvent(){
        
    }
    handleHash(e){
        e.preventDefault();
        let data_id = $(this).attr('data-to')
        location.hash = 'dramas/' + data_id;
    }
}
export default new Drama()