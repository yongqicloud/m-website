const rankView = require('../views/rank.art');
const rankModel = require('../models/rankModel');

class Rank{
    async render(){
        let rankResult = await rankModel.get();
        rankResult = rankResult.info
        console.log(rankResult);
        let rankHTML = rankView({
            rank : rankResult
        });
        $('main .list-container .tab-content').html(rankHTML);
        this.bindEvent();
    }
    
    bindEvent(){
        $('.rank-part').on('tap',this.handleHash);
    }
    handleHash(e){
        e.preventDefault();
        let data_id = $(this).attr('data-to')
        location.hash = 'album/' + data_id;
    }
}
export default new Rank();