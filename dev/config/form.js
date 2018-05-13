/**
 * 响应样式变动点，
 * {
    xs: 小于575px,
    sm: 576px-768px,
    md: 768px-992px,
    lg: 992px-1200px,
    xl: 1200px-1600px,
    xxl: 大于1600px,
    }
 */
/**
 * form表单的栅格布局，antd的标准是横向24格布局，
 * labelCol：提示栏布局
 * wrapperCol：内容栏或输入栏布局
 * @type {{labelCol: {xs: {span: number}, sm: {span: number}, md: {span: number}, lg: {span: number}, xl: {span: number}}, wrapperCol: {xs: {span: number}, sm: {span: number}, md: {span: number}, lg: {span: number}, xl: {span: number}}}}
 *
 */
export const formItemLayoutCol = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
        md: {span: 6},
        lg: {span: 6},
        xl: {span: 6},
        xxl: {span: 6}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
        md: {span: 18},
        lg: {span: 16},
        xl: {span: 16},
        xxl: {span: 16}
    }
}