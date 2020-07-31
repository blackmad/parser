const testcase = (test, common) => {
  let assert = common.assert(test)

  assert('Air & Space Museum Washington DC', [
    { venue: 'Air & Space Museum' },
    { locality: 'Washington' }, { region: 'DC' }
  ])

  assert('Empire State Building NYC', [
    { venue: 'Empire State Building' },
    { locality: 'NYC' }
  ])

  assert('Museo del Prado', [
    { venue: 'Museo del Prado' }
  ])

  assert('San Francisco Museum of Modern Art', [
    { venue: 'San Francisco Museum of Modern Art' }
  ])

  assert('San Francisco Museum of Modern Art San Francisco', [
    { venue: 'San Francisco Museum of Modern Art' },
    { locality: 'San Francisco' }
  ])
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`USA: ${name}`, testFunction)
  }

  testcase(test, common)
}
