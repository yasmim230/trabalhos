const express = require("express");
const User = require("./models/User");
const bcrypt = require('bcryptjs')
const app = express();



app.use(express.json());



app.get("/user/:id", async (req, res) => {
    const { id } = req.params;

    //await User.findAll({ where: { id: id } })
    await User.findByPk(id)
        .then((user) => {
            return res.json({
                erro: false,
                user
            });
        }).catch(() => {

            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuario encontrado!"
            });
        })
});

app.get("/users", async (req, res) => {

    await User.findAll({
        attributes: ['id', "name", "email", "password"],
        order: [["id", "DESC"]]

    })
        .then((users) => {

            return res.json({
                erro: false,
                users
            });

        }).catch(() => {

            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuario não cadastrado!"
            });

        })

});

app.post("/user", async (req, res) => {
    var dados = req.body;
    dados.senha = await bcrypt.hash(dados.password, 8);

    await User.create(dados).then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso!"
        });

    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum usuario encontrado!"
        });
    });

});

app.put("/user", async (req, res) => {
    const { id, name, email } = req.body;

    await User.update(req.body, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuario editado!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuario não editado!"
            });

        })


});

app.delete("/user/:id", async(req, res) => {
    const { id } = req.params;

    await User.destroy({where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario apagado com sucesso!"
        });

    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuario não apagado!"
        });
    })
});







app.listen(8000, () => {
    console.log("Servidor inicado na porta 8080: http://localhost:8000");
});