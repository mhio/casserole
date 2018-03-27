import {Exception} from '@mhio/exception'

/** 
  * Extended Error classes for Casserole 
  * @extends Exception
  */
export class CassException extends Exception {

  static if(test, msg, opts = {}){
    if (!test) return true
    let err = new this(msg, opts)

    // Remove this function from the stack
    // let message_lines =  (err.message.match(/\n/g)||[]).length + 1
    // let lines = err.stack.split('\n')
    // err.stack = lines.slice(0,message_lines).join('\n') + '\n' +
    //             lines.slice(message_lines+1).join('\n')

    throw err
  }

  /**
   * @param {String} message - Standard Error message
   * @param {Object} metadata - 
   * @param {Object} metadata.details - Store more error details for the humans
   *                                   Single level objects are ok and should be presented to 
   *                                   the user as such.
   */
  constructor( message, metadata = {} ){
    super(message, metadata)
    if (metadata.details) this.details = metadata.details
  }

}

export class QueryException extends CassException {}

// export class AuthError extends CassException {
//   static get status(){ return 403 }
// }

export default CassException
