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
        console.log(result_sound);
        let result_banner = result_info.info.banner;
        // console.log(result_list,result_comic,result_sound,result_banner);
        let positionLoopHtml = positionLoopView({
            list  : result_list,
            comic : result_comic,
            sound : result_sound,
            banner : result_banner,
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
        console.log('监听事件开启')
        $('.Thumbnail').on('tap',this.handleHash)
    }
    handleHash(e){
        e.preventDefault();
        console.log($(this).attr('data-to'));
        let data_id = $(this).attr('data-to')
        location.hash = 'details/' + data_id;
        console.log('监听事件结束')
    }
    
}
export default new Position()