/**
 * 表单的form对象上下文传递context
 */
import React from 'react'
import {idGenerator} from '../database/idgenerator'

idGenerator((uuid)=>{console.log(uuid)})


const FormContext = React.createContext(false);
export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;