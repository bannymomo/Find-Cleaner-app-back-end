const Client = require("../models/client");
async function addClient(req, res) {
  const client = new Client({
    firstName: "banny",
    lastName: "momo",
    gender: "female",
    age: 30,
    email: "aqua@126.com",
    postcode: 4000
  });
  await client.save();
  return res.json(client);
}

function getClient(req, res) {}
function getAllClients(req, res) {}
function updateClient(req, res) {}
function deleteClient(req, res) {}

module.exports = {
  addClient,
  getClient,
  getAllClients,
  updateClient,
  deleteClient
};
