const albumView = require('../views/album.art');
const albumModel = require('../models/album');
class Album{

    async render(page_id){
        let result_album = await albumModel.get(page_id);
        result_album = result_album.info;

        console.log(result_album);
        let albumHTML = albumView({
            list : result_album
        }); 
        $('main .list-container .tab-content').html(albumHTML);
        this.bindEvent();
    }
    bindEvent(){
        $('.detail').on('tap',this.handleHash);
    }
    handleHash(e){
        e.preventDefault();
        console.log('监听事件');
        let data_id = $(this).attr('data-to')
        console.log(data_id);
        location.hash = 'details/' + data_id;
    }
}

export default new Album();