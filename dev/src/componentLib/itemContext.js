/**
 * 表单域的form对象上下文传递context
 */
import React from 'react'

const ItemContext = React.createContext(false);
export const ItemProvider = ItemContext.Provider;
export const ItemConsumer = ItemContext.Consumer;