const Sequelize = require("sequelize");

const sequelize = new Sequelize('celke', "root", "123456789", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(function(){
    console.log("A conexão foi concluída com sucesso!");
}).catch(function(){
    console.log("A conexão não foi concluída com exito!")
})
module.exports = sequelize;