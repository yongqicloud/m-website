const searchResView = require('../views/searchRes.art');
const searchResModel = require('../models/searchResModel');
class SearchRes{
    async render(value){
        console.log(value);
        let topResult = await searchResModel.getinputVal(value)
        let allResult = await searchResModel.getsearch({
            value
        })
        console.log(topResult);
        console.log(allResult);
        let searchResHTML = searchResView({
            topList : topResult.info,
            allList : allResult.info
        });
        
        $('main .list-container .tab-content').html(searchResHTML)
        this.bindEvent()
    }
    bindEvent(){
        $('.detail').on('tap',this.handleHash);
        $('.Thumbnail.list-drama').on('tap',this.handleDramaHash);
    }
    handleHash(e){
        e.preventDefault();
        let data_id = $(this).attr('data-to');
        location.hash = 'details/' + data_id;
    }
    handleDramaHash(e){
        e.preventDefault();
        let data_id = $(this).attr('data-to');
        location.hash = 'dramas/' + data_id;
    }
}
export default new SearchRes();