import album from './album';

const defaultloadingView = require('../views/defaultloading.art');
class Loading{
    render(str){
        console.log(str);
        // console.log($('main .list-container .tab-content'));
        let loadingHTML = defaultloadingView({});
        if(str === 'details' || str === 'album' || str === 'search' || str === 'channel' || str ==='searchRes'|| str === 'dramas' ){
            $('main .list-container .tab-list').css({
                display : 'none!important'
            })
            $('footer').css({
                display : 'flex!important'
            })
        }else if( str === 'catalogs' || str === 'rank'){
            $('main .list-container .tab-list').css({
                display : 'none!important'
            })
            $('footer').css({
                display : 'none!important'
            })
        }
        else{
            $('main .list-container .tab-list').css({
                display : 'flex!important'
            })
            $('footer').css({
                display : 'flex!important'
            })
        };
        $('main .list-container .tab-content').html(loadingHTML);
    }
}
export default new Loading();