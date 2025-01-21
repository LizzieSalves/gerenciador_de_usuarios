import express from "express";
import { v4 as uuidv4 } from "uuid";
 
const app = express();
const porta = 3000
 
app.use(express.json());// middleware responsavel por interpretar o json do corpo das requisições
 
const usuarios = [];

/*
  Forma de testar
{
  "name":"Dora",
  "email":"dora@gmail.com"
}

 */
 
//GET - buscar usuarios
app.get('/user',(req, res) => {
    res.status(200).json(usuarios)
})
 
//GET - buscar usuario pelo ID
app.get('/user/:id',(req, res) => {
    const id = req.params.id 
    const idUsuario = usuarios.find((usuarios) => usuarios.id === id)
    // const idUsuario = usuarios.find(usuarios)

    if(!idUsuario){
        return res.status(404).json({message: 'usuario não encontrado'})
    } 
})
 


//POST - inserir usuario
app.post('/user', (req, res)=>{
    const {name, email} = req.body
 
    if(!name || !email === undefined){
        return res.status(400).json({message: 'Todos os campos são nescessarios'})
    }
 
    const novoUsuario = {id: uuidv4(), name, email}
    usuarios.push(novoUsuario)
 
    res.status(201).json(novoUsuario);
})
 
//PUT - atualizar informações
app.put('/user/:id', (req,res) =>{
    const id = req.params.id // guardar o id que vem na url atraves dos parametros
    const {name, email} = req.body
 
    const atualizarUsuario = usuario.find((usuario) => usuario.id === id)
 
    if(!atualizarUsuario){
        return res.status(404).json({message: 'usuario não encontrado'})
    }
 
    notaParaAtualizar.nomeEstudante = nomeEstudante || notaParaAtualizar.nomeEstudante
    notaParaAtualizar.curso = curso || notaParaAtualizar.curso
    notaParaAtualizar.nota = nota !== undefined ? nota : notaParaAtualizar
 
    res.status(200).json(notaParaAtualizar)
})
 
//Delete - excluir informacoes
app.delete("/grades/:id", (req, res)=>{
    const {id} = req.params
    const index = notas.findIndex((nota) => nota.id === id)
 
    if(index === -1){
        return res.status(400).json({message: 'nota não encontrada'})
    }
 
    notas.splice(index, 1)// remove o objeto de nota do array de notas pelo seu index
    res.status(204).send(); // retorna o status 204 que significa sem conteudo ou no content
 
})
 
//Middleware para rotas nao encontradas
app.use((req, res) => {
    res.status(404).json({message: 'Rota nao encontrada'});
});
 
app.listen(porta, ()=>{
    console.log(`Servidor rodando na porta ${porta}`);
})
