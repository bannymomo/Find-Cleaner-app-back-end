const Client = require("../models/client");
async function addClient(req, res) {
  const {
    firstName,
    lastName,
    gender,
    age,
    email,
    postcode,
    memberSince,
    lastOnline,
    photo,
    description
  } = req.body;
  const client = new Client({
    firstName,
    lastName,
    gender,
    age,
    email,
    postcode,
    memberSince,
    lastOnline,
    photo,
    description
  });
  await client.save();
  return res.json(client);
}

function getClient(req, res) {}

async function getAllClients(req, res) {
  const clients = await Client.find().exec();
  return res.json(clients);
}
function updateClient(req, res) {}
function deleteClient(req, res) {}

module.exports = {
  addClient,
  getClient,
  getAllClients,
  updateClient,
  deleteClient
};
