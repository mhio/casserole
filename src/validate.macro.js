

// This would a babel macro, so validation errors are handled in code where they come from. 
// Also without the penalty of compound function calls

// ```
// import validate from './validate.macro'
// validate(whatever, 'Whatever', 'equals', 5)
// validate(whatever).is.a('number')
// validate.errorTemplate('{{something}}')
// validate(whatever).named('Whatever').is.an('integer')
// validate(whatever).named('Whatever').gt(3).throw(SomeError)
// validate(whatever).named('Whatever').is.an('integer').between(1,3)
// validate(whatever).named('Whatever').between(1,3)
// validate(whatever).named('Whatever').enum([1,3,5])
// validate(whatever).named('Whatever').is.an('object').with('one','two','three')
// validate(whatever).matches(/^meee/) 
// validate(whatever).startsWith('meee')
// validate(whatever).endsWith('eee')
// const validate_group = validate.group()
// validate_group(whatever).it.not.null
// ```

// ast-pretty-print is really handy :)
const printAST = require('ast-pretty-print')
const {createMacro} = require('babel-macros')
const types = require('babel-types')

function checkValidationArguments(file, node) {
  const args = node.arguments
  if (args.length < 3) {
    throw file.buildCodeFrameError(
      node,
      'The `validate` function takes three or more arguments.',
    )
  }
  const validateName = args[1]
  if (!types.isStringLiteral(validateName)) {
    throw file.buildCodeFrameError(
      validateName,
      'The second argument supplied to `validate` must be string name for the validation.',
    )
  }
  const validationType = args[2]
  if (!types.isStringLiteral(validationType)) {
    throw file.buildCodeFrameError(
      validationType,
      'The third argument supplied to `validate` must be a string for the type of validation.',
    )
  }
}

function makeCondition(node, state, inside) {
  if (inside) {
    return types.ConditionalExpression(
      types.BinaryExpression(
        '!=',
        types.AssignmentExpression('=', state.temp, node),
        types.NullLiteral(),
      ),
      inside,
      state.temp,
    )
  }

  return node
}

function makeValidate(node, state, inside) {
}


const validation_transform = (path, state) => {
  // const args = path.get('arguments')
  const node = path.node
  checkValidationArguments(state.file, node)
  const temp = path.scope.generateUidIdentifier('ref')
  const replacement = makeValidate(
    node.arguments[0],
    node.arguments[1],
    node.arguments[2]
  )
  path.replaceWith(replacement)
  path.scope.push({id: temp})
}

const validation = ({ state, references }) => {
  references.default.forEach(referencePath => {
    if (referencePath.parentPath.type === 'CallExpression') {
      validation_transform(referencePath.parentPath, state)
    }
    else {
      throw Error('Oh no! validate couldn\'t macro')
    }
  })
}

module.exports = createMacro(validation)