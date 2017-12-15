/***统一的接口地址管理***/

//例如 获取账号列表的接口
export const getAccountApi = (pageIndex,pageSize,keyword,status) => { 
    return `/users&current=${pageIndex}&size=${pageSize}&qParam=${keyword}&state=${status}`; 
};

