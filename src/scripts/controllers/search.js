const searchView = require('../views/search.art');
const hotsearchModel = require('../models/hotsearch');
const inputWordsListModel = require('../views/inputWordsList.art');
const _ = require('lodash');
class Search{
    constructor(){
        this.lock = true;
    }
    async render(){
        let resultHotWords = await hotsearchModel.get()
        resultHotWords = JSON.parse(resultHotWords)
        let searchHTML = searchView({
            list : resultHotWords.info
        })
        $('main .list-container .tab-content').html(searchHTML);
        this.bindEvent();
    }
    bindEvent(){
        $('input').on('input',_.debounce(this.searchInput.bind(this),300))
        $('.search-tag').on('tap',this.handlHotWordseHash)
    }
    async searchInput(evt){
        let {target} = evt;
        let input_value = $(target).val();
        if(input_value === ''){
            $('.suggest-keyword').remove();
        }else{
            let resultInputWords = await hotsearchModel.search(input_value);
            resultInputWords = resultInputWords.info
            if(resultInputWords instanceof Array){
                let inputWordsHTML = inputWordsListModel({
                    keywords : input_value,
                    suggestWords : resultInputWords
                })
                $(inputWordsHTML).appendTo('header')
                $('.suggest-item').on('tap',this.handleHash)
                
            }
        }
    }
    handleHash(){
        let input_val = $(this).children('.item-content').html()
        $('.suggest-keyword').remove();
        location.hash = 'searchRes/' + input_val;
    }
    handlHotWordseHash(){
        let input_val = $(this).html()
        location.hash = 'searchRes/' + input_val;
    }
}
export default new Search();