const classificationView = require('../views/classification.art');
const classificationModel = require('../models/classificationlist');

class Classification{
    async render(){
           
        let result = await classificationModel.get();
        let classificationHTML = classificationView({
            list : result.info
        });
        $('.list-container .tab-content').html(classificationHTML);
        this.bindEvent()
    }
    bindEvent(){
        $('.catalog').on('tap',this.handleHash);
    }
    handleHash(e){
        e.preventDefault();
        let data_id = $(this).attr('data-to');
        location.hash = 'catalogs/' + data_id;
    }
}
export default new Classification();