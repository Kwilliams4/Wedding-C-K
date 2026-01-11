const { Guests } = require("../models/Guests");
const conn = require("../database_layer/conn");
const crypto = require("crypto");

async function createNewGuest(req, res) {
  try {
    const { name, allowed_guests } = req.body;
    const guests = new Guests(conn);
    const code = crypto
      .randomBytes(3)
      .toString("hex")
      .slice(0, 5)
      .toUpperCase();
    const result = await guests.insertGuest(name, allowed_guests, code);
    return res.status(201).json({
      success: true,
      response: result,
      code: code,
      message: "Guest created successfully."
    });
  } catch (error) {
    next(error);
  }
}

async function getGuests(req, res) {
  try {
    const guests = new Guests(conn);
    const availableGuestsResponse = await guests.getAvailableGuests();
    return res.status(200).json({
      response: availableGuestsResponse.response,
      message: "Guests retrieved successfully."
    });
  } catch (error) {
    next(error);
  }
}

async function getRSVPGuests(req, res) {
  try {
    const guests = new Guests(conn);
    const availableGuestsResponse = await guests.getGuestsByRSVP();
    return res.status(200).json({
      response: availableGuestsResponse.response,
      message: "Guests retrieved successfully."
    });
  } catch (error) {
    next(error);
  }
}

async function getGuestByCode(req, res) {
  try {
    const { code } = req.body;
    const guests = new Guests(conn);
    const guestResponse = await guests.getGuestByCode(code.toUpperCase());
    return res.status(200).json({
      response: guestResponse.response,
      message: "Guest retrieved successfully."
    });
  } catch (error) {
    next(error);
  }
}

async function confirmRSVP(req, res) {
  try {
    const { code, rsvp_status } = req.body;
    const guests = new Guests(conn);
    const updateGuestResponse = await guests.updateRSVP(
      code.toUpperCase(),
      rsvp_status
    );
    return res.status(200).json({
      response: updateGuestResponse.response,
      message: "Guest updated successfully."
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createNewGuest,
  getGuests,
  getRSVPGuests,
  confirmRSVP,
  getGuestByCode
};
