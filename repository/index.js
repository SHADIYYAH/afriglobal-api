const DbConnection =require("../config/database")


const findOne = async (collection) => {
    const Database = DbConnection.getDb()
    const coll = Database.collection(collection)
    const data = await coll.findOne({}).toArray()
    return data
 }

 const insertOne = async (collection,data) =>{
    const Database = DbConnection.getDb()
    const coll = Database.collection(collection)
    const insert_details = await coll.insertOne(data)
    return insert_details
}

module.exports = {findOne, insertOne}