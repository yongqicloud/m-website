import indexController from '../controllers';   //加载layout
import defaultloadingController from '../controllers/dafaultloading'    //默认加载loading页面
// 加载router页面
import soundListControllor from '../controllers/soundlist';
import positionControllor from '../controllers/position';  //主页
import classificationControllor from '../controllers/classification';
import searchControllor from '../controllers/search'; //搜索
import detailsControllor from '../controllers/details'; //详情页
import albumControllor from '../controllers/album';  //戏剧列表
import channelControllor from '../controllers/channel'; //广播
import catalogsControllor from '../controllers/catalogs' // 展示更多

class Router{
    constructor(){
        this.render();
    }
    render(){
        // console.log($('main .list-container .tab-content'));
        window.addEventListener('load',this.handlePageload.bind(this));
        window.addEventListener('hashchange',this.handleHashchange.bind(this));
    }
    renderDOM(hash,page_id){
        // if(hash === 'details'){
        //     $('main .list-container .tab-list').css({
        //         display : 'none!important'
        //     })
        // }else{
        //     $('main .list-container .tab-list').css({
        //         display : 'flex!important'
        //     })
        // }
        // defaultloadingController.render(hash);
        let pageControllers = {
            soundListControllor,
            positionControllor,
            classificationControllor,
            searchControllor,
            detailsControllor,
            albumControllor,
            channelControllor,
            catalogsControllor
        }
        pageControllers[hash+'Controllor'].render(page_id);
    }
    handlePageload(){
        let hash = location.hash.slice(1) || 'position';
        location.hash = hash;
        let str = hash.split('/')
        defaultloadingController.render(str[0]);
        this.renderDOM(str[0],str[1]);
        this.setActiveClass(str[0]);
    }
    handleHashchange(e){
        
        let hash = location.hash.slice(1);
        // let reg = new RegExp('^(\\w+)','g');
        let str = hash.split('/')
        console.log(str);
        // let path = reg.exec(hash);
        
        // console.log(path);
        
        defaultloadingController.render(str[0]);
        this.renderDOM(str[0],str[1]);
        this.setActiveClass(str[0],str[1]);
    }
    setActiveClass(hash){
        if(hash === 'search'){
            $('header').addClass('Search')
            $('.tab-list').css({
                display : 'none'
            })
        }else{
            $('header').removeClass('Search');
            $('.tab-list').css({
                display : 'flex'
            })
        }
        $(`.tab[data-to=${hash}]`).addClass('active').siblings().removeClass('active');
        $(`.tab[data-to=${hash}]`).addClass('set-bgcolor').siblings().removeClass('set-bgcolor');
        
    }
}
new Router();