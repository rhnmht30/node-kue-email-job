require("dotenv").config();
const emailClient = require("./../config/emailClient");
const kue = require("./../config/scheduler/kue");
const worker = require("./../config/scheduler/worker");

module.exports.index = (req, res) => {
	return res.json({ message: "Welcome to API" });
};

module.exports.email = async (req, res) => {
	let emailLink = await emailClient.send({
		email: req.body.email,
		subject: "Test Mail",
		body: "This is just a test mail!"
	});
	return res.json({ response: `Preview URL: ${emailLink}` });
};

module.exports.book = async (req, res) => {
	let args = {
		jobName: "sendEmail",
		time: 1000, // sends mail immediately, since makes delay negative
		params: {
			email: req.body.email,
			subject: "Booking Confirmed",
			body: "Your booking is confirmed!!"
		}
	};
	kue.scheduleJob(args);

	// setting movie start time 3 minutes after booking
	let movie_start_time = Date.now() + 3 * 60 * 1000;
	console.log(`Movie scheduled at: ${new Date(movie_start_time)}`);
	//schedule to start reminder
	args = {
		jobName: "sendEmail",
		time: movie_start_time - 1 * 60 * 1000,
		params: {
			email: req.body.email,
			subject: "Movie Reminder",
			body: "Your movie will start in 1 minute. Hurry up and grab your snacks."
		}
	};
	kue.scheduleJob(args);

	//schedule started reminder
	args = {
		jobName: "sendEmail",
		time: movie_start_time,
		params: {
			email: req.body.email,
			subject: "Movie started",
			body: "Your movie has started. Enjoy"
		}
	};
	kue.scheduleJob(args);

	//schedule ended reminder
	args = {
		jobName: "sendEmail",
		time: movie_start_time + 2 * 60 * 1000,
		params: {
			email: req.body.email,
			subject: "Movie ended.",
			body: "Your movie has ended. Please Leave a review"
		}
	};
	kue.scheduleJob(args);

	// Return a response
	return res.status(200).json({ response: "Booking Successful!" });
};
