const ConnectorWordClassifier = require('./ConnectorWordClassifier')
const ConnectorWordClassification = require('../classification/ConnectorWordClassification')
const Span = require('../tokenization/Span')
const classifier = new ConnectorWordClassifier()

module.exports.tests = {}

function classify (body) {
  let s = new Span(body)
  classifier.each(s, null, 1)
  return s
}

module.exports.tests.connector_words_valid = (test) => {
  let valid = [
    'de', 'del', 'of', 'for'
  ]

  valid.forEach(token => {
    test(`connector_words_valid: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {
        ConnectorWordClassification: new ConnectorWordClassification(token.length > 1 ? 0.75 : 0.2)
      })
      t.end()
    })
  })
}

module.exports.tests.connector_words_invalid = (test) => {
  let invalid = [
    'desk', 'to', 'in', 'bobby'
  ]

  invalid.forEach(token => {
    test(`connector_words_invalid: ${token}`, (t) => {
      let s = classify(token)
      t.deepEqual(s.classifications, {})
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`StopWordClassifier: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
