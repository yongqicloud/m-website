const defaultloadingView = require('../views/defaultloading.art');
class Loading{
    render(){
        let loadingHTML = defaultloadingView({});
        $('.tab-content').html(loadingHTML);
    }
}
export default new Loading();