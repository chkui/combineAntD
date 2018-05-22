/**
 * 表单的form对象上下文传递context
 */
import React from 'react'
const FormContext = React.createContext(false);
export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;