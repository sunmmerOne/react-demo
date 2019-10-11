// 这是自动生成的文件，可以修改。
// base lib
import React, {PureComponent} from 'react'
import { history, Link } from '@react-router'
import inject from '@inject'
import './style.scss'

// common & business components
import { Button } from 'antd'
import PureTable from 'PureTable'
import DynamicForm from 'DynamicForm'

// common data & utils
import { statusMap, tableProp } from '../../common/data'
import { antdPToReqApiP, resApiPToAntP } from '../../utils'

const columns = [
    {
        title: 'c1',
        dataIndex: 'c1',
        key: 'c1',
    },
    // {
    //     title: '创建时间',
    //     dataIndex: 'dateCreated',
    //     key: 'dateCreated',
    // },
    // {
    //     title: '修改时间',
    //     dataIndex: 'dateUpdated',
    //     key: 'dateUpdated',
    // },
    // {
    //     title: 'c2',
    //     render: row => statusMap[row.isValid],
    //     key: 'c2',
    // },
    // {
    //     title: '操作',
    //     render: row => {
    //         return (
    //             <Button size='small'>
    //                 <Link to={{
    //                     pathname: '',
    //                     query: {id: row.id}
    //                 }} >编辑</Link>
    //             </Button>
    //         )
    //     },
    //     key: 'operate',
    // }
];

@inject('template')
class Template extends PureComponent {
    componentDidMount() {
        this.getListData();
    }
    getListData = params => {
        const { getListData } = this.props.templateActions;
        getListData(params);
    };

    onSearch = () => {
        const { pagination } = this.props.templateStore;
        pagination.current = 1;
        this.getListData(antdPToReqApiP(pagination));
    };

    onChange = ({name, value}) => {
        const { updateForm } = this.props.templateActions;
        const { form } = this.props.templateStore;
        form[name] = value;
        updateForm(form);
    };

    onTableChange = (pagination, filters, sorter) => {
        this.getListData(antdPToReqApiP(pagination))
    };


    render() {
        const { form, pagination, templateData } = this.props.templateStore;
        return (
            <div id="template">
                <br/>
                <DynamicForm
                    layout={DynamicForm.LAYOUT.INLINE}
                    formFields={form}
                    fieldsConfig={fieldsConfig}
                    onSubmit={this.onSearch}
                    onChange={this.onChange}>
                    <div style={{width: 150}}>
                        <Button htmlType='submit' type='primary'>查询</Button>&nbsp;&nbsp;
                        <Button type='primary'>新增</Button>
                    </div>
                </DynamicForm>
                <br/>

                <PureTable columns={columns}
                       rowKey={(r,i) => i}
                       {...tableProp}
                       onChange={this.onTableChange}
                       pagination = {pagination}
                       dataSource={templateData}/>
            </div>
        );
    }
}

export default Template;
