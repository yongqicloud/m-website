const channelView = require('../views/channel.art');
const channelModel = require('../models/channelModel');
class Channel{
    async render(page_id){
        // let page_id = 16416;
        let channelResult = await channelModel.get(page_id);
        channelResult =channelResult.success === true ? channelResult.info : null;
        let channelHTML =channelView({
            list : channelResult
        });
        $('main .list-container .tab-content').html(channelHTML);
        console.log(channelResult);
        this.bindEvent();
    }
    bindEvent(){
        $('.detail').on('tap',this.handleHash);
    }
    handleHash(e){
        e.preventDefault();
        let data_id = $(this).attr('data-to');
        location.hash = 'details/' + data_id;
    }
}

export default new Channel();