/**
 * Created by chkui on 2017/6/9.
 */
import React from 'react'
import entry from 'pwfe-dom/entry'
import reducer from '../config/reducer'
import routes from '../config/clientRoutes'
import App from './app'
import './ant.css'
import 'antd/dist/antd.css'

entry({
    reducer: reducer,
    routes: routes,
    app: App
})


