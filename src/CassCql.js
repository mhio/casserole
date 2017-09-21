import debugr from 'debug'

import Util from './Util'

/*
  Base class for other CQL implementations to extend
*/

class CassCql {

  static classInit(){
    this.debug = debugr('mh:casserole:CassCql')

    this.create_exists_cql = 'IF NOT EXISTS'

  }

}
CassCql.classInit()

export default CassCql