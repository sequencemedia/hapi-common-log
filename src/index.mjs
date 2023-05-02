import debug from 'debug'

import moment from 'moment-strftime'

const log = debug('@sequencemedia/hapi-common-log')

log('`@sequencemedia/hapi-common-log` is awake')

const DEFAULT = '-'

const getRaw = ({ raw = {} } = {}) => raw

const getReq = ({ req = {} } = {}) => req

const getClient = ({ client = {} } = {}) => client

const getHeaders = ({ headers = {} } = {}) => headers

const getInfo = ({ info = {} } = {}) => info

const getRawReq = (request) => getReq(getRaw(request))

const getRawReqClient = (request) => getClient(getRawReq(request))

const getResponseHeaders = (request) => getHeaders(getResponse(request))

const getResponse = ({ response = {} } = {}) => response

export const hasRawReqClientNPNProtocol = (request) => Reflect.has(getRawReqClient(request), 'npnProtocol')
export const getRawReqClientNPNProtocol = (request) => Reflect.get(getRawReqClient(request), 'npnProtocol')

export const hasRawReqHttpVersion = (request) => Reflect.has(getRawReq(request), 'httpVersion')
export const getRawReqHttpVersion = (request) => Reflect.get(getRawReq(request), 'httpVersion')

export const hasResponseStatusCode = (request) => Reflect.has(getResponse(request), 'statusCode')
export const getResponseStatusCode = (request) => Reflect.get(getResponse(request), 'statusCode')

export const hasResponseId = (request) => Reflect.has(getResponse(request), 'id')
export const getResponseId = (request) => Reflect.get(getResponse(request), 'id')

export const hasResponseHeadersContentLength = (request) => Reflect.has(getResponseHeaders(request), 'content-length')
export const getResponseHeadersContentLength = (request) => Reflect.get(getResponseHeaders(request), 'content-length')

export const hasInfoRemoteAddress = (request) => Reflect.has(getInfo(request), 'remoteAddress')
export const getInfoRemoteAddress = (request) => Reflect.get(getInfo(request), 'remoteAddress')

export const hasRawReqMethod = (request) => Reflect.has(getRawReq(request), 'method')
export const getRawReqMethod = (request) => Reflect.get(getRawReq(request), 'method')

export const hasRawReqUrl = (request) => Reflect.has(getRawReq(request), 'url')
export const getRawReqUrl = (request) => Reflect.get(getRawReq(request), 'url')

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

  const method = hasRawReqMethod(request) ? getRawReqMethod(request) : DEFAULT
  const url = hasRawReqUrl(request) ? getRawReqUrl(request) : DEFAULT
  const protocol = hasProtocol(request) ? getProtocol(request) : DEFAULT

  return `${method} ${url} ${protocol}`
}

export default function toCommonLog (request) {
  /*
   *  log('toCommonLog')
   */

  const remoteHost = hasInfoRemoteAddress(request) ? getInfoRemoteAddress(request) : DEFAULT
  const userIdentifier = DEFAULT
  const userId = hasResponseId(request) ? getResponseId(request) : DEFAULT
  const stringFromTime = getStringFromTime()
  const requestLine = getRequestLine(request)
  const responseStatusCode = hasResponseStatusCode(request) ? getResponseStatusCode(request) : DEFAULT
  const responseObjectSize = hasResponseHeadersContentLength(request) ? getResponseHeadersContentLength(request) : DEFAULT

  return `${remoteHost} ${userIdentifier} ${userId} [${stringFromTime}] "${requestLine}" ${responseStatusCode} ${responseObjectSize}`
}
