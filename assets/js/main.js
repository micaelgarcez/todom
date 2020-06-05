const tarefas = [
    {
        id: 10,
        prioridade: 1,
        texto: "Texto texto texto...",
        feita: false
    },
    {
        id: 11,
        prioridade: 1,
        texto: "Texto texto texto...",
        feita: true
    },
    {
        id: 12,
        prioridade: 1,
        texto: "Texto texto texto...",
        feita: true
    },
    {
        id: 13,
        prioridade: 1,
        texto: "Texto texto texto...",
        feita: false
    },
    {
        id: 14,
        prioridade: 1,
        texto: "Texto texto texto...",
        feita: true
    }
]

const table = document.getElementById('table');

function mostrarTarefa(t) {

    // Criar uma nova linha
    let tr = document.createElement('tr');

    // Dar a essa linha a classe adequada (done ou "")
    tr.className = t.feita? 'done' : '';

    // criar um input checkbox
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');

    // Marcar o input checkbnox caso nessário
    input.checked = t.feita;
    input.addEventListener('click', (evt) => {
        t.feita = !t.feita;

        let tr = evt.target.parentNode.parentNode;
        tr.classList.toggle('done');
    })

    // Criar uma célula 
    let tdInput = document.createElement('td');

    // Adicionar o input à célula criada
    tdInput.appendChild(input);

    // Criar a célula de texto (td) e adicionar a ela o texto
    let tdText = document.createElement('td');
    let strPrioridade = ['baixa', 'media', 'alta'][t.prioridade - 1];
    tdText.innerText = `${strPrioridade} ${t.texto}`;

    // por fim, criar um elemento "i" da classe material-icons
    let i = document.createElement('i');
    i.className = 'material-icons';
    // contendo o texto delete
    i.innerText = "delete";
    i.addEventListener('click', (evt) => {
        // verificando confirmação
        if(!confirm("Deseja realmente exluir está tarefa?")){
            return;
        }

        // remove do array de tarefas
        removeTarefaPeloId(t.id);

        // capturando a linha (tr) referente a tarefa a ser removida
        let tr = evt.target.parentNode.parentNode;

        // removendo da DOM
        tr.remove();

        // mostrarTarefas(tarefas);

        // mostrar mensagem de sucesso
        let s = document.querySelector('.sucesso');
        s.style.display = 'block';

        setTimeout(()=>{
            s.style.display = 'none';
        }, 3000)
    })

    // Criar uma célula
    let tdI = document.createElement('td');

    // adicionar à célula criada o elemento i
    tdI.appendChild(i);

    // Adicionar as três células criadas a linha criada.
    tr.appendChild(tdInput);
    tr.appendChild(tdText);
    tr.appendChild(tdI);

    // Adicionar a linha a tabela.
    table.appendChild(tr);
}

function mostrarTarefas(tarefas) {
    table.innerHTML = '';

    for(tarefa of tarefas){
        mostrarTarefa(tarefa);
    }
}

function removeTarefaPeloId(id) {
    // Remover do array / não da Dom
    let pos = tarefas.findIndex(t => t.id == id);
    tarefas.splice(pos, 1);
}

function adicionarTarefa(texto) {
    let regExp = /^#[1-3]\ /;
    regExp.test(texto);

    let desc;
    let prioridade;

    if(regExp.test(texto)){
        prioridade = Number(texto.charAt(1));
        desc = texto.substr(3);
    } else {
        prioridade = 1;
        desc = texto;
    }

    let t = {
        id: tarefas[tarefas.length - 1]?.id + 1 || 1,
        texto: desc,
        prioridade,
        feita: false
    }

    tarefas.push(t);

    mostrarTarefa(t);
}

document.querySelector('#form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    let input = document.querySelector('#tf_2do');
    let text = input.value;
    adicionarTarefa(text);
    input.value = '';
    
})

mostrarTarefas(tarefas);