const detailsView = require('../views/details.art');
const detailsModels = require('../models/detailsModes');
const moment = require('moment');
moment.locale("zh-cn");
console.log(moment().format("YYYY"-'MM'-'SS'));
console.log(moment().format('ddd'));
console.log(moment.duration(360, 'minute')._data);
console.log(moment().seconds(0));
// moment().format(Date.now());
class Details{
    constructor(){
    }
    async render(page_id){
        // let num_id = '1374928';
        // let num_id = '1378249';
        // let num_id = '173143';
        let result_details = await detailsModels.get(page_id);
        result_details = result_details.info
        let html_str = result_details.sound.intro;
        // console.log(html_str);
        let result_dramaby  = await detailsModels.getDramaby(page_id);
        let result_soundlike = await detailsModels.getSoundLike(page_id);
        result_soundlike = result_soundlike.info
        console.log(result_soundlike);
        result_dramaby = result_dramaby.info;
        console.log(result_details)
        console.log(result_dramaby);
        let detailsHTML = detailsView({
            details : result_details,
            dramaby : result_dramaby,
            html : html_str,
            sound_like : result_soundlike
        });
        $('main .list-container .tab-content').html(detailsHTML);
        $('.intro').children('div').html(html_str);
        this.bindEvent();
    }
    bindEvent(){
        $('.btn-expand').on('tap',this.expend);
        $('#SoundPlayer').on('tap',this.showBar);
        $('.controller').on('touchend',this.videoPlay);
        $('.full').on('touchend',this.expandFull);
        $('video')[0].addEventListener("timeupdate",this.handelTime);
        
    }
    handelTime(){
        let currentTime = Math.floor($('video')[0].currentTime);
        let totalTime = Math.floor($('video')[0].duration)
        let rate =(currentTime / totalTime) * 100;
        // console.log(rate);
        $('.played').css({
            width : `${rate}%`
        })
            //用秒数来显示当前播放进度
            // timeDisplay = Math.floor($('video')[0].currentTime);
        $('.sound-time .played-time').html(currentTime)
        $('.sound-time .duration').html(totalTime)
            
    }
    expend(evt){
        evt.preventDefault()
        $(this).parent().toggleClass('expand');
    }
    showBar(evt){
        evt.stopPropagation()
        $('.controller').toggleClass('up');
        $('.danmaku-send').toggleClass('show');
    }
    videoPlay(evt){
        evt.stopPropagation()
        let video = $('video')[0];
        $('.video').children('.cover').css({
            display : 'none'
        })
        if(video.paused){
            video.play();
            $(this).children('.btn-icon').removeClass('btn-play').addClass('btn-pause')
        }else{
            video.pause();
            $(this).children('.btn-icon').removeClass('btn-pause').addClass('btn-play')
        }
    }
    expandFull(evt){
        evt.stopPropagation();
        let video = $('video')[0];
        if (!document.webkitIsFullScreen) {
            video.webkitRequestFullScreen() //全屏
            // $(this).removeClass('icon-expand').addClass('icon-contract')
        } else {
            document.webkitCancelFullScreen() //退出全屏
            // $(this).removeClass('icon-contract').addClass('icon-expand')
        }
    }
    
}
export default new Details();