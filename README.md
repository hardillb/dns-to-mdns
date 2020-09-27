# dns-to-mdns

A bridge to conver normal DNS requests to mDNS requests

## Running

```
$ node index.js 
```

You can change the port that the bridge listens on by exporting the `DNS_PORT` environment variable

```
$ DNS_PORT=5300 node index.js
```

## CNAME Support

I'm waiting on the following pull request to be merged to enable support for resolving CNAMES

https://github.com/oznu/mdns-resolver/pull/2