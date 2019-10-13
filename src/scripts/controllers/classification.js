const classificationView = require('../views/classification.art');
const classificationModel = require('../models/classificationlist');

class Classification{
    async render(){
           
        let result = await classificationModel.get();
        let classificationHTML = classificationView({
            list : result.info
        });
        console.log(result.info);
        $('.list-container .tab-content').html(classificationHTML);
    }
}
export default new Classification();