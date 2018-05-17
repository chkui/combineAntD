import React from 'react'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd';
import {EmailEntry} from '../item/input/email'
import {StringEntry} from '../item/input/string'
import {StandardEntry} from '../item/select/standard'
import {CascaderEntry} from '../item/select/cascader'
import {formItemLayoutCol} from '../../../config/form'

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {form} = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <EmailEntry column="email" tip="请输入电子邮件地址" form={form}/>
                <StringEntry column="string" label="文本" form={form}/>
                <StandardEntry column="select" label="选择框" form={form}
                               options={[{value: 1, label: '123'}, {value: 2, label: '456'}]}/>
                <CascaderEntry column="cascader" label="级联选项单" form={form}
                               options={[]}/>
                <FormItem {...formItemLayoutCol}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

/**
 * Form.create的作用是向子组件注入已经定义好验证和操作高阶组件
 */
export default Form.create()(RegistrationForm);