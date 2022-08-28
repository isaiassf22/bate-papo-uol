let inicio =prompt('digite seu nome')

function enviarNome(){
    let nome={name:inicio}
    console.log(inicio)
    const promisse=axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',nome)
    promisse.then(pedirInformacoes) // se der certo
    promisse.catch(deuErro)// se der errado

}

enviarNome()

function pedirInformacoes(){
    promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    promisse.then(dadosChegaram)
}

function dadosChegaram(dados){
    console.log(dados)
    console.log(dados.data)
    carregarMensagens()
}
function deuErro(erro){
    console.log(erro.response)
    console.log(erro.response.status)
    let numeroDoErro=erro.response.status
    if(numeroDoErro==400 || numeroDoErro==422){
        alert('nome inapropriado.')
    }
    if (numeroDoErro==401){
        alert('Pagina nao encontrada')
    }
    if(numeroDoErro==409){
        alert('Este nome já esta em uso.')
    }
    if(numeroDoErro==509){
        alert('erro desconhecido, tente novamente mais tarde')
    } 
    window.location.reload()
}
function carregarMensagens(){ 
    const promisse2=axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promisse2.then(renderizarMensagens)

}
function renderizarMensagens(messages){
    console.log(messages.data)
    let listaDeMensagens=messages.data
    let chat=document.querySelector('main')
    let renderizando=''
    for(i=0;i<listaDeMensagens.length;i++){
        if(listaDeMensagens[i].type=='status'){
            renderizando+=`<div class="mensagem entrar-sair">
            <span>(${listaDeMensagens[i].time})</span><span><strong>${listaDeMensagens[i].from}</strong></span>${listaDeMensagens[i].text} 
            </div>
            `
        }
        if(listaDeMensagens[i].type=='message'){
            renderizando+=` <div class="mensagem normal">
            <span>(${listaDeMensagens[i].time})</span><span><strong>${listaDeMensagens[i].from}</strong></span><span>para</span><strong>${listaDeMensagens[i].to}:</strong>${listaDeMensagens[i].text}
            </div>
            `
        }
        if (listaDeMensagens[i].type=='private_message'){
             renderizando+=`<div class="mensagem reservada">
             <span>(${listaDeMensagens[i].time})</span><span><strong>${listaDeMensagens[i].from}</strong></span> reservadamente para<strong>${listaDeMensagens[i].to}:</strong>${listaDeMensagens[i].text}
            </div>
            `
        
        }
        
    }
    console.log(renderizando)
    chat.innerHTML=renderizando
    setInterval(carregarMensagens,10000)
}
 function enviarMensagem(){
    let input=document.querySelector('.escrever')
    let conteudo=input.value
    let novaMensagem= {from:inicio, to:'Todos', text:conteudo,type:'message'}
    const promisse=axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',novaMensagem)
    promisse.then(carregarMensagens)
    console.log(novaMensagem)
}