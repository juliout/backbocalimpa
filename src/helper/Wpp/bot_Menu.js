module.exports = [
    {
        "id": '1',
        "query": "para bot de ativação de serviço",
        "msg" : `*Olá, você escolheu o demo-bot de ativação de serviços.*
                \nVamos mostrar como funciona o fluxo de um bot para assinar e ativar um serviço qualquer em uma lista:`,               
        "list": [
                    {   
                        'id' : '1',
                        'query' : 'conteúdo',
                        'msg' : 'para escolher o tipo de conteúdo que deseja receber',
                        'list' : []
                    },
                    {
                        'id' : '2',
                        'query' : 'alertas',
                        'msg' : 'para escolher o serviço de alerta que deseja ativar',
                        'list' : []
                    },
                    {
                        'id' : '3',
                        'query' : 'jogos',
                        'msg' : `para escolher um de nossos zapgames`,
                        'list' : [
                            {
                                'choice' : 'quiz',
                                'iniciar' : '' 
                            },
                            {
                                'choice' : 'adivinha só',
                                'iniciar' : '' 
                            },
                            {
                                'choice' : 'o que é, o que é',
                                'iniciar' : '' 
                            },
                            {
                                'choice': 'menu',
                                'message' : ''
                            }
                        ]
                    },
                    {   
                        'id' : '4',
                        'query' : 'apostas',
                        'msg' : 'para conhecer nossos bots de bolão e apostas',
                        'list' : []
                    },
                    {
                        'id' : '5',
                        'query' : 'informa',
                        'msg' : 'para escolher um de nossos serviços informativo',
                        'list' : []
                    },
                ]
    },
    {
        "id": '2',
        "query": "para bot de cancelamento de serviço",
        "msg" : `*Olá, você escolheu o demo-bot de cancelamento de serviços.* 
        \nVamos mostrar como funciona o fluxo de um bot para desativar um serviço qualquer previamente ativado
        \nEscolha na lista o serviço que deseja desativar.
        \nlista de serviços: 
        `,
        "list": [
            {   
                'id' : '1',
                'query' : 'Futebol',
                'msg' : 'Deseja realmente Cancelar o Serviço?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Desativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '2',
                'query' : 'Esportes',
                'msg' : 'Deseja realmente Cancelar o Serviço?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Desativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '3',
                'query' : 'Universo e o espaço',
                'msg' : 'Deseja realmente Cancelar o Serviço?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Desativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '4',
                'query' : 'Nosso planeta',
                'msg' : 'Deseja realmente Cancelar o Serviço?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Desativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '5',
                'query' : 'Mundo Animal',
                'msg' : 'Deseja realmente Cancelar o Serviço?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Desativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '6',
                'query' : 'Personalidades',
                'msg' : 'Deseja realmente Cancelar o Serviço?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Desativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '7',
                'query' : 'Sexo',
                'msg' : 'Deseja realmente Cancelar o Serviço?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Desativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '8',
                'query' : 'Mundo Pop',
                'msg' : 'Deseja realmente Cancelar o Serviço?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Desativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '9',
                'query' : 'Historia',
                'msg' : 'Deseja realmente Cancelar o Serviço?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Desativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '10',
                'query' : 'Celebridades',
                'msg' : 'Deseja realmente Cancelar o Serviço?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Desativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '11',
                'query' : 'Corpo Humano',
                'msg' : 'Deseja Cancelar o Serviço?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Desativado*, para Desativar o serviço,\nVá no meu e acesse a area de 'cancelar serviço'"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
        ]
    },
    {
        "id": '3',
        "query": "para o offer bot",
        "msg" : ''
    },
    {
        "id": '4',
        "query": "Para bot quiz",
        "msg" : 'Escolha qual tipo de quiz você quer escolher!',
        "list":[
            {   
                'id' : '1',
                'query' : 'quiz',
                'msg' : '',
            }
        ]
    },
    {
        "id": '5',
        "query": "para o vc sabia",
        "msg" : 'Olá, bem vindo ao vc sabia, a revista de curiosidades mais legal do zap!',
        "subMsg" :  'Qual temas vc quer receber curiosidades?',
        "list": [
            {   
                'id' : '1',
                'query' : 'Futebol',
                'msg' : 'Deseja ativar o conteudo ?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Ativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '2',
                'query' : 'Esportes',
                'msg' : 'Deseja ativar o conteudo ?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Ativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '3',
                'query' : 'Universo e o espaço',
                'msg' : 'Deseja ativar o conteudo ?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Ativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '4',
                'query' : 'Nosso planeta',
                'msg' : 'Deseja ativar o conteudo ?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Ativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '5',
                'query' : 'Mundo Animal',
                'msg' : 'Deseja ativar o conteudo ?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Ativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '6',
                'query' : 'Personalidades',
                'msg' : 'Deseja ativar o conteudo ?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Ativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '7',
                'query' : 'Sexo',
                'msg' : 'Deseja ativar o conteudo ?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Ativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '8',
                'query' : 'Mundo Pop',
                'msg' : 'Deseja ativar o conteudo ?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Ativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '9',
                'query' : 'Historia',
                'msg' : 'Deseja ativar o conteudo ?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Ativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '10',
                'query' : 'Celebridades',
                'msg' : 'Deseja ativar o conteudo ?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "*Ativado*,\npara Desativar o serviço,\nVá no meu e acesse a area de *cancelar serviço*"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
            {   
                'id' : '11',
                'query' : 'Corpo Humano',
                'msg' : 'Deseja ativar o conteudo ?',
                'list' : [
                    {
                        'choice' : 'sim',
                        'message' : "Ativado, para Desativar o serviço,\nVá no meu e acesse a area de 'cancelar serviço'"
                    },
                    {
                        'choice' : 'não',
                        'message' : 'ok, operação cancelada, digite menu e volte ao menu'
                    }
                ]
            },
        ]
    },
    {
        "id": '6',
        "query": "Horoscopo",
        "msg" : 'Olá, para receber seu horóscopoZap, você tera que completar certas informações!!\n Para passar para proxima pergunta escreva Sim, para pausar digite parar ou Menu',
        "horoscopo": true
    },
    {
        "id": '7',
        "query": "para o bot de alerta rodizio",
        "msg" : 'Olá, cansado de tomar multas por esquecer do dia rodízio? Relaxa, a gente te envia um lembrete aqui pelo zap um pouco antes do início  horário de restrição.\nQuer experimentar?,\nSelecione a opção!!',
        "verify": 'rodizio',
        "list": [
            {
                'id': '1',
                'query': 'sim',
                'msg': 'Qual o número final da placa do seu veículo?',
                'list': [
                    {
                        'choice': '1 ou 2',
                    },
                    {
                        'choice': '3 ou 4',
                    },
                    {
                        'choice': '5 ou 6',
                    },
                    {
                        'choice': '7 ou 8',
                    },
                    {
                        'choice': '9 ou 0',
                    },
                    {
                        'choice': 'menu',
                    }
                ]
            },
            {
                'id': '1',
                'query': 'Não',
                'msg': 'Okay, volte quando quiser!!',
                'list': []
            }
        ]
    },
    {
        "id": '8',
        "query": "para o bot de 'bolão esportivo'",
        "msg" : ''
    },
    {
        "id": '9',
        "query": "para os bots de cuidados de saúde",
        "msg" : ''
    },
    {
        "id": '10',
        "query": "para o bot de envio de salmos",
        "msg" : '*Olá, para receber diariamente o salmo do dia no seu zap envie a palavra "salmos"*.\n O serviço é gratuito e pode ser cancelado a qualquer momento.\nBasta enviar a palavra "menu" e selecionar a opção "cancelamento de serviço". \nTenha um lindo e abençoado dia!'
    },
    {
        "id": '11',
        "query": "para o bot de envio de piadas",
        "msg" : ''
    }
]
