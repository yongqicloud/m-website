const layoutView = require('../views/layout.art');



class Index{
    constructor(){
        this.render();
    }
    bindClick(){
        location.hash = $(this).attr('data-to');
    }
    render(){
        const html = layoutView();
        document.querySelector('#root').innerHTML = html ;
        // 绑定路由事件
        $('.tab').on('click',this.bindClick);
    }
}
export default new Index()