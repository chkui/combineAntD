/**
 * Created by chkui on 2017/6/9.
 */
import React from 'react'
import entry from 'pwfe-dom/entry'
import reducer from '../config/reducer'
import routes from '../config/clientRoutes'
import App from './app'
import Header from './header/'
import Footer from './footer'
import './ant.css'
import 'antd/dist/antd.css'

entry({
    reducer: reducer,
    routes: routes,
    app: App,
    header: <Header />,
    footer: <Footer />
})


