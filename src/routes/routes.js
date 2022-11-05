const routes = require('express').Router()
const UserController = require('../app/controllers/UserController')
const ForumController = require('../app/controllers/ForumController')
const AlertaSorteController = require('../app/controllers/AlertaSorteController')
const {AllGroupsApi, InviteGenerator} = require('../app/controllers/wppControllers/BlackFridayController')
const {body} = require('express-validator')
const auth = require('../app/middleware/auth')


routes.post('/createuser',[body('email').isEmail()], UserController.CreateUser)

routes.post('/login', UserController.Login) //rota para login
routes.post('/session', UserController.SessionValidate) //rota para verificar se a sess�o � valida

routes.post('/forgotpass', UserController.ForgotPass) //rota para verificar o email e retornar para o email dela uma senha provisoria e  um link para resetar essa senha
routes.get('/resetpass/:id/:provpass/:token/:rede', UserController.ResetPass) //rota reseta a senha recebendo o token e atualizando a senha .

routes.post('/indicaramigo', UserController.IndicateFriend)//rota envia para msg para a o wpp indicado.

//rotas que precisam de autorizacao.
routes.post('/finduserall', auth, UserController.FindUserAll) //rota para retornar as rotas com todos os dados do usuario menos a senha

routes.post('/findtimer', auth, UserController.AllTimers) //rota retorna um array com todos os horarios do usuario
routes.post('/attall', auth, UserController.AttAll) //rota que atualiza os dados do usuario

routes.post('/activetime', auth, UserController.ActivedTime) //rota para ativar ou desativar os horarios e atualiza-los tamb�m.
routes.post('/deleteaccount', auth, UserController.DeletAccount) //rota para deletar account ou bloquear

//forum routes
//rota para todos os murais
routes.post('/allposts', ForumController.FindAllPosts)
routes.post('/post', ForumController.FindPost)
routes.post('/comentario', ForumController.FindComentario)

routes.post('/createpost',auth,ForumController.CreatePost)
routes.post('/curtidapost',auth ,ForumController.CurtidaPost)
routes.post('/createcomentario',auth , ForumController.CreateComentario)
routes.post('/curtidacomentario', auth , ForumController.CurtidaComentario)


routes.post('/alertasorte/allloterias', auth, AlertaSorteController.Allloterias)
routes.post('/alertasorte/aboutuser', auth, AlertaSorteController.AboutUser)
routes.post('/alertasorte/attloteria', auth, AlertaSorteController.AttLoterias)
routes.post('/alertasorte/attuser', auth, AlertaSorteController.AttUser)
routes.post('/alertasorte/desativar', auth, AlertaSorteController.Desativar)


routes.get('/blackfriday/allgroups', AllGroupsApi)
routes.get('/blackfriday/invite', InviteGenerator)


module.exports = routes;