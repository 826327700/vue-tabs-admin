

//nav1管理路由
let Home=resolve => require(['@/views/Home.vue'], resolve)
let Form=resolve => require(['@/views/nav1/Form.vue'], resolve)
let Table=resolve => require(['@/views/nav1/Table.vue'], resolve)
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

export default routes;