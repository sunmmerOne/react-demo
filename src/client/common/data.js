import turnoverList from "../pages/turnoverList/reducer";

export const NumberNull = -1;
export const StringNull = '';

export const dateFormat = 'YYYY-MM-DD';
export const timeFormat = "YYYY-MM-DD HH:mm:ss";

export const tableProp = {
    size: 'small',
    bordered: true,
    scroll: { x: 1000 }
};

export const formItemHorizontalLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};

export const statusMap = {
    0: '无效',
    1: '有效'
};
export const setStatusMap = {
    0: '置为有效',
    1: '置为无效'
};

export const payChannelMap = {
    1: '平安付',
    2: '捷银',
    3: '宝付',
};

export const turnoverStatus = {
    1: "待出账单",
    2: "已出账单",
    3: "结算完成",
};


export const turnoverType = {
    1: "系统生成",
    2: "人工添加",
};

export const roleTypesMap = {
    1: '付费方',
    2: '收费方',
    3: '分润方'
};

export const billStatusTypes = {
    1: '待结算',
    2: '结算中',
    3: '结算完成',
};

// 账单状态与流水状态的对应关系
export const billStatusMapToTurnOverStatus = {
    1: '2',
    2: '2',
    3: '3'
};

export const payStatusTypes = {
    1: '待支付',
    2: '支付中',
    3: '支付成功',
    4: '支付失败',
};

export const cycleTypeMap = {
    H: '每小时',
    D: '每日',
    W: '每周',
    M: '每月',
    Y: '每年',
    QY: '每季度',
    HY: '每半年'
};
export const cycleTypeShowMap = {
    H: '按小时收费',
    D: '按天收费',
    W: '按周收费',
    M: '按月收费',
    Y: '按年收费',
    QY: '按季度收费',
    HY: '按半年收费'
};

export const billingRulesType = {
    1: '单一定价计费',
    2: '阶梯计费',
    3: '一口价计费',
};

export const billingUnitType = {
    1: '按服务量计费',
    2: '按时间段计费',
};

