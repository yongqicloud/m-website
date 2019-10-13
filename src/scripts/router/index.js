// 加载layout
import indexController from '../controllers';
// 默认加载loading页面
import defaultloadingController from '../controllers/dafaultloading'
// console.log(defaultloadingController);
// 加载router页面
import soundListControllor from '../controllers/soundlist';
import positionControllor from '../controllers/position';
import classificationControllor from '../controllers/classification';

import searchControllor from '../controllers/search';
import datailsControllor from '../controllers/details';
// datailsControllor.render();

class Router{
    constructor(){
        this.render();
    }
    render(){
        window.addEventListener('load',this.handlePageload.bind(this));
        window.addEventListener('hashchange',this.handleHashchange.bind(this));
    }
    renderDOM(hash){
        let pageControllers = {
            soundListControllor,
            positionControllor,
            classificationControllor,
            searchControllor
        }
        pageControllers[hash+'Controllor'].render();
    }
    handlePageload(){
        let hash = location.hash.slice(1) || 'position';
        location.hash = hash;
        this.renderDOM(hash);
        this.setActiveClass(hash);
    }
    handleHashchange(e){
        
        defaultloadingController.render();
        let hash = location.hash.slice(1);
        console.log(hash);
        this.renderDOM(hash);
        this.setActiveClass(hash);
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