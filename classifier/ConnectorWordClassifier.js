const WordClassifier = require('./super/WordClassifier')
const ConnectorWordClassification = require('../classification/ConnectorWordClassification')
const libpostal = require('../resources/libpostal/libpostal')

class ConnectorWordsClassifier extends WordClassifier {
  setup () {
    // load stopwords tokens
    this.connectorWords = {}
    libpostal.load(this.connectorWords, ['en', 'es'], 'connector_words.txt')
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // base confidence
    let confidence = 0.75

    // use an inverted index for full token matching as it's O(1)
    if (this.connectorWords.hasOwnProperty(span.norm)) {
      if (span.norm.length < 2) { confidence = 0.2 }
      span.classify(new ConnectorWordClassification(confidence))
    }
  }
}

module.exports = ConnectorWordsClassifier
