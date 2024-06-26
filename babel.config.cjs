const debug = require('debug')

const log = debug('@sequencemedia/hapi-common-log')

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

log('`@sequencemedia/hapi-common-log` is awake')

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

const presets = [
  [
    '@babel/env',
    {
      targets: {
        node: 'current'
      },
      useBuiltIns: 'usage',
      corejs: 3
    }
  ]
]

module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    presets
  }
}
