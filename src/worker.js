const users = require('./models/users')
const brokerVariables = require('./adapters/broker')

async function run() {
  const { createUser, updateUser, deleteUser } = await brokerVariables()

  createUser.on('message', async (message, content, ackOrNack) => {
    await users.create({ data: content.data })
    console.log(`Message ${content.id} processed successfully`)
    ackOrNack()
  })

  updateUser.on('message', async (message, content, ackOrNack) => {
    await users.update({
      where: { id: content.data.id },
      data: {
        name: content.data.name,
        city: content.data.city,
        avatar: content.data.avatar
      }
    })
    console.log(`Message ${content.id} processed successfully`)
    ackOrNack()
  })

  deleteUser.on('message', async (message, content, ackOrNack) => {
    await users.delete({ where: { id: content.data.id } })
    console.log(`Message ${content.id} processed successfully`)
    ackOrNack()
  })

  console.log('Worker started')
}

run().catch(err => console.error(err))
