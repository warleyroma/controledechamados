const chamados = []

const tempoLimite = 30 * 60 * 1000;

const aoExpirar = (chamado) => {
  alert(`Chamado expirou: ${chamado.id}!`)
}

const intv = setInterval(()=> {
  for(let i = chamados.length - 1; i >= 0; i--) {
  	const chamado = chamados[i];
  	const idLinha = `chamado-${chamado.id}`;
  	let linha = document.getElementById(idLinha);
    if(!linha) {
    	linha = document.createElement('tr')
      linha.id = idLinha;
      for(let i = 0; i < 3; i++) {
        linha.appendChild(document.createElement("td"))
      }
      tbody.appendChild(linha)
    }
    const cels = document.querySelectorAll(`#${idLinha} > td`)
    const restante = msRestante(chamado.registro, new Date())
    cels[1].innerText = chamado.id;
    cels[2].innerText = fmtRestante(restante)
    
    if(restante <= 0) {
    	// logica pra chamado expirado
      aoExpirar(chamado)
      chamados.splice(i, 1)
      linha.remove()
    }
  }
}, 1000)

const msRestante = (dtInicio, dtFim) => {
	return tempoLimite - (dtFim.getTime() - dtInicio.getTime());
}

const fmtRestante = (restante) => {
	const mins = Math.floor(restante / 60 / 1000);
	const segs = Math.floor(restante / 1000 % 60);
  return restante > 0 ? 
  	`${(mins+'').padStart(2, '0')}:${(segs+'').padStart(2, '0')}` : 
    'Expirado!'
}

const input = document.querySelector("#input-adicionar")
const tbody = document.querySelector("#table-body")

document.querySelector('#btn-adicionar').addEventListener('click', ()=> {
	if(input.value 
  && input.value.length 
  && !chamados.find(x=> x.id === input.value)) {
    chamados.push({ id: input.value, registro: new Date() })
  }
})