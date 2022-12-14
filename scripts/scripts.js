//inicio do backend do monitor de chamados
const chamados = []
const input = document.querySelector("#input-adicionar")

let tempoLimite = 30 * 100 * 1000;

const aoExpirar = (chamado) => {
  alert(`Chamado expirou: ${chamado.id}!`)
}

const contagemRegressiva = (restante, chamado) =>{

  const intv = setInterval(() => {
 
     let idLinha = `chamado-${chamado.id}`
     let linha = document.getElementById(idLinha)
    if (!linha) {
      linha = document.createElement('tr')
      linha.id = idLinha;
      for (let i = 0; i < 3; i++) {
        linha.appendChild(document.createElement("td"))
      }
      tbody.appendChild(linha)
    }
    let cels = document.querySelectorAll(`#${idLinha} > td`)

    if (restante == 0) {
      clearInterval(intv)
      aoExpirar(chamado)
      linha.remove()
    }

    cels[0].innerText = chamado.id;
    cels[1].innerText = fmtRestante(restante)
    cels[2].innerHTML = '<button id="button'+chamado.id+'"class="w-100 btn btn-danger">Reiniciar Tempo</button>'
    document.querySelector('#button'+chamado.id+'').addEventListener('click', () => {
      clearInterval(intv)
      contagemRegressiva(3000000, chamado)
     })

  restante = restante - 1000
},1000)
}
const msRestante = (dtInicio, dtFim) => {
  return tempoLimite - (dtFim.getTime() - dtInicio.getTime());
}

const fmtRestante = (restante) => {
  const mins = Math.floor(restante / 60 / 1000);
  const segs = Math.floor(restante / 1000 % 60);
  return restante > 0 ?
    `${(mins + '').padStart(2, '0')}:${(segs + '').padStart(2, '0')}` :
    'Expirado!'
}


const tbody = document.querySelector("#table-body")


document.querySelector('#btn-adicionar').addEventListener('click', () => {

  const listachamados = new Object()
      listachamados.id = input.value
      listachamados.registro = new Date()
      listachamados.intervalo = contagemRegressiva(3000000, listachamados)
      chamados.push(listachamados)

 

})




/**document.querySelector('#btnresetar').addEventListener('click', (evt) => {
  let idx = Number(evt.target.dataset.index);
  chamados[idx]['registro'] = new Date()
}) */

//fim do backend do monitor de chamados

//inicio do backend do gerador de texto pro email

const btn = document.getElementById("btn-gerartexto")
const btn2 = document.getElementById("btn-copiartexto")
//const btn3 = document.getElementById("btn-apagartexto")

btn.addEventListener("click", () => {

  const divtxt = document.getElementById("txtemail");
  const radios = document.getElementsByName('gridRadios');
  let inpnumerochamado = document.getElementById('nch').value;
  let inptelefonedousuario = document.getElementById('nusr').value;
  let inpdata = document.getElementById('dttn').value;
  let inphora = document.getElementById('htn').value;
  let string;


  //tratanto o formato que a data vai ser exibida no texto mediante o click no bot??o
  inpdata = new Date();
  let inpdataFormatada = ((inpdata.getDate())) + "/" + ((inpdata.getMonth() + 1)) + "/" + inpdata.getFullYear();

  //Criando elemento paragrapho
  const paragrapho1 = document.createElement("p");
  const paragrapho2 = document.createElement("p");
  const imagem = document.createElement("img");

  //l??gica para os radio buttons exibirem o n?? correspondente a tentativa de contato
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio") {
      if (radios[i].checked) {
        string = radios[i].value;
        break;
      }
    }
  }

  //l??gica para os radio buttons exibirem mudarem uma parte do texto correspondente a tentativa de contato

  for (let i = 0; i < radios.length; i++) {

    if (radios[i].id === "gridRadios1", "gridRadios2") {
      if (radios[i].checked) {
        paragrapho1.innerText = `${inpnumerochamado} - `.concat(string).concat(`?? aviso de tentativa de contato com o cliente
        Prezado Cliente,
        A equipe de Suporte T??cnico Remoto informa que n??o obteve sucesso na `).concat(string).concat(`?? tentativa de contato pelo(s) telefone(s) ${inptelefonedousuario} realizada no dia ${inpdataFormatada} ??s ${inphora} com o objetivo de iniciar o atendimento da ${inpnumerochamado}.
        Dessa forma, realizaremos mais uma tentativa de atendimento sem contato telef??nico, aplicando procedimento t??cnico com o objetivo de solucionar a demanda do chamado sem que haja interfer??ncia na utiliza????o do seu microcomputador.
        Eventualmente, poder?? ser necess??rio autoriza????o para acessar a sua ??rea de trabalho. Se for o caso, enviaremos uma solicita????o de acesso que aparecer?? no centro do seu monitor, conforme janela apresentada abaixo:
        `)


        paragrapho2.innerText = `
        Neste caso, basta clicar no bot??o ???ACCEPT???, para que o atendimento seja iniciado.
        Caso n??o seja poss??vel atender diretamente a demanda sem contato telef??nico ou caso n??o seja respondido ou n??o autorizado o acesso remoto, esta demanda ser?? conclu??da sem o devido atendimento, sendo considerado como um chamado improdutivo.

        Atenciosamente,
        Warleyson Costa Roma `;

        imagem.src = "src/imgpoo.png";

        divtxt.append(paragrapho1);
        divtxt.append(imagem);
        divtxt.append(paragrapho2);
        
      };
    };

    if (radios[i].id === "gridRadios3") {
      if (radios[i].checked) {
        paragrapho1.innerText = `${inpnumerochamado} - `.concat(string).concat(`?? aviso de tentativa de contato com o cliente
        Prezado Cliente,
        A equipe de Suporte T??cnico Remoto informa que n??o obteve sucesso na `).concat(string).concat(`?? tentativa de contato pelo(s) telefone(s) ${inptelefonedousuario} realizada no dia ${inpdataFormatada} ??s ${inphora} com o objetivo de iniciar o atendimento da ${inpnumerochamado}.
        Dessa forma, realizaremos a ??ltima tentativa de atendimento sem contato telef??nico, aplicando procedimento t??cnico com o objetivo de solucionar a demanda do chamado sem que haja interfer??ncia na utiliza????o do seu microcomputador.
        Eventualmente, poder?? ser necess??rio autoriza????o para acessar a sua ??rea de trabalho. Se for o caso, enviaremos uma solicita????o de acesso que aparecer?? no centro do seu monitor, conforme janela apresentada abaixo:
        `)


        paragrapho2.innerText =`
        Neste caso, basta clicar no bot??o ???ACCEPT???, para que o atendimento seja iniciado.
        Caso n??o seja poss??vel atender diretamente a demanda sem contato telef??nico ou caso n??o seja respondido ou n??o autorizado o acesso remoto, esta demanda ser?? conclu??da sem o devido atendimento, sendo considerado como um chamado improdutivo.

        Atenciosamente,
        Warleyson Costa Roma `

      };
    };
  

    if (radios[i].id === "gridRadioschfch") {
      if (radios[i].checked) {
        paragrapho1.innerText = `${inpnumerochamado} - `.concat(` Chamado Fechado
        Prezado Cliente,
        
        A equipe de Suporte T??cnico Remoto informa que ap??s 3 tentativas de contato (por telefone e e-mail) para atendimento da ${inpnumerochamado}, n??o foi poss??vel proceder com o atendimento do chamado, sendo conclu??do como improdutivo.

        Caso ainda necessite de suporte t??cnico, solicitamos registrar um novo chamado, uma vez que a reabertura desse ser?? considerada indevida.

        Ressaltamos que a equipe de Suporte T??cnico preza pela seguran??a das informa????es do usu??rio e por isso adota procedimentos relacionados as tentativas de contato e autoriza????o de usu??rio para realiza????o do atendimento.

        Com o objetivo de evitarmos outros chamados improdutivos, solicitamos que sejam informados outro(s) n??mero(s) telef??nico(s) (se poss??vel, inclusive celular) para que possa ser facilmente encontrado. O(s) e-mail(s) permanecer??(??o) sendo enviado(s) como forma alternada de contato e localiza????o. Desde j?? agradecemos a compreens??o.

        Atenciosamente,
        Warleyson Costa Roma`)

      
        paragrapho2.parentNode.removeChild(paragrapho2);
        imagem.parentNode.removeChild(imagem);
      };
    };
  };

  /**
  Texto padr??o para 1??,2?? e 3?? tentativas de contato.
    
  paragrapho1.innerText = `${inpnumerochamado} - `.concat(string).concat(`?? aviso de tentativa de contato com o cliente
    Prezado Cliente,
    A equipe de Suporte T??cnico Remoto informa que n??o obteve sucesso na `).concat(string).concat(`?? tentativa de contato pelo(s) telefone(s) ${inptelefonedousuario} realizada no dia ${inpdataFormatada} ??s ${inphora} com o objetivo de iniciar o atendimento da ${inpnumerochamado}.
    Dessa forma, realizaremos ${strgtent1} tentativa de atendimento sem contato telef??nico, aplicando procedimento t??cnico com o objetivo de solucionar a demanda do chamado sem que haja interfer??ncia na utiliza????o do seu microcomputador.
    Eventualmente, poder?? ser necess??rio autoriza????o para acessar a sua ??rea de trabalho. Se for o caso, enviaremos uma solicita????o de acesso que aparecer?? no centro do seu monitor, conforme janela apresentada abaixo:
    `)


  paragrapho2.innerText = `
    Neste caso, basta clicar no bot??o ???ACCEPT???, para que o atendimento seja iniciado.
    Caso n??o seja poss??vel atender diretamente a demanda sem contato telef??nico ou caso n??o seja respondido ou n??o autorizado o acesso remoto, esta demanda ser?? conclu??da sem o devido atendimento, sendo considerado como um chamado improdutivo.

    Atenciosamente,
    Warleyson Costa Roma `;

  imagem.src = "src/imgpoo.png";

  divtxt.append(paragrapho1);
  divtxt.append(imagem);
  divtxt.append(paragrapho2);

  //console.log(divtxt);
  */

  //l??gica para bot??o copiar texto
  btn2.addEventListener("click", () => {
    //let mstnumch = inpnumerochamado;
    let copytxt = divtxt.innerText;
    navigator.clipboard.writeText(copytxt).then(() => {

      //alert(`Chamado n?? ${mstnumch} copiado para area de transferencia!`);
    });

  });

  //l??gica para bot??o apagar texto
  document.getElementById('infs').onreset = () => {
    let clrtext = divtxt;
    clrtext.innerText = "";
    //return confirm("Gostaria de apagar todas as informa????es?");
  };

});


//final do backend do gerador de texto pro email

