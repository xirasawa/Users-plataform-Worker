const rascal = require('rascal')
const config = require('../app/config.json')

const broker = rascal.BrokerAsPromised.create(config)

async function brokerVariables() {
  const createUser = await (await broker).subscribe('createSubscription')
  const updateUser = await (await broker).subscribe('updateSubscription')
  const deleteUser = await (await broker).subscribe('deleteSubscription')

  return { createUser, updateUser, deleteUser }
}

module.exports = brokerVariables
