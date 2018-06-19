import * as UUID from 'uuidjs'

/**
 * 唯一ID生成器，ID必须全局唯一，返回的接口必须是异步接口（服务端异步调用）
 * @param cb
 */
export function idGenerator(cb) {
    const uuid = UUID.genV1();
    cb(uuid.hexNoDelim);
}

export function idGen() {
    return UUID.genV1().hexNoDelim;
}