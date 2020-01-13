import CassCql from './CassCql'
import Paramaters from './Paramaters'

/**
  * Base class for versioned Query implementations to extend
  * @extends CassCql
  */
class CassQuery extends CassCql {

  /**
   * Static class initialisations, run at require time
   */
  static _initialiseClass(){
    // Cassandra driver Types
    this.types = Paramaters.types
  }

}
CassQuery._initialiseClass()

export default CassQuery