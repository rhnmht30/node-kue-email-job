const nodemailer = require("nodemailer");

module.exports.send = async args => {
	try {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		let testAccount = await nodemailer.createTestAccount();

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user, // generated ethereal user
				pass: testAccount.pass // generated ethereal password
			}
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Rohan 👻" <rhnmht30@gmail.com>', // sender address
			to: args.email, // list of receivers
			subject: args.subject, // Subject line
			html: args.body // html body
		});

		console.log("Message sent: %s", info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		console.log(nodemailer.getTestMessageUrl(info));
		return nodemailer.getTestMessageUrl(info);
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	} catch (err) {
		console.log(`${err}`);
	}
};
