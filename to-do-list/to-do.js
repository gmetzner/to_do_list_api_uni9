function enviaDadoToDo(event) {
    event.preventDefault();

    const name = document.getElementById("newTaskName").value;
    const description = document.getElementById("newTaskDescription").value;

    axios.post('https://todolist-api.edsonmelo.com.br/api/task/new/', {
        name: name,
    }, {
        headers: {
            'Authorization': '94D98A21A6C4FA90810A',
            'Content-Type': 'application/json',

        }
    })
        .then(function (response) {
            console.log(response.data);
            //const novaTarefa = response.data;
            const tableBody = document.getElementById('tableBody');
            const novaLinha = `
                <tr>
                    <th scope="row">${getRandomId()}</th>
                    <td>${name}</td>
                    <td>${description}</td>
                    <td>0</td>
                    <td>${gerarData()}</td>

                    <td>
                        <button class="btn btn-sm btn-warning" onclick="editTask(${response.data.id})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="excluiTarefa(${response.data.id})">Excluir</button>
                        </td>
                </tr>
            `;
            tableBody.innerHTML += novaLinha;

        })
        .catch(function (error) {
            console.log(error);
        });




}
function gerarData() {
    let data = new Date();
    let dia = data.getDate().toString().padStart(2, '0');
    let mes = (data.getMonth() + 1).toString().padStart(2, '0');
    let ano = data.getFullYear();
    return ano + '-' + mes + '-' + dia;
}

function getRandomId() {
    const randomNum = Math.floor(Math.random() * 100);
    return randomNum;
}
var nameUser = document.getElementById("username");
var passUser = document.getElementById("password");

function searchDado() {
    //event.preventDefault();

    const name = document.getElementById("newTaskName").value;
    const description = document.getElementById("newTaskDescription").value;
    const searchTask = document.getElementById("searchTask").value;

    axios.post('https://todolist-api.edsonmelo.com.br/api/task/search/', {
        name: name,
    }, {
        headers: {
            'Authorization': '94D98A21A6C4FA90810A',
            'Content-Type': 'application/json',

        }
    })
        .then(function (response) {


            console.log(response.data);
            let idTask = response.data[0].id;
            let nameTask = response.data[0].name;
            let data = response.data[0].date;
            let realized = response.data[0].realized;

            if (searchTask !== '') {
                adicionaTarefaNaTabela(idTask, nameTask, data, realized);

            } else {
                alert('Digite uma tarefa.')
            }

        })
        .catch(function (error) {
            console.log(error);
        });




}
function adicionaTarefaNaTabela(id, name, date, realizada) {
    const tableBody = document.getElementById('tableBody');

    const novaLinha = `
        <tr>
            <th scope="row">${id}</th>
            <td>${name}</td>
            <td>Teste Descrição</td>
            <td>${realizada}</td>
            <td>${date}</td>

            <td>
                <button class="btn btn-sm btn-warning">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="excluiTarefa(${id})">Excluir</button>
                </td>
        </tr>
    `;
    tableBody.innerHTML += novaLinha;



}
function excluiTarefa(idTask) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
        axios.delete(`https://todolist-api.edsonmelo.com.br/api/task/delete/`,
            {
                id: idTask,
            }, {
            headers: {
                'Authorization': '94D98A21A6C4FA90810A',
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                alert("Tarefa excluída com sucesso.");
                location.reload();
            })
            .catch(function (error) {
                console.log(error);
                alert("Erro ao excluir tarefa.");
            });
    }
}
function excluirUsuario() {
    if (confirm("Tem certeza que deseja excluir este usuário? Você será desconectado."))
        axios.delete('https://todolist-api.edsonmelo.com.br/api/user/delete/', {
            user: user,
            password: pass
        }, {
            headers: {
                'Authorization': '94D98A21A6C4FA90810A',
                'Content-Type': 'application/json',

            }
        })
            .then(function (response) {
                console.log(response.data);


            })
            .catch(function (error) {
                console.log(error);
            });

}

