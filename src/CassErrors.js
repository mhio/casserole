export class CassError extends Error {

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

  // Keep `stack`
  toJSON(){
    let o = {}
    Object.getOwnPropertyNames(this).forEach(key => o[key] = this[key], this)
    return o
  }

}

export class CassExternalError extends CassError {

  constructor( message, options = {} ){
    super(message, options)
    this.error = options.error
  }

}

export class AuthError extends CassError {
  static get status(){ return 403 }
}

export default CassError