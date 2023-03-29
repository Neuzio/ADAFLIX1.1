const express = require('express')
const app = express()
const port = 5000
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt') 
const connection = require('./database/conection')
const cadastroUser = require('./database/cadastro_usuario')  
const { where } = require('sequelize')
const usuario = require('./database/cadastro_usuario')


//configurando bodyparser
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

//Configurando ejs
app.set('view engine', 'ejs')

//cofigurando arquivos staticos
app.use(express.static('public'))

//configuração da conexao com (base de dados
connection
.authenticate()
.then(()=>{
    console.log('conexao com base de dados feita com sucesso!')
}).catch((error)=>{
    console.log(error)
})

//Rota principal
app.get('/', (req , res)=>{
    res.render('index')
})

//Rota Home
app.get('/home', (req , res)=>{
    res.send('<h1>Pagina home acessada com sucesso</h1>')
})
//Rota main
app.get('/main', (req , res)=>{
res.render('page/main')
})
//Rota de Login
app.get('/login', (req , res)=>{
    res.render('login')
})
//Rota de Cadastro
app.get('/cadastro', (req , res)=>{
    res.render('cadastro')
})

//Rota de cadastro 2
app.post('/cadastro-user' , (req , res)=>{
var email = req.body.email
var senha = req.body.senha

var salt  = bcrypt.genSaltSync(10)
var hash = bcrypt.hashSync(senha , salt)

    cadastroUser.create({
        email: email,
        senha: hash,
        senha_2: req.body.senha_2
    }).then(function(){
        res.redirect("/login")
    }).catch(function(erro){
        res.send("erro no cadastro" + erro)
    })
})

//Rota logado com sucesso

app.post('/logado', (req , res)=>{
        var email = req.body.email
        var senha = req.body.senha
        
        cadastroUser.findOne({where:{email:email}}).then(usuario =>{
            if(usuario!=undefined){
                var correct = bcrypt.compareSync(senha, usuario.senha)
            if(correct){
              res.redirect('/main')
    }else{
              res.redirect('/cadastro')
    }
    }else{
              res.redirect('/cadastro')
    }
        })
})

//Rota Eu 
app.get('/eu', (req , res)=>{
    res.render('page/eu')
})
//Rota de pacote 
app.get('/pacote', (req , res)=>{
    res.render('page/pacote')
})
//Rota de filmes
app.get('/filmes', (req , res)=>{
    res.render('page/filmes')
})
//Rota de series
app.get('/series', (req , res)=>{
    res.render('page/series')
})
//Rota de animes
app.get('/animes', (req , res)=>{
    res.render('page/animes')
})
//Rota de documentarios
app.get('/documentarios', (req , res)=>{
    res.render('page/documentarios')
})
//Rota de ação
app.get('/acao', (req , res)=>{
    res.render('page/acao')  
})
//Rota de ficção
app.get('/ficcao', (req , res)=>{
    res.render('page/ficcao')  
})
//Rota de terror
app.get('/terror', (req , res)=>{
    res.render('page/terror')  
})
//Rota de fantasia
app.get('/fantasia', (req , res)=>{
    res.render('page/fantasia')  
})
//Rota de aventura
app.get('/aventura', (req , res)=>{
    res.render('page/aventura')  
})
//Rota de guerra
app.get('/guerra', (req , res)=>{
    res.render('page/guerra')  
})

//Rota para play 
app.get('/Homem-Aranha', (req , res)=>{
    res.render('page/Homem-Aranha')
})



//iniciando servidor
app.listen(port , ()=>(
    console.log('Servidor Online')
))