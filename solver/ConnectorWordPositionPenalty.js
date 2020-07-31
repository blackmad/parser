const BaseSolver = require('./super/BaseSolver')

// if a connector word (of, for, de, etc...) heavily penalize solutions that
// have a connector word on the ends of a span like "museo del" / "prado"

class ConnectorWordPositionPenalty extends BaseSolver {
  solve (tokenizer) {
    tokenizer.solution.forEach(s => {
      s.pair.forEach(p => {
        const first = p.span.graph.findOne('child:first')
        if (first && first.classifications && first.classifications.hasOwnProperty('ConnectorWordClassification')) {
          s.penalty += 0.5
        }
        const last = p.span.graph.findOne('child:last')
        if (last && last.classifications && last.classifications.hasOwnProperty('ConnectorWordClassification')) {
          s.penalty += 0.5
        }
      })
    })
  }
}

module.exports = ConnectorWordPositionPenalty
