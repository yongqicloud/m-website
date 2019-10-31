const catalogsView = require('../views/catalogs.art');
 
const catalogsModel = require('../models/catalogsModel')

class Catalogs{
    async render(page_id){
        // page_id = 5;
        let choosePageList = await catalogsModel.getDefault();
        let allDynamic = await catalogsModel.getAllDynamic(page_id);
        // console.log(allDynamic);
        // console.log(choosePageList);
        let info = choosePageList.info[5];
        // console.log(info.son);
        let indexArr = []
        for(let item in info.son){
            indexArr.push(item)
        }
        let infoArr = []
        for(let item in info.son){
            infoArr[item] = await catalogsModel.get(item);
        }
        let index = indexArr[0]
        let catalogsResult = await catalogsModel.get();
        let catalogsHTML = catalogsView({
            allDynamic : allDynamic.info,
            index : index,
            info : info,
            infoList : infoArr
        });
        $('main .list-container .tab-content').html(catalogsHTML);
        let view_num = document.querySelectorAll(".item.play-times");
        let comments_num = document.querySelectorAll(".item.duration");
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
        this.bindEvent();
    }
    bindEvent(){
        $('.detail').on('tap',this.handleHash);
    }
    handleHash(e){
        e.preventDefault();
        let data_id = $(this).attr('data-to');
        location.hash = 'details/' + data_id;
    }
}
export default new Catalogs();