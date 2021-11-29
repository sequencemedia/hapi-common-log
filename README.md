
## `@sequencemedia/hapi-common-log`

# Hapi Common Log

Transforms a Hapi request to a Common Log Format log line.

## Usage

```js
import toCommonLog from '@sequencemedia/hapi-common-log';

server.events.on('response', (request) => {
  console.log(toCommonLog(request))
})
```

## The Common Log Format

From [Wikipedia](https://en.wikipedia.org/wiki/Common_Log_Format):

> ```
> 127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326
> ```
>
> A "-" in a field indicates missing data.
>
> * _127.0.0.1_ is the IP address of the client (remote host) which made the request to the server.
> * _user-identifier_ is the [RFC 1413](https://tools.ietf.org/html/rfc1413) [identity](https://en.wikipedia.org/wiki/Ident_Protocol) of the client. Usually "-".
> * _frank_ is the userid of the person requesting the document. Usually "-" unless .htaccess has requested authentication.
> * _[10/Oct/2000:13:55:36 -0700]_ is the date, time, and time zone that the request was received, by default in [strftime](https://en.wikipedia.org/wiki/Strftime) format _%d/%b/%Y:%H:%M:%S %z_.
> * _"GET /apache_pb.gif HTTP/1.0"_ is the request line from the client. The method _GET_, _/apache_pb.gif_ the resource requested, and _HTTP/1.0_ the [HTTP protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
> * _200_ is the [HTTP status code](https://en.wikipedia.org/wiki/HTTP_status_code) returned to the client. 2xx is a successful response, 3xx a redirection, 4xx a client error, and 5xx a server error.
> * _2326_ is the size of the object returned to the client, measured in [bytes](https://en.wikipedia.org/wiki/Byte).

## License

ISC
