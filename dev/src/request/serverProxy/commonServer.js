export const resultToList = resultSet =>resultSet ? (()=>{
    const list = [];
    for(let item of resultSet){
        list.push(item)
    }
    return list;
})() : false