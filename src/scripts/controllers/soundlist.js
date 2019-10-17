import album from './album';

const soundListView = require('../views/soundlist.art');
const soundListLoopView = require('../views/soundlistLoop.art');
const soundListModel = require('../models/soundList');
const BSscroll = require('better-scroll');
class Sound{
    constructor(){
        // this.render();
        this.pageNo = 0
        this.list = []
    }
    async render(page_id){
        let result = await soundListModel.get({
            pageNo : this.pageNo
        });
        result = JSON.parse(result);
        let albums = result.albums;
        this.list =  [...this.list,...albums];
        // let tab_content = document.querySelector('.tab-content');
        let soundHTML = soundListView({});
        let loopHTML = soundListLoopView({
            albums : this.list,
        })
        $('.list-container .tab-content').html(soundHTML);
        $('.sound-plate .panel-body').html(loopHTML);
        this.bindEvent();
        // new BSscroll.default('main',{});
    }
    bindEvent(){
        $('.Thumbnail').on('tap',this.handleHash);
        $('.btn-text.open-app').on('tap',this.loadMore.bind(this))
    }
    handleHash(e){
        e.preventDefault();
        let data_id = $(this).attr('data-to')
        location.hash = 'album/' + data_id;
    }
    loadMore(){
        this.pageNo ++;
        this.render();
    }
}
export default new Sound()