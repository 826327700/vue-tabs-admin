import VueRouter from 'vue-router'
import Vue from 'vue'
import common from './common'
import nav1 from './nav1'
import nav2 from './nav2'
import nav3 from './nav3'
import store from '../vuex/store'

Vue.use(VueRouter)

let routes=common.concat(nav1).concat(nav2).concat(nav3)
const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    
    //关闭首屏loading
    let layer=document.getElementsByClassName('loading-layer')[0];
    if(layer){
        layer.remove()
    }
    
    //检测缓存页面
    let pageTags=JSON.parse(localStorage.getItem('pageTags'))||[]
    let includeArr=[]
    pageTags.forEach(item => {
        let tag={
            name:item.name,
            isActive:true,
            closable:true,
            component:item.component,
            url:item.url,
        }
        store.dispatch('pushPageTags',tag)
        if(item.component){
            includeArr.push(item.component)
        }
    });
    store.dispatch('pushCachePage',includeArr)
    //添加页面tags
    if(to.matched.length>1){
        let tag={
            name:to.name,
            isActive:true,
            closable:true,
            component:to.meta.name,
            url:to.fullPath,
        }
        store.dispatch('pushPageTags',tag)
    }else if(to.matched.length==1){
        let tag={
            name:to.name,
            isActive:true,
            closable:true,
            component:to.meta.name,
            url:to.fullPath,
        }
        store.dispatch('pushPageTags',tag)
    }
    next()
    //重复打开页面以刷新页面
    if(store.state.cachePage.exclude.length>0&&store.state.cachePage.exclude.includes(to.meta.name)){
        store.state.cachePage.exclude.splice(store.state.cachePage.exclude.indexOf(to.meta.name),1)
        next({ path: '/' })
        setTimeout(()=>{
            next({ path: to.path })
        },10)
    }
})

router.afterEach((to, from, next) => {
    
})

export default router