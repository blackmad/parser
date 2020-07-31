const BaseSolver = require('./super/BaseSolver')

// Give a tiny boost based on solution length, just big enough to break
// ties, too tiny to do anything else.

class SolutionLengthBoost extends BaseSolver {
  solve (tokenizer) {
    tokenizer.solution.forEach(s => {
      const length = s.pair.reduce((acc, p) => acc + p.span.norm.length, 0)
      s.score += length / 1000
    })
  }
}

module.exports = SolutionLengthBoost
