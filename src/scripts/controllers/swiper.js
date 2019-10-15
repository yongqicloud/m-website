export class RunSwiper{
    constructor(){
        this.render();
    }
    render(){
        let mySwiper = new Swiper('.swiper-container',{
            loop : true,
            autoplay : {
                stopOnlastslide : true
            },
            pagination:{
                el:'.swiper-pagination',
                clickable:true
            }
        })
    }
};
export default RunSwiper;
