const levelButtons = document.getElementsByClassName('level_btn');
let selectedButton = null;

//CLICK BUTTON = LEVEL ACTIVE

for (let i = 0; i < levelButtons.length; i++) {
    levelButtons[i].addEventListener('click', function(){
        if (selectedButton) {
            selectedButton.classList.remove('level-active');
        }
        selectedButton = this;
        selectedButton.classList.add('level-active');
    });

}

document.getElementById('play_btn').addEventListener('click', function() {
    if (selectedButton) {
        const  selectedLevel = selectedButton.getAttribute('data-level');
        const levelPage = './' + selectedLevel + '.html';
        window.location.href = levelPage;
    } else {
        alert('Por favor, selecciona un nivel antes de empezar.');
    }
});
