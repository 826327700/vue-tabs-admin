import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import router from '@/routers/index.js'

Vue.use(Vuex)

// 应用初始状态
const state = {
    menuCollapsed: false,
    pageTags:[{
        name:'首页',
        isActive:false,
        closable:false,
        url:'/',
    }],
    cachePage:{
        include:[],
        exclude:[],
    }
}

// 定义所需的 mutations
const mutations = {
    //更改左侧菜单打开关闭状态
    CHANGEMENU(state,status){
        state.menuCollapsed=status
    },
    //添加页面标签选项卡
    PUSHPAGETAGS(state,item) {
        let has=false
        if(!state.pageTags){
            return false
        }
        state.pageTags.forEach(tag => {
            tag.isActive=false
            if(tag.url==item.url){
                has=true
                tag.isActive=true
            }
        });
        if(!has){
            state.pageTags.push(item)
            console.log(item)
        }
        //console.log(state.pageTags)
        localStorage.setItem('pageTags',JSON.stringify(state.pageTags))
    },
    //删除页面标签选项卡
    DELETEPAGETAGS(state,index) {
        state.pageTags.splice(index, 1);
        localStorage.setItem('pageTags',JSON.stringify(state.pageTags))
        navigation(state.pageTags,index,router)
    },
    //更新页面标签选项卡
    UPDATEPAGETAGS(state,arr) {
        let defaultPage=false
        let hasActive=false
        arr.forEach((item)=>{
            if(item.name=='首页'){
                defaultPage=true
            }
            if(item.isActive){
                hasActive=true
            }
        })
        if(!defaultPage){
            arr.unshift({
                name:'首页',
                isActive:false,
                closable:false,
                url:'/',
            })
        }
        if(!hasActive){
            arr[arr.length-1].isActive=true
        }
        state.pageTags=arr
        localStorage.setItem('pageTags',JSON.stringify(state.pageTags))
        router.push(arr[arr.length-1].url)
    },
    //添加缓存的页面
    PUSHCACHEPAGE(state,arr){
        state.cachePage.include=arr
    },
    //排除缓存的页面
    EXCLUDECACHEPAGE(state,arr){
        state.cachePage.exclude=arr
    }
}

let navigation=(pageTags,index,router)=>{
    if(pageTags.length==1){
        router.push('/')
     }else{
        pageTags[index-1].isActive=true
        router.push(pageTags[index-1].url)
     }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})