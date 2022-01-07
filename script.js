const button = document.getElementById('button');
const audioElement = document.getElementById('audio');




//Disable/enable button

function toggleButton()
{
    button.disabled = !button.disabled;
}


// Passing joke to voiceRSS API

function tellMe(joke)
{
    //console.log('tell me' , joke);
    VoiceRSS.speech({
        key: "66fdce1254bd4f278c4727217071f932",
        src: joke,
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
      });
}

// Get jokes from jokes api 

async function getJokes()
{
    let joke = '';

    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Dark?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try{
    const response = await fetch(apiUrl);
    const data = await response.json();
    if(data.setup)
    {
        joke = `${data.setup} ... ${data.delivery}`;
    } else {
        joke = data.joke;
    }
    //text-to-speech
    tellMe(joke);

    //Disabling button during speech
    toggleButton();
    } catch(error) {
        // catch errors here
        console.log('oops' , error);
    }
}

//event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended' , toggleButton);
