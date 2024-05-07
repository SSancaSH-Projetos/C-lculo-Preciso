function fetchUsuarios() {
    fetch('http://localhost:8080/usuarios')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('alunosTableBody');
            tableBody.innerHTML = '';

            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.curso}</td>
                <td>${usuario.tipoUsuario}</td>
                <td>
                    <i class="fa-solid fa-pen"></i>
                    <i class="fa-solid fa-trash"></i>
                </td>
            `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar usuários:', error);
        });
}

window.addEventListener('load', fetchUsuarios);