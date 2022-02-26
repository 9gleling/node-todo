export default class extends Error {
  constructor(status = 500, message = 'Unknown Error', name = 'Error') {
    super(message);
    this.status = status;
    this.message = message;
    this.name = name;
  }
}