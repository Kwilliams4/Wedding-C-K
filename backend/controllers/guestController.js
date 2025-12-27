const { Guests } = require("../models/Guests");
const db = require("../db.js");
const crypto = require("crypto");

async function createNewGuest(req, res) {
  const { name, allowed_guests } = req.body;
  const guests = new Guests(db);
  let attempts = 0;
  const MAX_ATTEMPTS = 5;

  while (attempts < MAX_ATTEMPTS) {
    const code = crypto
      .randomBytes(3)
      .toString("hex")
      .slice(0, 5)
      .toUpperCase();

    try {
      const result = await guests.insertGuest(name, allowed_guests, code);

      return res.status(201).json({
        success: true,
        response: result,
        code: code,
        message: "Guest created successfully."
      });
    } catch (error) {
      if (error.errno === 1062 || error.code === "ER_DUP_ENTRY") {
        attempts++;
        continue;
      }
      throw error;
    }
  }
  return res.status(500).json({
    success: false,
    message: "Could not generate a unique code after several attempts."
  });
}

async function getGuests(req, res) {
  try {
    const guests = new Guests(db);
    const availableGuestsResponse = await guests.getAvailableGuests();
    return res.status(200).json({
      response: availableGuestsResponse.response,
      message: "Guests retrieved successfully."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not get guests."
    });
  } finally {
    // db.release();
  }
}

async function getRSVPGuests(req, res) {
  try {
    const guests = new Guests(db);
    const availableGuestsResponse = await guests.getGuestsByRSVP();
    return res.status(200).json({
      response: availableGuestsResponse.response,
      message: "Guests retrieved successfully."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Could not get guests."
    });
  } finally {
    // db.release();
  }
}
async function getGuestByCode(req, res) {
  try {
    const { code } = req.body;
    const guests = new Guests(db);
    const guestResponse = await guests.getGuestByCode(code.toUpperCase());
    return res.status(200).json({
      response: guestResponse.response,
      message: "Guest retrieved successfully."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not get guest."
    });
  } finally {
    // db.release();
  }
}
async function confirmRSVP(req, res) {
  try {
    const { code, rsvp_status } = req.body;
    const guests = new Guests(db);
    const updateGuestResponse = await guests.updateRSVP(
      code.toUpperCase(),
      rsvp_status
    );
    // db.commit();
    return res.status(200).json({
      response: updateGuestResponse.response,
      message: "Guest updated successfully."
    });
  } catch (error) {
    // db.rollback();
    return res.status(500).json({
      message: "Error updating guest."
    });
  } finally {
    // db.release();
  }
}
module.exports = {
  createNewGuest,
  getGuests,
  getRSVPGuests,
  confirmRSVP,
  getGuestByCode
};
