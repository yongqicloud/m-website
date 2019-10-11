export class RunSwiper{
    constructor(){
        this.render();
    }
    render(){
        let mySwiper = new Swiper('.swiper-container',{
            autoplay : {
                stopOnlastslide : true
            },
            pagination:{
                el:'.swiper-pagination',
                clickable:true
            }
        })
        console.log('swiper加载成功');
    }
};
export default RunSwiper;
