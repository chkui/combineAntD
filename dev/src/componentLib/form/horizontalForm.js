import React from 'react'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd';
import Items from '../item/items'
import {FormProvider} from '../formContext'
import {formItemLayoutCol} from '../../../config/form'
import {oneForm} from '../../../../data/form'

const FormItem = Form.Item;

class HorizontalForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        return (
            <FormProvider value={this.props.form}>
                <Form onSubmit={this.handleSubmit}>
                    {FormBuilder(oneForm)}
                    <FormItem {...formItemLayoutCol}>
                        <Button type="primary" htmlType="submit">Register</Button>
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

function FormBuilder(data, form) {
    const list = [];
    for (let item of data.itemMetaSet) {
        const Component = Items[item.category][item.type].Entry;
        list.push(<Component key={item.column}{...item}/>)
    }
    return list;
}