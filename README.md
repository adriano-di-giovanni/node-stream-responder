# node-stream-responder

`StreamResponder` is a programmable Node.js module that allows you to interact with duplex streams.

I developed it to automate command line programs using ssh.

`StreamResponder` is similar to Unix's `expect`.

## Installation

```
npm install node-stream-responder --save
```

## Usage

```
var
	StreamResponder = require('node-stream-responder');

var
	responder = new StreamResponder();

responder.sequence
	.step(trigger1, response1) // wait for `trigger` then respond writing `response` to the stream
	.step(trigger2, response2) // each trigger can be a string or a regular expression
	.control() // control flow; wait for `trigger3` or `trigger5`
		.branch()
			.step(trigger3, response3)
			.step(trigger4, response4)
		.end() // end branch. mandatory
		.branch()
			.step(trigger5, response5)
			.control() // you can nest control structures
				.branch()
					.step(trigger6, response6)
				.end() // optional
			.end() // optional
		.end() // optional
	.end() // optional
.end(); // optional

responder.observe(stream);
```

## Alternatives

These are a few alternative projects:

* [node-expect](https://github.com/Trakkasure/node-expect)
* [node-suppose](https://github.com/jprichardson/node-suppose)

