const soundListView = require('../views/soundlist.art');
const soundListModel = require('../models/soundList');
const BSscroll = require('better-scroll');
class Sound{
    constructor(){
        // this.render();
    }
    async render(page_id){
        let result = await soundListModel.get({
            pageNo : page_id
        });
        result = JSON.parse(result);
        let albums = result.albums;
        // console.log(albums);
        // let tab_content = document.querySelector('.tab-content');

        let soundHTML = soundListView({
            albums : albums,
        });
        $('.list-container .tab-content').html(soundHTML);
        this.bindEvent();
        // tab_content.innerHTML = html;
        // new BSscroll.default('main',{});
    }
    bindEvent(){
        $('.Thumbnail').on('tap',this.handleHash);
    }
    handleHash(e){
        e.preventDefault();
        console.log('监听事件');
        let data_id = $(this).attr('data-to')
        console.log(data_id);
        location.hash = 'album/' + data_id;
    }
}
export default new Sound()