import express from "express";
import { v4 as uuidv4 } from "uuid";
 
const app = express();
const port = 3000
 
app.use(express.json());// middleware responsavel por interpretar o json do corpo das requisições
 
const users = [];

/*
  Forma de testar
{
  "name":"Dora",
  "email":"dora@gmail.com"
}

 Corrigir erro em get
 */
 
//GET - buscar usuarios
app.get('/users',(req, res) => {
    res.status(200).json(users)
})
 
//GET - buscar usuario pelo ID
app.get('/users/:id',(req, res) => {
    const userId = parseInt(req.params.userId)
    const user = users.find((u) => u.id === userId)
    // const idUsuario = usuarios.find(usuarios)

    if(!user){
        return res.status(404).json({message: 'usuario não encontrado'})
    } 
})
 


//POST - inserir usuario
app.post('/users', (req, res)=>{
    const {name, email} = req.body
 
    if(!name || !email){
        return res.status(400).json({message: 'Nome e email são obrigatórios'})
    }
 
    const newUser = {id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email,
    };

    users.push(newUser)
    res.status(201).json(newUser);
})
 
// TERMINAR  
//PUT - atualizar informações
app.put('/users/:id', (req,res) =>{
    const userId = parseInt(req.params.id); // guardar o id que vem na url atraves dos parametros
    const {name, email} = req.body;
 
    const userIndex = users.findIndex(u => u.id === userId);
 
    if(userIndex === -1){
        return res.status(404).json({message: 'Usuário não encontrado'});
    }
 
    // Atualizando o usuario
    users[userIndex] = {
        ...users[userIndex],
        name: name || users[userIndex].name,
        email: email || users[userIndex].email,
    };

    res.status(200).json(users[userIndex]);
});
 
//Delete - excluir informacoes
app.delete("/users/:id", (req, res)=>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
 
    if(userIndex === -1){
        return res.status(400).json({message: 'Usuário não encontrada'})
    }
 
    notas.splice(userIndex, 1)// remove o objeto de nota do array de notas pelo seu index
    res.status(204).send(); // retorna o status 204 que significa sem conteudo ou no content
 
})
 
//Middleware para rotas nao encontradas
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta http://localhost${port}`);
})
