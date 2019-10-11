import React, {PureComponent} from 'react'
import { Card, Table } from 'antd'
import Moment from 'moment'
import {
    billingRulesType,
    billingUnitType,
    cycleTypeShowMap,
    timeFormat,
    tableProp,
} from '../../../common/data'
import DynamicForm, { extend } from 'DynamicForm'

import { objToOptions, formatMoney, disableCIF } from '../../../utils'

const billingRulesTypeOptions = objToOptions(billingRulesType);
const billingUnitTypeOptions = objToOptions(billingUnitType);
const cycleTypeMapOptions = objToOptions(cycleTypeShowMap);

const getColumns = form => {
    return [
        {
            title: '序号',
            render: (r, d, i) => (i + 1),
            key: '序号',
        },
        {
            title: '阶梯起始值',
            render: r => ( form.abrsBilingRules.unit == '1' ? r.abrsLaddersConfig.pieceStart : r.abrsLaddersConfig.dataStartDate ),
            key: 'pieceSum',
        },
        {
            title: '阶梯结束值',
            render: r => ( form.abrsBilingRules.unit == '1' ? r.abrsLaddersConfig.pieceEnd : r.abrsLaddersConfig.dataEndDate ),
            key: '阶梯结束值',
        },
        {
            title: '阶梯单价（元）',
            render: r => formatMoney(r.abrsLaddersConfig.price/100),
            key: '阶梯单价（元）',
        },
        {
            title: '阶梯服务量',
            dataIndex: 'pieceSum',
            key: '阶梯服务量',
        },
        {
            title: '阶梯总价（元）',
            render: r => formatMoney(r.amount/100),
            key: '阶梯总价（元）',
        },
    ]
};

const TableInput = props => {
    const { value } = props;
    const { columns, dataSource } = value;
    return (
        <Table
            {...tableProp}
            scroll={{}}
            rowKey= { (r,i) => i }
            columns={columns}
            pagination={false}
            dataSource={dataSource}/>
    );
};

extend('tableInput', TableInput);

const fieldsConfig = {
    accountingSubjectName: disableCIF('费用类型'),
    billingRulesCode: disableCIF('计费规则编码'),
    name: disableCIF('计费规则名称'),
    billingRulesType: disableCIF('计费类型').isRadio(billingRulesTypeOptions),
    unit: disableCIF('计费方式').isRadio(billingUnitTypeOptions),
    cycleType: disableCIF('计费周期类型').isSelect(cycleTypeMapOptions),
    abrsBilingRulesDate: disableCIF('规则适用时间').isDateRangePicker(timeFormat),
    priceDetail: disableCIF('价格明细').is({type: 'tableInput'}).itemProp({
        wrapperCol: {},
        labelCol: {}
    }),
};

class BillingRuleInfo extends PureComponent {
    createFormFields = form => {
        const { abrsBilingRules } = form;
        const columns = getColumns(form);

        const formFields = {
            accountingSubjectName: form.accountingSubjectName,
            billingRulesCode: abrsBilingRules.billingRulesCode,
            name: abrsBilingRules.name,
            billingRulesType: abrsBilingRules.billingRulesType,
            unit: abrsBilingRules.unit,
            cycleType: abrsBilingRules.cycleType,
            abrsBilingRulesDate: [
                new Moment(abrsBilingRules.dataStartDate, timeFormat),
                new Moment(abrsBilingRules.dataEndDate, timeFormat)
            ],
            priceDetail: {
                columns,
                dataSource: form.abrsBusinessLaddersStatistic
            }
        };
        return formFields;
    };

    render() {
        const { form } = this.props;

        const formFields = this.createFormFields(form);

        return (
            <Card title="关联计费规则信息" bordered={false}>
                <DynamicForm
                    formFields={formFields}
                    fieldsConfig={fieldsConfig}/>
            </Card>
        );
    }
}

export default BillingRuleInfo;