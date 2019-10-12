const layoutView = require('../views/layout.art');



class Index{
    constructor(){
        this.render();
    }
    bindClick(evt){
        let e = evt || event;
        e.stopPropagation();

        location.hash = $(this).attr('data-to');
    }
    backHistory(){
        window.history.go(-1)
    }
    showMenu(){
        let left = parseInt($('#UserBar').css('left'));
        if(left === 0){
            $('#UserBar').css({
                left : '100%'
            })
            console.log(111);
        }else{
            $('#UserBar').css({
                left : 0
            })
        }
    }
    render(){
        const html = layoutView();
        $('#root').html(html)
        // 绑定路由事件
        $('.tab').on('click',this.bindClick);
        $('.search').on('click',this.bindClick)
        $('.btn-text').on('click',this.backHistory)
        // DOM事件
        $('.menu').on('click',this.showMenu)
    }
}
export default new Index()