function enviaDadoCadastro(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    axios.post('https://todolist-api.edsonmelo.com.br/api/user/new/', {
        name: name,
        password: password,
        email: email,
        username: username
    }, {
        headers: {
            'Authorization': '',
            'Content-Type': 'application/json',
        }
    })
        .then(function (response) {
            if (response.data.message == 'User Already Exists') {

                alert('Usuário já existente na base.');
                console.log(response.data);

                window.location.href = "login.html"

            } else {
                alert('Usuário criado com sucesso');
                console.log(response.data);

                console.log('oi')
                window.location.href = "login.html"

            }

        })
        .catch(function (error) {
            console.log(error);
            alert('Erro ao criar usuário. Tente novamente.');
        });


}

function editUserAndPass(event) {
    event.preventDefault();


    const username = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const newUser = document.getElementById("new-username").value;
    const newPass = document.getElementById("new-password").value;


    axios.put('https://todolist-api.edsonmelo.com.br/api/user/updateuserpass/', {
        username: username,
        password: pass,
        new_username: newUser,
        new_password: newPass
    }, {
        headers: {
            'Authorization': '94D98A21A6C4FA90810A',
            'Content-Type': 'application/json',

        }
    })
        .then(function (response) {

            console.log(response.data);
            alert('Usuário editado.')
            window.location.href = "login.html"


        })
        .catch(function (error) {
            console.log(error);
        });
}