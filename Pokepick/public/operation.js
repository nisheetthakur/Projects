function openPokemon(pID) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/uploadPokemonData/' + pID,
        success: function (data) {
            $('body').html(data);
            console.log(data);
        }
        
    });
}