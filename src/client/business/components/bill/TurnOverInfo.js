import React, {PureComponent} from 'react'
import { PropTypes } from 'prop-types'
import { Card } from 'antd'
import DynamicForm, { createInputFactory as CIF } from 'DynamicForm'
import { turnoverType, turnoverStatus } from '../../../common/data'
import { objToOptions, formatMoney, disableCIF } from '../../../utils'

const turnoverTypeOptions = objToOptions(turnoverType);
const turnoverStatusOptions = objToOptions(turnoverStatus);

const fieldConfig = {
    rulesStatsticNo: disableCIF('流水号'),
    rulesStatsticDataType: disableCIF('流水类型').isRadio(turnoverTypeOptions),
    sceneCode: disableCIF('计费场景编码'),
    sceneName: disableCIF('计费场景名称'),
    rulesStatsticDataStatus: disableCIF('流水状态').isRadio(turnoverStatusOptions),
    amount: disableCIF('计算金额（元）'),
    billingRulesCode: disableCIF('计费规则编码'),
    billingRulesName: disableCIF('计费规则名称'),
};

class TurnOverInfo extends PureComponent {
    state = {
        form: {}
    };

    componentDidMount() {
        this.initState(this.props.data);
    }

    initState = data => {
        const _data = { ...data };
        if(_data.amount !== undefined) {
            _data.amount = formatMoney(_data.amount / 100);
        }
        this.setState({
            form: _data,
        });
    };
    onChange = ({name, value}) => {

    };
    render() {
        const { children, index } = this.props;
        const { form } = this.state;
        return (
            <Card className='turnover-info'
                  style={{marginBottom: 20}}
                  title={`流水信息${index}`}
                  extra={children}>
                <DynamicForm
                    wrappedComponentRef={dynamicForm => this.dynamicForm = dynamicForm}
                    formFields={form}
                    fieldsConfig={fieldConfig}
                    onChange={this.onChange}
                />
            </Card>
        );
    }
}


TurnOverInfo.proptypes = {
    index: PropTypes.number,
    data: PropTypes.shape({
        rulesStatsticNo: PropTypes.string,
        rulesStatsticDataType: PropTypes.string,
        sceneCode: PropTypes.string,
        sceneName: PropTypes.string,
        rulesStatsticDataStatus: PropTypes.string,
        amount: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        billingRulesCode: PropTypes.string,
        billingRulesName: PropTypes.string,
    }),
};

export default TurnOverInfo;