/**
 * 从时间戳转换为标准的时间字符串
 * @param timestamp
 */
export const timestamp2Timer = timestamp =>{
    const date = new Date(timestamp);
    let month = date.getMonth() + 1;

    return `${date.getFullYear()}-${10 > month ? '0' + month : month}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export const timestamp2Day = timestamp =>{
    const date = new Date(timestamp);
    let month = date.getMonth() + 1;
    return `${date.getFullYear()}-${10 > month ? '0' + month : month}-${date.getDate()}`
}

/**
 * 从时间格式字符转换为时间戳。格式必须为 YYYY-MM-DD 24hh:mm:ss
 * @param timer
 * @return {number}
 */
export const timer2Timestamp = timer =>{
    return new Date(timer).getTime();
}

export default {
    timestamp2Timer,
    timestamp2Day,
    timer2Timestamp
}