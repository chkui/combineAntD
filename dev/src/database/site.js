import db from './db'

export const query = (options, cb) =>{

}

const likeName = '棕榈'

db.query('d_site', {code: new RegExp('Eco'), label: new RegExp(likeName)}, (err, docs)=>{
    console.log(docs);
})

export default {
    query
}