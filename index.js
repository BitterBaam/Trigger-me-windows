const { ipcRenderer } = require('electron')

var currentData = null;
var hasLoaded = false;

let elementInit = () => {
    let loading = document.createElement("h2")
    loading.setAttribute("id", "loading")
    loading_text = document.createTextNode("loading...")

    loading.appendChild(loading_text)
    document.querySelectorAll("body")[0].appendChild(loading)

    ipcRenderer.on('onSoundData', (event, sounds) => {
        var iterationCount = 0;
        let audioReturnArray = []
    
        sounds.forEach(sound => {
            var container = document.getElementById("sound_bites")

            var audio = document.createElement("audio");
            audio.setAttribute("controls", "")
            var source = document.createElement("source");
            source.setAttribute("src", "http://localhost:8000/" + sound.location)
            audio.appendChild(source)

            var label = document.createTextNode(sound.name)
            
        
            container.appendChild(audio)
            container.appendChild(label)
        
            
            const audioListener = event => {
                iterationCount++
                
                let numberOfSounds = document.getElementById("sound_bites").children.length
                if(numberOfSounds === iterationCount)
                {
                    whenLoaded(audioReturnArray)
        
                }
            }
        
            audio.addEventListener('canplaythrough',audioListener, false);

            audioReturnArray.push({name: sound.name, audio})
        });
    })
    
    let startBtn = document.getElementById("fuck_with_me_btn")
    startBtn.setAttribute("onClick", fuckWithMeFunc())
}

const whenLoaded = soundData => {
    console.log("helasdsa")
    let loading = document.getElementById("loading")
    loading.setAttribute("hidden", "")
    let soundDiv = document.getElementById("sound_bites").removeAttribute("hidden")
    
    let btn = document.getElementById("fuck_with_me_btn")
    btn.removeAttribute("disabled")

    currentData = {soundData};
    hasLoaded = true;
}

const fuckWithMeFunc = () => 
{
    if(typeof currentData === 'object')
    {
        currentData.soundData[2].audio.play()
    }
    // after that make a selection box for all the sounds!
}

elementInit()