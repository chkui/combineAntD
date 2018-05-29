import React from 'react'
import {Input, Button, Icon, Form} from 'antd';
const cn = require('classnames/bind').bind(require('./searchInput.scss'));

class SearchInput extends React.Component {

    render() {
        return (<form className={cn('form')} onSubmit={()=>{console.log('search')}}>
            <Input className={cn('input')} type="search"/>
            <Button type="submit">search</Button>
        </form>)
    }
}

export default SearchInput