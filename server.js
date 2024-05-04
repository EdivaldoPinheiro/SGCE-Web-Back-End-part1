const { z } = require("zod")
const express = require("express")
const req = require("express")
const app = express()
const cors = require('cors');
const users = require('./src/data/users.json')
const patentes = require('./src/data/patentes.json')
const unidades = require('./src/data/unidades.json')
const consultas = require('./src/data/consultas.json')
const jwt = require('jsonwebtoken')

const jwt_pass = "QmNkFEK4yrEdEFGl3zFCu5URM2W6efkut"

app.use(cors())
app.use(express.json())


app.post("/login", (req, res) => {

    const { nip, password } = req.body
    // res.send({email,password})

    const userLoggedIn = users.find((user) => user.NIP == nip && user.password == password)


    if (userLoggedIn) {
       
        // const token = jwt.sign({ id: userLoggedIn.id }, jwt_pass, { expiresIn: '1y', })

        const { password: _, ...user } = userLoggedIn

        return res.json({
            user: user,
           // token: token,
        })
    }
    else{
       return res.send("Usuario ou Palavra passe Incorrecta!")
    }
   
})
app.get("/patentes", (req, res)=>{
    return res.send(patentes)

})
app.get("/unidades", (req, res)=>{
    return res.send(unidades)

})
app.get("/consultas", (req, res)=>{
    return res.send(consultas)

})

app.listen(4000, async () => {
    console.log("Servidor inicializado na porta http://localhost:4000")
})
