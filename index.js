const button = document.querySelector('#search-button')

getDicionaryData = async (valor) => {
    const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${valor}`)
    const json = await data.json()
    return json;
}

document.addEventListener('DOMContentLoaded', () => {
    button.addEventListener('click', require);
});

function require() {

    const info = document.querySelector('.info')
    const input = document.querySelector('#search-value')
    let valor = input.value

    getDicionaryData(valor).then(
        (mensagem) => {
        info.innerHTML = (`
            <div class = "titulo">
                <div>
                    <h1>${mensagem[0]['word']}</h1>
                    <span>${mensagem[0]['phonetic']}</span>
                </div>
                <div id ="play_button"><img src="./resources/play-button-svgrepo-com.svg"></div>
            </div>
            <div class="especifico">
                <section class = "specification">
                    <hr data-content="verb">
                    <sub>Meaning</sub>
                    <ul class = "exemplos">
                        ${mensagem[0].meanings[0].definitions.map((definition) => `<li>${definition.definition}</li>`).join('')}
                    </ul>
                </section>
            </div>
        `)

        const playButton = document.querySelector('#play_button');
        playButton.addEventListener('click', playAudio.bind(null, mensagem[0].phonetics[0].audio));

        }).catch(
        (erro) => {
        info.innerHTML = (`
            <div class = "titulo">
                <h1>${erro}</h1>
                <span>Ooooops...</span>
            </div>
        `)
        }
    )
}

function playAudio(audioSrc) {
    new Audio(audioSrc).play();
}