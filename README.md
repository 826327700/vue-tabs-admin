# vue-tabs-admin
基于vue2.x+element-ui的模仿浏览器标签页的后台管理模板
A Vue-admin-template imitate browser Label Page for Vue2.x &amp; element-ui

预览地址：[demo](https://826327700.github.io/vue-tabs-admin/dist)

### 使用
```
git clone https://github.com/826327700/vue-tabs-admin.git

cd vue-tabs-admin

npm install

npm run dev

npm run build
```
### 说明
1.修改打包路径支持file文件协议直接打开index.html，无需服务器
2.改用异步加载路由组件
3.根据菜单拆分路由定义文件，更加细化
4.根据路由配置自动生成左侧菜单列表
5.根据打开的页面自动生成对应的面包屑导航
6.根据打开的二级页面自动生成模仿浏览器的标签页，如图
![image.png](http://upload-images.jianshu.io/upload_images/6651371-fb6c1f0238e4f78a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 亮点
根据打开的二级页面自动生成模仿浏览器的标签页逻辑：
1.标签页未关闭前缓存所有已打开的页面，互相切换时不会重新触发加载，如A页面进行某项操作时，切换到B页面，再返回A页面依然可以继续操作。
2.标签页关闭后，再次打开，清除已缓存状态，重新加载该页面
3.鼠标放在标签页上0.5秒，可弹出类似浏览器标签的一些操作，如图
![image.png](http://upload-images.jianshu.io/upload_images/6651371-67266c17e718b92c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4.刷新或关闭浏览器后再次打开后台页面，依然会显示上一次所有未关闭的标签页
5.标签卡过多时自动变成可横向滚动的状态，鼠标可拖动横向滚动。

### 标签页使用说明
1.定义路由时，在需要使用标签页的页面配置meta.name信息
```
let routes = [
    {
        path: '/',
        component: Home,
        name: '菜单一',
        iconCls: 'fa fa-home',//图标样式class
        children: [
            { path: '/Form', component: Form, name: '表单' ,meta: { name:'Form' }},
            { path: '/Table', component: Table, name: '表格',meta:{name:'Table'} },
        ]
    }
];
```
在具体vue页面组件中标明对应的name
```
export default {
	name:'Form',
	data() {
		return {}
    }
}
```
PS:标签页的主逻辑在src/routers/index.js中的路由拦截，可自行修改。
