const { connect }=require('mongoose');
require('dotenv').config();

const db_url=process.env.db_url;

const connection=connect(db_url)


module.exports={connection};