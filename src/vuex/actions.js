
//修改pageTags
export const pushPageTags = ({commit},item) => {
    commit('PUSHPAGETAGS',item)
}
//删除pageTags
export const deletePageTags = ({commit},index) => {
    commit('DELETEPAGETAGS',index)
}
//更新pageTags
export const updatePageTags = ({commit},arr) => {
    commit('UPDATEPAGETAGS',arr)
}
//排除缓存页面
export const excludeCachePage = ({commit},arr) => {
    commit('EXCLUDECACHEPAGE',arr)
}
//添加缓存页面
export const pushCachePage = ({commit},arr) => {
    commit('PUSHCACHEPAGE',arr)
}
//修改菜单打开关闭状态
export const changeMenu = ({commit},status) => {
    commit('CHANGEMENU',status)
}