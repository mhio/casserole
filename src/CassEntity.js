import CassCql from './CassCql'

/*
  Base entity class for specific CQL entities to extend
*/

export default class CassEntity extends CassCql {

  static classInit(){

    // Each entity covers create/drop/alter for noun
    this.noun = '__NOUN__'

    // Generic CQL vars
    this.create_exists_cql = 'IF NOT EXISTS'
    this.drop_exists_cql = 'IF EXISTS'
  }

  static toCqlDrop(){
    throw new Error('Not implemented in child class')
  }

  static toCqlAlter(){
    throw new Error('Not implemented in child class')
  }

  static toCqlCreate(){
    throw new Error('Not implemented in child class')
  }

  toCqlDrop(){
    throw new Error('Not implemented in child class')
  }

  toCqlAlter(){
    throw new Error('Not implemented in child class')
  }

  toCqlCreate(){
    throw new Error('Not implemented in child class')
  }

}
CassEntity.classInit()