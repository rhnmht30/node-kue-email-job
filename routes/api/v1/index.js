const express = require("express");
const router = express.Router();
const { catchErrors } = require("../../../config/errorHandler");

const {
	index,
	email,
	book
} = require("./../../../controllers/index_controller");

router.get("/", index);
router.post("/email", catchErrors(email));
router.post("/book", catchErrors(book));

module.exports = router;
