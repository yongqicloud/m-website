const positionView = require('../views/position.art');
const positionLoopView = require('../views/position-loop.art');
const positionListModel = require('../models/positionList');
const positionComicModel = require('../models/positionComic');
const BScroll = require('better-scroll');
import {RunSwiper} from './swiper';

class Position{
    constructor(){
        // this.render();
    }
    async renderLoop(){
        // 加载框架
        let result_list = await positionListModel.get();
        // 加载首页数据
        let result_info = await positionComicModel.get();
        result_list = JSON.parse(result_list);
        result_list = result_list.music;
        result_info = JSON.parse(result_info);

        let result_comic = result_info.info.channel;
        let result_sound = result_info.info.sound;
        let result_banner = result_info.info.banner;
        // console.log(result_list,result_comic,result_sound,result_banner);
        let urlArr = []
        let reg =  /\/(\d+)$/
        result_banner.forEach((item) => {
            urlArr.push(~~item.url.match(reg)[1])
        })
        let positionLoopHtml = positionLoopView({
            list  : result_list,
            comic : result_comic,
            sound : result_sound,
            banner : result_banner,
            urlArr : urlArr
        })
        // console.log($('tab-content')[0]);
        $('.list-container .tab-content').html(positionLoopHtml);
        let view_num = document.querySelectorAll(".play-times");
        let comments_num = document.querySelectorAll(".comments");
        view_num.forEach((item)=>{
            let num = Number(item.innerHTML) ;
            num = num > 9999 ? (num/10000).toFixed(1)+'万':num
            item.innerHTML = num
        });
        comments_num.forEach((item)=>{
            let num = Number(item.innerHTML);
            num = num > 9999 ? (num/10000).toFixed(1)+'万':num
            item.innerHTML = num;
        })
        
        
        // 加载异步数据后加载轮播
        new RunSwiper()
        this.bindEvent();
    }
    render(){
        // 加载position路由结构
        // let positionHtml = positionView({});
        // $('main').html(positionHtml);
        // 加载请求的数据
        this.renderLoop();
        // better-scroll;
        // new BScroll.default('main',{});
    }
    bindEvent(){
        $('.Thumbnail.comic-box').on('tap',this.handleHash);
        $('.banner-link').on('tap',this.handleHash);
        $('.Thumbnail.set-auto').on('tap',this.handlChanneleHash)
        $('.list-link').on('tap',this.handleListHash);
        $('.channel-link').on('tap',this.handleListHash);
        $('.leaderboard').on('tap',this.handleRankHash);
    }
    handleHash(e){
        e.preventDefault();
        let data_id = $(this).attr('data-to')
        location.hash = 'details/' + data_id;
    }
    handlChanneleHash(e){
        e.preventDefault();
        let data_id = $(this).attr('data-to')
        location.hash = 'channel/' + data_id;
    }
    handleListHash(e){
        e.preventDefault();
        let data_id = $(this).attr('data-to');
        location.hash = 'catalogs/' + data_id;
    }
    handleRankHash(e){
        e.preventDefault();
        location.hash = 'rank/' 
    }
}
export default new Position()