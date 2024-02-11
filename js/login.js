const saveNameBtn = document.getElementById('saveNameBtn');
const startGameBtn = document.getElementById('startGameBtn');

saveNameBtn.addEventListener('click', function() {
    const playerNameInput = document.getElementById('playerName');

    if (playerNameInput.value.trim() !== '') {

        console.log(playerNameInput.value);

        startGameBtn.style.display = 'inline';
        saveNameBtn.style.display = 'none';
    } else {
        alert('Please insert your name');
    }
});

startGameBtn.addEventListener('click', function() {
    window.location.href = './levels.html';
});

