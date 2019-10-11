export default [
    {
        path: '/',
        key: 'app',
        breadcrumbName: '首页', // 面包屑的名字
        component: require('@client/app/index'),
        indexRoute: {
            breadcrumbName: 'Home',
            component: require('@client/pages/Home'),
        },
        childRoutes: [

            {
                path: 'home',
                breadcrumbName: 'Home',
                component: require('@client/pages/home'),
            }, 
            {
                path: 'newModal',
                breadcrumbName: 'newModal',
                component: require('@client/pages/newModal'),
            }, 
            {
                path: 'bbs',
                breadcrumbName: 'bbs',
                component: require('@client/pages/bbs'),
            }, 
        ],

    },
    {
        path: '/login',
        component: require('@client/layout/Login'),
    }
];
