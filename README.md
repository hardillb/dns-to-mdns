# dns-to-mdns

A proxy to convert normal DNS requests to mDNS requests on the local LAN while forwarding other requests upstream.

## Running

You need to pass the upstream DNS IP address on the command line

```
$ node index.js 8.8.8.8
```

To allow running as a normal user and still binding to port 53 run the following.

```
$ sudo setcap CAP_NET_BIND_SERVICE=+eip `which node`
```

Be aware this will allow ANY nodejs app to bind to system ports.

Otherwise you can change the port that the bridge listens on by exporting the `DNS_PORT` environment variable

```
$ DNS_PORT=5300 node index.js 8.8.8.8
```
