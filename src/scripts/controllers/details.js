const detailsView = require('../views/details.art');
const detailsModels = require('../models/detailsModes');
const _ = require('lodash');
const moment = require('moment');
moment.locale("zh-cn");

// console.log(moment().format("YYYY"-'MM'-'SS'));
// console.log(moment().format('ddd'));
// console.log(moment.duration(360, 'minute')._data);
// console.log(moment().seconds(0));
// moment().format(Date.now());
class Details{
    constructor(){
        this.$player = $('video')[0] || $('audio')[0];
        this.currentTime = 0;
        this.duration = 0;
    }
    async render(page_id){
        let result_details = await detailsModels.get(page_id);
        let result_dramaby  = await detailsModels.getDramaby(page_id);
        let result_soundlike = await detailsModels.getSoundLike(page_id);
        result_details = result_details.info;
        result_soundlike = result_soundlike.info;
        result_dramaby = result_dramaby.success === true ? result_dramaby.info :null
        let html_str = result_details.sound.intro;
        // console.log(html_str);
        // console.log(result_soundlike);
        // console.log(result_details)
        // console.log(result_dramaby);
        let detailsHTML = detailsView({
            details : result_details,
            dramaby : result_dramaby,
            html : html_str,
            sound_like : result_soundlike
        });
        $('main .list-container .tab-content').html(detailsHTML);
        // 渲染
        $('.intro').children('div').html(html_str);
        // 时间格式化
        let date_str = $('.publish-time').html();
        let reg = /(\d+)$/g
        let result = reg.exec(date_str);
        let time = result[1];
        let days = moment.unix(time);
        let dateObj = {
            year : days.format('YYYY'),
            month : days.format('MM'),
            day : days.format('DD'),
            hour : days.format('HH'),
            minute : days.format('mm'),
        }
        let tolTime = Number($('span.duration').html()) 
        tolTime = moment.unix(tolTime);
        let tolTimeObj = {
            minute : tolTime.format('mm'),
            second : tolTime.format('ss')
        }
        $('span.duration').html(`${tolTimeObj.minute}:${tolTimeObj.second}`)

        $('.publish-time').html(`发布于:${dateObj.year}/${dateObj.month}/${dateObj.day} ${dateObj.hour}:${dateObj.minute}`);
        this.bindEvent();
    }
    async loadImage(page_id){
        console.log(this.$player);
        console.log(this.currentTime,this.duration);
        let result_sortedImage = await detailsModels.getSortedImage(page_id)
        console.log(result_sortedImage);
        // 判断信息是否存在
        if(result_sortedImage.success = true && result_sortedImage.info.length >= 1){
            result_sortedImage.info.forEach((item,index) => {
                setTimeout(() => {
                    // console.log(item.front_cover);
                }, 300);
            });
            console.log(result_sortedImage);
        }
        
    }
    bindEvent(page_id){
        this.$player = $('video')[0] || $('audio')[0];
        this.currentTime = this.$player.currentTime;
        this.duration = this.$player.duration;
        let $player = $('video')[0] || $('audio')[0];
        $('.btn-expand').on('tap',this.expend);
        $('#SoundPlayer').on('tap',this.showBar);
        $('.controller').on('touchend',{page_id:page_id},this.videoPlay);
        $('.full').on('touchend',this.expandFull);
        $player.addEventListener("timeupdate",this.handelTime);
        $('.thumb.draggable').on('touchstart',this.draggle)
    }
    draggle(e){
        let clientWidth = window.innerWidth;
        let $player = $('video')[0] || $('audio')[0];
        let $progessBar = $('.played');
        let duration = $player.duration;
        $(this).on('touchmove',_.throttle( function(evt){
            let pageX = evt.changedTouches[0].pageX;
            let rate = pageX / clientWidth;
            $progessBar.css({
                width : rate * clientWidth
            })
            $player.currentTime = parseInt(rate * duration);
        },150));
        
    }
    draggleMove(){
    }
    handelTime(){
        let $player = $('video')[0] || $('audio')[0];
        let currentTime = Math.floor($player.currentTime);
        let totalTime = Math.floor($player.duration)
        let dateCurr = moment.unix(currentTime);
        let dateTol = moment.unix(totalTime);
        let currArr = {
            minute : dateCurr.format('mm'),
            second : dateCurr.format('ss')
        }
        let tolArr = {
            minute : dateTol.format('mm'),
            second : dateTol.format('ss')
        }
        let rate_time =(currentTime / totalTime) * 100;
        let buffered = $player.buffered.end(0);
        let rate_buffer = (buffered / totalTime) * 100;
        $('.played').css({
            width : `${rate_time}%`
        })
        $('.loaded').css({
            width : `${rate_buffer}%`
        })
        $('.sound-time .played-time').html(`${currArr.minute}:${currArr.second}`)
        $('.sound-time .duration').html(`${tolArr.minute}:${tolArr.minute}`)
            
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
        let $player = $('video')[0] || $('audio')[0];
        if($player.tagName === 'VIDEO'){
            $('.video').children('.cover').css({
                display : 'none'
            })
        }else if($player.tagName === 'AUDIO'){
            console.log('这是音频标签');
        }
        if($player.paused){
            $player.play();
            $(this).children('.btn-icon').removeClass('btn-play').addClass('btn-pause')
        }else{
            $player.pause();
            $(this).children('.btn-icon').removeClass('btn-pause').addClass('btn-play')
        }
        // this.loadImage(evt.data.page_id)
    }
    expandFull(evt){
        evt.stopPropagation();
        let video = $('video')[0] || $('audio')[0];
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