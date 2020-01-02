var kue = require("kue");
var Queue = kue.createQueue();
var emailClient = require("./../emailClient");

Queue.process("sendEmail", async (job, done) => {
	console.log("------");
	console.log(`${job.data.subject} job processed at ${new Date(Date.now())}`);
	let { data } = job;
	await emailClient.send(data);
	done();
});
