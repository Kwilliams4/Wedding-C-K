export class Guests {
  constructor(dbDriver) {
    this.dbDriver = dbDriver;
  }
  async getGuestsByRSVP(rsp = 0) {
    try {
      const query = "SELECT * FROM guests WHERE rsvp_status = ?";
      const [results] = await this.dbDriver.query(query, [rsp]);
      return { success: true, response: results };
    } catch (error) {
      throw { success: false, error: error.message };
    }
  }
  async getAvailableGuests() {
    try {
      const query = "SELECT * FROM guests WHERE rsvp_status IS NULL";
      const [results] = await this.dbDriver.query(query);
      return { success: true, response: results };
    } catch (error) {
      throw { success: false, error: error.message };
    }
  }
  async insertGuest(name, allowed_guests = 1, code) {
    try {
      const query = `INSERT INTO guests (display_name, allowed_guests, code) VALUES (?, ?, ?)`;
      const [results] = await this.dbDriver.query(query, [
        name,
        allowed_guests,
        code
      ]);
      return { success: true, response: results };
    } catch (error) {
      // CASE SPECIFIC ERROR HANDLING IS USED IN CONTROLLER
      throw error;
    }
  }
  async updateRSVP(code, rsvp_status) {
    try {
      const query = `UPDATE guests SET rsvp_status = ? WHERE code = ?`;
      const [results] = await this.dbDriver.query(query, [rsvp_status, code]);
      return {
        success: true,
        response: { rsvp_status: rsvp_status, id: results.insertId }
      };
    } catch (error) {
      throw { success: false, error: error.message };
    }
  }
  async getGuestByCode(code) {
    try {
      const query = `SELECT code, display_name, rsvp_status, allowed_guests FROM guests WHERE code = ?`;
      const [results] = await this.dbDriver.query(query, [code]);
      return { success: true, response: results };
    } catch (error) {
      throw { success: false, error: error.message };
    }
  }
}
