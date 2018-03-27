import CassCql from './CassCql'
import Paramaters from './Paramaters'

/**
 * Base class for versioned Query implementations to extend
 */

export default class CassQuery extends CassCql {

  static classInit(){
    // Cassandra driver Types
    this.types = Paramaters.types
  }

}
CassQuery.classInit()