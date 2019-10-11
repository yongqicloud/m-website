const soundListView = require('../views/soundlist.art');
const soundListModel = require('../models/soundList');
const BSscroll = require('better-scroll');
class Sound{
    constructor(){
        // this.render();
        this.pageNo = 2;
    }
    async render(){
        let result = await soundListModel.get({
            pageNo : this.pageNo
        });
        result = JSON.parse(result);
        let albums = result.albums;
        // console.log(albums);
        // let tab_content = document.querySelector('.tab-content');

        let soundHTML = soundListView({
            albums : albums,
        });
        $('.tab-content').html(soundHTML)
        // tab_content.innerHTML = html;
        // new BSscroll.default('main',{});
    }

}
export default new Sound()