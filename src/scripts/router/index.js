// 加载layout
import indexController from '../controllers';
// 默认加载loading页面
import defaultloadingController from '../controllers/dafaultloading'
// console.log(defaultloadingController);
// 加载router页面
import soundListControllor from '../controllers/soundlist';
import positionControllor from '../controllers/position';
import classificationControllor from '../controllers/classification';

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
            classificationControllor
        }
        pageControllers[hash+'Controllor'].render();
        
    }
    handlePageload(){
        let hash = location.hash.slice(1) || 'position';
        indexController.render();
        location.hash = hash;
        this.renderDOM(hash);
        this.setActiveClass(hash);
    }
    handleHashchange(e){
        defaultloadingController.render();
        let hash = location.hash.slice(1);
        // console.log(hash);
        this.renderDOM(hash);
        this.setActiveClass(hash);

    }
    setActiveClass(hash){
        $(`.tab[data-to=${hash}]`).addClass('active').siblings().removeClass('active');
        
    }
}
new Router();
// defaultloadingController.render();