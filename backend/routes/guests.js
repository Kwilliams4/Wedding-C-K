const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guestController");

router.post("/", guestController.createNewGuest);
router.get("/", guestController.getGuests);
router.get("/:code", guestController.getGuestByCode);
router.get("/rsvp", guestController.getRSVPGuests);
router.post("/rsvp/:code", guestController.confirmRSVP);

module.exports = router;
