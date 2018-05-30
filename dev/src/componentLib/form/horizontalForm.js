import React from 'react'
import {reRoute} from 'pwfe-dom/router'
import {Form, Button, message} from 'antd';
import Items from '../item/items'
import {FormProvider} from '../formContext'
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
                formDataService.submit(props.formStructure, values, (err, docs) => {
                    if(err){
                        message.error(`提交数据错误：${err}`);
                        _this.setState({onSubmit: false})
                    }else{
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
            <FormProvider value={props.form}>
                <Form onSubmit={this.handleSubmit}>
                    {FormBuilder(props.formStructure, props.form)}
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
export default reRoute()(Form.create()(HorizontalForm));

function FormBuilder(formStructure, form) {
    const list = [];
    for (let item of formStructure.itemMeta) {
        const Component = Items[item.category][item.type].Form;
        list.push(<Component key={item.column}{...item} formStructure={formStructure} form={form}/>)
    }
    return list;
}