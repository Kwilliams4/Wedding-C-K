const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guestController");

router.post("/newGuest", guestController.createNewGuest);
router.get("/getGuests", guestController.getGuests);
router.post("/rsvpGuests", guestController.getRSVPGuests);
router.post("/updateGuest", guestController.confirmRSVP);
router.post("/guestCode", guestController.getGuestByCode);

module.exports = router;
