


//nav2管理路由
let Home=resolve => require(['@/views/Home.vue'], resolve)
let Page5=resolve => require(['@/views/nav2/Page5.vue'], resolve)
let Echart=resolve => require(['@/views/charts/echarts.vue'], resolve)
let routes = [
    {
        path: '/',
        component: Home,
        name: '菜单二',
        iconCls: 'fa fa-home',//图标样式class
        children: [
            { path: '/Echart', component: Echart, name: '图表' ,meta: { name:'Echart' }},
            { path: '/Page5', component: Page5, name: '页面5' ,meta: { name:'Page5' }},
        ]
    }
];

export default routes;