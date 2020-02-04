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
async function updateClient(req, res) {
  const { clientId } = req.params;
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

  const fields = {
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
  };
  const client = await Client.findById(clientId);

  Object.keys(fields).forEach(key => {
    if (fields[key] !== undefined) {
      client[key] = fields[key];
    }
  });
  await client.save();
  return res.json(client);
}

async function deleteClient(req, res) {
  const { clientId } = req.params;
  const client = await Client.findByIdAndDelete(clientId).exec();
  if (!client) {
    return res.status(404).json("client not found");
  }
  return res.status(200).json(client);
}

module.exports = {
  addClient,
  getClient,
  getAllClients,
  updateClient,
  deleteClient
};
