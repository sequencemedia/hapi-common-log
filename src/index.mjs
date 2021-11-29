import debug from 'debug'

import moment from 'moment-strftime'

const log = debug('@sequencemedia/hapi-common-log')

log('`@sequencemedia/hapi-common-log` is awake')

export const hasRawReqClientNPNProtocol = ({ raw: { req: { client = {} } = {} } = {} } = {}) => Reflect.has(client, 'npnProtocol')
export const getRawReqClientNPNProtocol = ({ raw: { req: { client = {} } = {} } = {} } = {}) => Reflect.get(client, 'npnProtocol')

export const hasRawReqHttpVersion = ({ raw: { req = {} } = {} } = {}) => Reflect.has(req, 'httpVersion')
export const getRawReqHttpVersion = ({ raw: { req = {} } = {} } = {}) => Reflect.get(req, 'httpVersion')

export const hasResponseStatusCode = ({ response = {} } = {}) => Reflect.has(response, 'statusCode')
export const getResponseStatusCode = ({ response = {} } = {}) => Reflect.get(response, 'statusCode')

export const hasResponseId = ({ response = {} } = {}) => Reflect.has(response, 'id')
export const getResponseId = ({ response = {} } = {}) => Reflect.get(response, 'id')

export const hasResponseHeadersContentLength = ({ response: { headers = {} } = {} } = {}) => Reflect.has(headers, 'content-length')
export const getResponseHeadersContentLength = ({ response: { headers = {} } = {} } = {}) => Reflect.get(headers, 'content-length')

export const hasInfoRemoteAddress = ({ info = {} } = {}) => Reflect.has(info, 'remoteAddress')
export const getInfoRemoteAddress = ({ info = {} } = {}) => Reflect.get(info, 'remoteAddress')

export const hasRawReqMethod = ({ raw: { req = {} } = {} } = {}) => Reflect.has(req, 'method')
export const getRawReqMethod = ({ raw: { req = {} } = {} } = {}) => Reflect.get(req, 'method')

export const hasRawReqUrl = ({ raw: { req = {} } = {} } = {}) => Reflect.has(req, 'url')
export const getRawReqUrl = ({ raw: { req = {} } = {} } = {}) => Reflect.get(req, 'url')

export const hasProtocol = (request) => (hasRawReqClientNPNProtocol(request) || hasRawReqHttpVersion(request))

export const getProtocol = (request) => (
  hasRawReqClientNPNProtocol(request)
    ? getRawReqClientNPNProtocol(request)
    : hasRawReqHttpVersion(request)
      ? `HTTP/${getRawReqHttpVersion(request)}`
      : 'HTTP/1.0'
)

export const getStringFromTime = (date = new Date()) => moment(date).strftime('%d/%b/%Y:%H:%M:%S %z')

export function hasOptionsIp (options = {}) {
  /*
   *  log('hasOptionsIp')
   */

  if (Reflect.has(options, 'ip')) {
    return !!(
      Reflect.get(options, 'ip')
    )
  }

  return false
}

export function getOptionsIp (options = {}) {
  /*
   *  log('getOptionsIp')
   */

  const ip = Reflect.get(options, 'ip')

  return String(ip)
    .toLowerCase()
}

export function getRequestLine (request) {
  /*
   *  log('getRequestLine')
   */

  const method = hasRawReqMethod(request) ? getRawReqMethod(request) : '-'
  const url = hasRawReqUrl(request) ? getRawReqUrl(request) : '-'
  const protocol = hasProtocol(request) ? getProtocol(request) : '-'

  return `${method} ${url} ${protocol}`
}

export default function toCommonLog (request) {
  /*
   *  log('toCommonLog')
   */

  const remoteHost = hasInfoRemoteAddress(request) ? getInfoRemoteAddress(request) : '-'
  const userIdentifier = '-'
  const userId = hasResponseId(request) ? getResponseId(request) : '-'
  const stringFromTime = getStringFromTime()
  const requestLine = getRequestLine(request)
  const responseStatusCode = hasResponseStatusCode(request) ? getResponseStatusCode(request) : '-'
  const responseObjectSize = hasResponseHeadersContentLength(request) ? getResponseHeadersContentLength(request) : '-'

  return `${remoteHost} ${userIdentifier} ${userId} [${stringFromTime}] "${requestLine}" ${responseStatusCode} ${responseObjectSize}`
}
