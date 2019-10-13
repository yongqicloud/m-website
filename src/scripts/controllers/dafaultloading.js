const defaultloadingView = require('../views/defaultloading.art');
class Loading{
    render(str){
        console.log(str);
        console.log($('main .list-container .tab-content'));
        let loadingHTML = defaultloadingView({});
        if(str === 'details'){
            $('main .list-container .tab-list').css({
                display : 'none!important'
            })
            // $('main').html(loadingHTML);
        }else{
            $('main .list-container .tab-list').css({
                display : 'flex!important'
            })
            // $('main').html(loadingHTML);

        }
        $('main .list-container .tab-content').html(loadingHTML);
        
    }
}
export default new Loading();