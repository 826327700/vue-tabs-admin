//nav3管理路由
let Home=resolve => require(['@/views/Home.vue'], resolve)
let Page6=resolve => require(['@/views/nav3/Page6.vue'], resolve)
let routes = [
    {
        path: '/',
        component: Home,
        name: '菜单三',
        iconCls: 'fa fa-home',//图标样式class
        children: [
            { path: '/Page6', component: Page6, name: '页面6' ,meta: { name:'Page6' }},
        ]
    }
];

export default routes;