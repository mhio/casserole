import Promise from 'bluebird'
import cloneDeep from 'lodash/cloneDeep'

import Client from './Client'


export default class Model {

  static classInit(){

    // The main schema for the Model
    this.schema = {}

    // Fields to hide from JSON outpu
    this.hidden_fields = []

  }

  static extend(model_name){
    const NewModel = class extends Model{}
    Model.name = model_name
    return NewModel
  }

  static async wat(){
    return true
  }

  static async find( query, options = {} ){
    Client.execute()
  }

  static async findOne( query, options = {} ){
    options.limit = 1
    const results = await this.find(query, options)
    if (results.lenght !== 1) return null
    return results[0]
  }

  static async create( data, options = {} ){

  }

  static async update( query, options = {} ){
    
  }

  static async delete( query, options = {} ){
    
  }

  constructor(data){
    this.data = data
  }

  toJSON(){
    const o = cloneDeep(this.data)
    let hidden_fields = this.constructor.hidden_fields
    for (let i = 0, len = hidden_fields.length; i < len; i++) {
     delete o[hidden_fields[i]]
    }
    return o
  }

}
Model.classInit()