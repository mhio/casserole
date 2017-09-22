export class CassError extends Error {

  static if(test, msg, opts = {}){
    if (!test) return
    let err = new this(msg, opts)

    // Remove this function from the stack
    // let message_lines =  (err.message.match(/\n/g)||[]).length + 1
    // let lines = err.stack.split('\n')
    // err.stack = lines.slice(0,message_lines).join('\n') + '\n' +
    //             lines.slice(message_lines+1).join('\n')
                
    throw err
  }



  constructor( message, options = {} ){
    super(message)
    this.name = this.constructor.name
    this.status = options.status || this.constructor.status ||  500

    /* istanbul ignore else */
    if (typeof Error.captureStackTrace === 'function'){
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }

    // Store a more humany label
    if (options.label) this.label = options.label

    // A standard place to store a more human readable error message
    if (options.simple) this.simple = options.simple

    // A standard place to store more error details for the humans
    // Single level objects are ok and should be presented to the user as such.
    if (options.details) this.details = options.details

  }

}

// export class CassExternalError extends CassError {

//   constructor( message, options = {} ){
//     super(message, options)
//     this.error = options.error
//   }

// }

// export class AuthError extends CassError {
//   static get status(){ return 403 }
// }

export default CassError