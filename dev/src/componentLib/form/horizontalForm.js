import React from 'react'
import {Form, Button, message} from 'antd';
import Items from '../item/items'
import {FormProvider} from '../formContext'
import {ItemProvider} from '../itemContext'
import {formButtonLayoutCol} from '../../../config/form'
import {formDataService} from '../../service/formDataService'

const cn = require('classnames/bind').bind(require('./horizontalForm.scss'));

const FormItem = Form.Item;

/**
 * @param props.form Antd Form.create高阶组件传递的表单值。
 * @param props.formStructure 表单对象
 */
class HorizontalForm extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {onSubmit: false}
    }

    handleSubmit = (e) => {
        const _this = this,
            props = _this.props;
        _this.setState({onSubmit: true})
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.error('提交的数据项存在错误，请按提示检查！');
                _this.setState({onSubmit: false})
            } else {
                formDataService.submit(props.formStructure.id, props.formStructure.ver, values, (err, docs) => {
                    if (err) {
                        message.error(`提交数据错误：${err}`);
                        _this.setState({onSubmit: false})
                    } else {
                        message.success('提交数据成功');
                        props.browser.back();
                        _this.setState({onSubmit: false})
                    }
                });
            }
        });
    }

    render() {
        const props = this.props;
        return (
            <FormProvider value={{form: props.form, formStructure: props.formStructure}}>
                <Form onSubmit={this.handleSubmit}>
                    {props.formStructure.itemMeta.map(item => {
                        const Component = Items[item.category][item.type].Form,
                            inParams = {
                                column: item.column,
                                label: item.label,
                                tip: item.tip,
                                rules: item.rules
                            };
                        return (<ItemProvider key={item.column} value={{item:item}}>
                            <Component {...inParams} />
                        </ItemProvider>)
                    })}
                    <FormItem {...formButtonLayoutCol}>
                        <Button className={cn('btn')} type="primary" htmlType="submit"
                                loading={this.state.onSubmit}>提交</Button>
                    </FormItem>
                </Form>
            </FormProvider>
        );
    }
}

/**
 * Form.create的作用是向子组件注入已经定义好验证和操作高阶组件
 */
export default Form.create()(HorizontalForm);