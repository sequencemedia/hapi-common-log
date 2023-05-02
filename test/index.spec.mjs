import debug from 'debug'

import {
  expect
} from 'chai'

import sinon from 'sinon'

import moment from 'moment-strftime'

import toCommonLog, {
  hasRawReqClientNPNProtocol,
  getRawReqClientNPNProtocol,
  hasRawReqHttpVersion,
  getRawReqHttpVersion,
  hasRawReqMethod,
  getRawReqMethod,
  hasRawReqUrl,
  getRawReqUrl,
  hasResponseStatusCode,
  getResponseStatusCode,
  hasResponseId,
  getResponseId,
  hasResponseHeadersContentLength,
  getResponseHeadersContentLength,
  hasInfoRemoteAddress,
  getInfoRemoteAddress,
  hasProtocol,
  getProtocol,
  getStringFromTime,
  getRequestLine
} from '#hapi-common-log'

describe('#hapi-common-log', () => {
  const REQUEST = {
    raw: {
      req: {
        method: 'MOCK METHOD',
        url: 'MOCK URL',
        httpVersion: 'MOCK HTTP VERSION'
      }
    },
    response: {
      statusCode: 0,
      id: 'MOCK ID',
      headers: {
        'content-length': 0
      }
    },
    info: {
      remoteAddress: 'MOCK REMOTE ADDRESS'
    }
  }

  before(() => {
    const {
      env: {
        DEBUG
      }
    } = process

    if (DEBUG) debug.enable(DEBUG)
  })

  describe('`toCommonLog`', () => {
    it('is a function', () => {
      return expect(toCommonLog)
        .to.be.a('function')
    })
  })

  describe('`hasRawReqClientNPNProtocol`', () => {
    it('is a function', () => {
      return expect(hasRawReqClientNPNProtocol)
        .to.be.a('function')
    })
  })

  describe('`getRawReqClientNPNProtocol`', () => {
    it('is a function', () => {
      return expect(getRawReqClientNPNProtocol)
        .to.be.a('function')
    })
  })

  describe('`hasRawReqHttpVersion`', () => {
    it('is a function', () => {
      return expect(hasRawReqHttpVersion)
        .to.be.a('function')
    })
  })

  describe('`getRawReqHttpVersion`', () => {
    it('is a function', () => {
      return expect(getRawReqHttpVersion)
        .to.be.a('function')
    })
  })

  describe('`hasRawReqMethod`', () => {
    it('is a function', () => {
      return expect(hasRawReqMethod)
        .to.be.a('function')
    })
  })

  describe('`getRawReqMethod`', () => {
    it('is a function', () => {
      return expect(getRawReqMethod)
        .to.be.a('function')
    })
  })

  describe('`hasRawReqUrl`', () => {
    it('is a function', () => {
      return expect(hasRawReqUrl)
        .to.be.a('function')
    })
  })

  describe('`getRawReqUrl`', () => {
    it('is a function', () => {
      return expect(getRawReqUrl)
        .to.be.a('function')
    })
  })

  describe('`hasResponseStatusCode`', () => {
    it('is a function', () => {
      return expect(hasResponseStatusCode)
        .to.be.a('function')
    })
  })

  describe('`getResponseStatusCode`', () => {
    it('is a function', () => {
      return expect(getResponseStatusCode)
        .to.be.a('function')
    })
  })

  describe('`hasResponseId`', () => {
    it('is a function', () => {
      return expect(hasResponseId)
        .to.be.a('function')
    })
  })

  describe('`getResponseId`', () => {
    it('is a function', () => {
      return expect(getResponseId)
        .to.be.a('function')
    })
  })

  describe('`hasResponseHeadersContentLength`', () => {
    it('is a function', () => {
      return expect(hasResponseHeadersContentLength)
        .to.be.a('function')
    })
  })

  describe('`getResponseHeadersContentLength`', () => {
    it('is a function', () => {
      return expect(getResponseHeadersContentLength)
        .to.be.a('function')
    })
  })

  describe('`hasInfoRemoteAddress`', () => {
    it('is a function', () => {
      return expect(hasInfoRemoteAddress)
        .to.be.a('function')
    })
  })

  describe('`getInfoRemoteAddress`', () => {
    it('is a function', () => {
      return expect(getInfoRemoteAddress)
        .to.be.a('function')
    })
  })

  describe('`hasProtocol`', () => {
    it('is a function', () => {
      return expect(hasProtocol)
        .to.be.a('function')
    })
  })

  describe('`getProtocol`', () => {
    it('is a function', () => {
      return expect(getProtocol)
        .to.be.a('function')
    })
  })

  describe('`getStringFromTime`', () => {
    it('is a function', () => {
      return expect(getStringFromTime)
        .to.be.a('function')
    })
  })

  describe('`getRequestLine`', () => {
    it('is a function', () => {
      return expect(getRequestLine)
        .to.be.a('function')
    })
  })

  describe('`toCommonLog()`', () => {
    let mockDate
    let strftime

    beforeEach(() => {
      const date = new Date(0)

      mockDate = sinon.useFakeTimers(date)
      strftime = moment(date)
        .strftime('%d/%b/%Y:%H:%M:%S %z')
    })

    afterEach(() => {
      mockDate.restore()
    })

    describe('With a request', () => {
      it('returns a string', () => {
        return expect(toCommonLog(REQUEST))
          .to.equal(`MOCK REMOTE ADDRESS - MOCK ID [${strftime}] "MOCK METHOD MOCK URL HTTP/MOCK HTTP VERSION" 0 0`)
      })
    })

    describe('Without a request', () => {
      it('returns a string', () => {
        return expect(toCommonLog())
          .to.equal(`- - - [${strftime}] "- - -" - -`)
      })
    })
  })

  describe('`hasRawReqClientNPNProtocol()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { raw: { req: { client: { npnProtocol: 'MOCK NPN PROTOCOL' } } } }

        return expect(hasRawReqClientNPNProtocol(request))
          .to.be.true
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(hasRawReqClientNPNProtocol())
          .to.be.false
      })
    })
  })

  describe('`getRawReqClientNPNProtocol()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { raw: { req: { client: { npnProtocol: 'MOCK NPN PROTOCOL' } } } }

        return expect(getRawReqClientNPNProtocol(request))
          .to.equal('MOCK NPN PROTOCOL')
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(getRawReqClientNPNProtocol())
          .to.be.undefined
      })
    })
  })

  describe('`hasRawReqHttpVersion()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { raw: { req: { httpVersion: 'MOCK HTTP VERSION' } } }

        return expect(hasRawReqHttpVersion(request))
          .to.be.true
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(hasRawReqHttpVersion())
          .to.be.false
      })
    })
  })

  describe('`getRawReqHttpVersion()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { raw: { req: { httpVersion: 'MOCK HTTP VERSION' } } }

        return expect(getRawReqHttpVersion(request))
          .to.equal('MOCK HTTP VERSION')
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(getRawReqHttpVersion())
          .to.be.undefined
      })
    })
  })

  describe('`hasRawReqMethod()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { raw: { req: { method: 'MOCK METHOD' } } }

        return expect(hasRawReqMethod(request))
          .to.be.true
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(hasRawReqMethod())
          .to.be.false
      })
    })
  })

  describe('`getRawReqMethod()`', () => {
    it('is a function', () => {
      return expect(hasResponseHeadersContentLength)
        .to.be.a('function')
    })
  })

  describe('`hasRawReqUrl()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { raw: { req: { url: 'MOCK URL' } } }

        return expect(hasRawReqUrl(request))
          .to.be.true
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(hasRawReqUrl())
          .to.be.false
      })
    })
  })

  describe('`getRawReqUrl()`', () => {
    it('is a function', () => {
      return expect(hasResponseHeadersContentLength)
        .to.be.a('function')
    })
  })

  describe('`hasResponseStatusCode()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { response: { statusCode: 0 } }

        return expect(hasResponseStatusCode(request))
          .to.be.true
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(hasResponseStatusCode())
          .to.be.false
      })
    })
  })

  describe('`getResponseStatusCode()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { response: { statusCode: 0 } }

        return expect(getResponseStatusCode(request))
          .to.equal(0)
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(getResponseStatusCode())
          .to.be.undefined
      })
    })
  })

  describe('`hasResponseId()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { response: { id: 'MOCK ID' } }

        return expect(hasResponseId(request))
          .to.be.true
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(hasResponseId())
          .to.be.false
      })
    })
  })

  describe('`getResponseId()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { response: { id: 'MOCK ID' } }

        return expect(getResponseId(request))
          .to.equal('MOCK ID')
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(getResponseId())
          .to.be.undefined
      })
    })
  })

  describe('`hasResponseHeadersContentLength()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { response: { headers: { 'content-length': 0 } } }

        return expect(hasResponseHeadersContentLength(request))
          .to.be.true
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(hasResponseHeadersContentLength())
          .to.be.false
      })
    })
  })

  describe('`getResponseHeadersContentLength()`', () => {
    describe('With a request', () => {
      it('returns a number', () => {
        const request = { response: { headers: { 'content-length': 0 } } }

        return expect(getResponseHeadersContentLength(request))
          .to.eql(0)
      })
    })

    describe('Without a request', () => {
      it('returns undefined', () => {
        return expect(getResponseHeadersContentLength())
          .to.be.undefined
      })
    })
  })

  describe('`hasInfoRemoteAddress()`', () => {
    describe('With a request', () => {
      it('returns true', () => {
        const request = { info: { remoteAddress: 'MOCK REMOTE ADDRESS' } }

        return expect(hasInfoRemoteAddress(request))
          .to.be.true
      })
    })

    describe('Without a request', () => {
      it('returns false', () => {
        return expect(hasInfoRemoteAddress())
          .to.be.false
      })
    })
  })

  describe('`getInfoRemoteAddress()`', () => {
    describe('With a request', () => {
      it('returns a number', () => {
        const request = { info: { remoteAddress: 'MOCK REMOTE ADDRESS' } }

        return expect(getInfoRemoteAddress(request))
          .to.eql('MOCK REMOTE ADDRESS')
      })
    })

    describe('Without a request', () => {
      it('returns undefined', () => {
        return expect(getInfoRemoteAddress())
          .to.be.undefined
      })
    })
  })

  describe('`hasProtocol()`', () => {
    describe('With a request', () => {
      describe('The request has an NPN Protocol', () => {
        describe('The request has an HTTP Version', () => {
          it('returns true', () => {
            const request = { raw: { req: { client: { npnProtocol: 'MOCK NPN PROTOCOL' }, httpVersion: 'MOCK HTTP VERSION' } } }

            return expect(hasProtocol(request))
              .to.be.true
          })
        })

        describe('The request does not have an HTTP Version', () => {
          it('returns true', () => {
            const request = { raw: { req: { client: { npnProtocol: 'MOCK NPN PROTOCOL' } } } }

            return expect(hasProtocol(request))
              .to.be.true
          })
        })
      })

      describe('The request does not have an NPN Protocol', () => {
        describe('The request has an HTTP Version', () => {
          it('returns true', () => {
            const request = { raw: { req: { httpVersion: 'MOCK HTTP VERSION' } } }

            return expect(hasProtocol(request))
              .to.be.true
          })
        })

        describe('The request does not have an HTTP Version', () => {
          it('returns false', () => {
            const request = { raw: { req: { } } }

            return expect(hasProtocol(request))
              .to.be.false
          })
        })
      })
    })
  })

  describe('`getProtocol()`', () => {
    describe('With a request', () => {
      describe('The request has an NPN Protocol', () => {
        describe('The request has an HTTP Version', () => {
          it('returns true', () => {
            const request = { raw: { req: { client: { npnProtocol: 'MOCK NPN PROTOCOL' }, httpVersion: 'MOCK HTTP VERSION' } } }

            return expect(getProtocol(request))
              .to.equal('MOCK NPN PROTOCOL')
          })
        })

        describe('The request does not have an HTTP Version', () => {
          it('returns true', () => {
            const request = { raw: { req: { client: { npnProtocol: 'MOCK NPN PROTOCOL' } } } }

            return expect(getProtocol(request))
              .to.equal('MOCK NPN PROTOCOL')
          })
        })
      })

      describe('The request does not have an NPN Protocol', () => {
        describe('The request has an HTTP Version', () => {
          it('returns true', () => {
            const request = { raw: { req: { httpVersion: 'MOCK HTTP VERSION' } } }

            return expect(getProtocol(request))
              .to.equal('HTTP/MOCK HTTP VERSION')
          })
        })

        describe('The request does not have an HTTP Version', () => {
          it('returns false', () => {
            const request = { raw: { req: { } } }

            return expect(getProtocol(request))
              .to.equal('HTTP/1.0')
          })
        })
      })
    })
  })

  describe('`getStringFromTime()`', () => {
    let mockDate
    let strftime

    beforeEach(() => {
      const date = new Date(0)

      mockDate = sinon.useFakeTimers(date)
      strftime = moment(date)
        .strftime('%d/%b/%Y:%H:%M:%S %z')
    })

    afterEach(() => {
      mockDate.restore()
    })

    it('returns a string', () => {
      return expect(getStringFromTime())
        .to.equal(strftime)
    })
  })

  describe('`getRequestLine()`', () => {
    describe('With a request', () => {
      it('returns a string', () => {
        return expect(getRequestLine(REQUEST))
          .to.equal('MOCK METHOD MOCK URL HTTP/MOCK HTTP VERSION')
      })
    })

    describe('Without a request', () => {
      it('returns a string', () => {
        return expect(getRequestLine())
          .to.equal('- - -')
      })
    })
  })
})
