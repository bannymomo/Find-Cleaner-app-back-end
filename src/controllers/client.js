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

async function getClient(req, res) {
  const { clientId } = req.params;
  const client = await Client.findById(clientId).exec();
  if (!client) {
    return res.status(404).json("client not found");
  }
  return res.json(client);
}

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
