const dgram = require('dgram')
const dnsPacket = require('dns-packet')
const mdnsResolver = require('mdns-resolver')

const port = process.env["DNS_PORT"] || 53
const server = dgram.createSocket('udp4')

server.on('listening', () => {
	console.log("listening")
})

server.on('message', (msg, remote) => {
	const packet = dnsPacket.decode(msg)
	var response = {
		type: "response",
		id: packet.id,
		questions: [
			packet.questions[0]
		],
		answers: [
		]
	}

	mdnsResolver.resolve(packet.questions[0].name, packet.questions[0].type)
	.then(addr => {
		response.answers.push({
			type: packet.questions[0].type,
			class: packet.questions[0].class,
			name: packet.questions[0].name,
			ttl: 30,
			data: addr
		})
		server.send(dnsPacket.encode(response), remote.port)
	})
	.catch (err => {
		server.send(dnsPacket.encode(response), remote.port)
	})

})
server.bind(port)