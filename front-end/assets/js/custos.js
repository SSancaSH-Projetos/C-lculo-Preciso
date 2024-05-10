function deletarItem(id) {
    fetch(`URL_PARA_SUA_API/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir o item.');
        }
        console.log('Item excluído com sucesso.');
    })
    .catch(error => {
        console.error('Erro ao excluir o item:', error);
    });
}

document.getElementById('id_do_seu_botao').addEventListener('click', function() {
    let idDoItem = 'id_do_seu_item';
    deletarItem(idDoItem);
});
