const Classification = require('./Classification')

class ConnectorWordClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'connector_word'
  }
}

module.exports = ConnectorWordClassification
