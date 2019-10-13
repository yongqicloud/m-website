const detailsView = require('../views/details.art');
const detailsModels = require('../models/detailsModes');

class Details{

    async render(){
        // let num_id = '1374928';
        let num_id = '1378249';
        // let num_id = '173143';

        let result_details = await detailsModels.get(num_id);
        result_details = result_details.info
        let html_str = result_details.sound.intro;
        console.log(html_str);
        let result_dramaby  = await detailsModels.getDramaby(num_id);
        let result_soundlike = await detailsModels.getSoundLike(num_id);
        result_soundlike = result_soundlike.info
        console.log(result_soundlike);
        result_dramaby = result_dramaby.info;
        console.log(result_details)
        console.log(result_dramaby);
        // console.log(to);
        let detailsHTML = detailsView({
            details : result_details,
            dramaby : result_dramaby,
            html : html_str,
            sound_like : result_soundlike
        });
        $('main').html(detailsHTML);
        $('.intro').children('div').html(html_str);
        // console.log(html_str.slice(1,html_str.length - 1));
        this.bindEvent();
    }
    bindEvent(){
        $('.btn-expand').on('tap',this.expend)
    }
    expend(){
        $(this).parent().toggleClass('expand');
    }
}
export default new Details();