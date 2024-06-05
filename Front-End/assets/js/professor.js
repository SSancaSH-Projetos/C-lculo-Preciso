function fetchProfessores() {
    fetch('https://be-calculo-preciso.azurewebsites.net//usuarios/professores')
        .then(response => response.json())
        .then(data => exibirProfessores(data))
        .catch(error => {
            console.error('Erro ao buscar professores:', error);
        });
}

function exibirProfessores(data) {
    const tableBody = document.querySelector('.professores-disponiveis tbody');
    tableBody.innerHTML = '';

    data.forEach(professor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${professor.nome}</td>
            <td>${professor.email}</td>
            <td>
                <i class="fa-solid fa-info-circle"></i>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

fetchProfessores();
