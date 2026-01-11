export class Guests {
  constructor(conn) {
    this.conn = conn;
  }
  /**
   *
   * @param {*} rsp
   * @returns
   */
  async getGuestsByRSVP(rsp = 0) {
    const query = "SELECT * FROM guests WHERE rsvp_status = ?";
    const [results] = await this.conn.query(query, [rsp]);
    return results;
  }
  /**
   *
   * @returns
   */
  async getAvailableGuests() {
    const query = "SELECT * FROM guests WHERE rsvp_status IS NULL";
    const [results] = await this.conn.query(query);
    return results;
  }
  /**
   *
   * @param {*} name
   * @param {*} allowed_guests
   * @param {*} code
   * @returns
   */
  async insertGuest(name, allowed_guests = 1, code) {
    const query = `INSERT INTO guests (display_name, allowed_guests, code) VALUES (?, ?, ?)`;
    const [results] = await this.conn.query(query, [
      name,
      allowed_guests,
      code
    ]);
    return results;
  }
  /**
   *
   * @param {*} code
   * @param {*} rsvp_status
   * @returns
   */
  async updateRSVP(code, rsvp_status) {
    const query = `UPDATE guests SET rsvp_status = ? WHERE code = ?`;
    const [results] = await this.conn.query(query, [rsvp_status, code]);
    return results.insertId;
  }
  /**
   *
   * @param {*} code
   * @returns
   */
  async getGuestByCode(code) {
    const query = `SELECT code, display_name, rsvp_status, allowed_guests FROM guests WHERE code = ?`;
    const [results] = await this.conn.query(query, [code]);
    return results;
  }
}
