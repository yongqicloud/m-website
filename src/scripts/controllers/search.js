const searchView = require('../views/search.art');
const hotsearchModel = require('../models/hotsearch');
const inputWordsListModel = require('../views/inputWordsList.art');
// 节流
function throttling(fn) {
    let canRun = true; // 标记
    return function () {
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun = false; // 开始节流
        setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
            // 对要节流的函数进行操作;
            fn.apply(this, arguments);
            canRun = true; // 节流结束
        }, 500);
    };
}
// 去抖
function antiShake(fn) {
    let timeout = null; // 创建一个标记用来存放定时器的返回值
    return function () {
        clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
            fn.apply(this, arguments);
        }, 500);
    };
}
class Search{
    constructor(){
        this.lock = true;
    }
    async render(){
        let resultHotWords = await hotsearchModel.get();
        
        resultHotWords = JSON.parse(resultHotWords);
        // console.log(resultHotWords);
        let searchHTML = searchView({
            list : resultHotWords.info
        });
        $('.tab-content').html(searchHTML);
        this.bindEvent();
    }
    bindEvent(){
        $('input').on('input',antiShake(this.searchInput))
    }
    async searchInput(){
        let input_value = $('input').val();
        console.log(input_value);
        if(input_value === ''){
            console.log('移除成功');
            $('.suggest-keyword').remove();
        }else{
            let resultInputWords = await hotsearchModel.search(input_value);
            resultInputWords = resultInputWords.info
            // console.log(resultInputWords);
            if(resultInputWords instanceof Array){
                let inputWordsHTML = inputWordsListModel({
                    keywords : input_value,
                    suggestWords : resultInputWords
                })
                $(inputWordsHTML).appendTo('header')
            }
            
        }
        
    }
}
export default new Search();