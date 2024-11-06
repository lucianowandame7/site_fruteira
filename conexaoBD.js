const Sequelize = require('sequelize')
const sequelize = new Sequelize('banco', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(async () => {
    console.log('Conectado com sucesso!')
    console.log ( await sequelize.query('SELECT * FROM produtos WHERE id = 1', { type: Sequelize.QueryTypes.SELECT }))
    
}).catch((erro) => {
    console.log('Falha ao se conectar: ' + erro)
})

