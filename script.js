// This is Front-end JS
let intervalId = null
let selectedPet = null;

//choose pet function -> this function is to select the pet and display the image and name of it
function choosePet(pet){
    const petContainer = document.getElementById('pet-container');
    const petImageContainer = document.getElementById('pet-image-container');
    const chooseName = document.getElementById('choose-name');
    const petNameDisplay = document.getElementById('pet-name');
    const petImage = document.getElementById('pet-image');
    const selectPet = document.getElementById('select-pet')

    // remove all leading and trailing whitespaces from pet name
    const petName = chooseName.value.trim();

    // if pet name is not given then give alert
    if(petName === ""){
        alert("Enter Pet Name");
        return;
    }
    petNameDisplay.textContent = petName;

    //show image of selected pet
    selectedPet = pet;
    if (pet === 'cat') {
        petImage.src = 'Cat.jpeg';
    } else if (pet === 'dog') {
        petImage.src = 'Dog.jpeg';
    }

    //hide selectpet container and show the petcontainer
    petImageContainer.style.display = 'block';
    petContainer.style.display = 'block';
    selectPet.style.display = 'none';
}

// play pet function -> this function is to play the sound of the pet when the cursor hover on its picture
function playPetSound() {
    const petSound = document.getElementById('pet-sound');

    // assign pet sound according to the pet chosen
    if (selectedPet === 'cat') {
        petSound.src = 'cat-meow.mp3';
    } else if (selectedPet === 'dog') {
        petSound.src = 'dog-bark.mp3';
    }
    petSound.play();
}

// this helps to detect whether the cursor is hovered on the picture. If yes then call the pet play function
document.getElementById('pet-image').addEventListener('mouseover', playPetSound);

// go back to select pet function -> this helps the user to change the pet by going back to select pet
function goBackToSelectPet() {
    const petContainer = document.getElementById('pet-container');
    const selectPet = document.getElementById('select-pet');
    
    health = 100;
    hunger = 0;
    happiness = 100;
    updateMeters();

    petContainer.style.display = 'none';
    selectPet.style.display = 'block';
}

// fetching the position to change the mood
const petMood = document.getElementById("pet-mood").querySelector('span');

// fucntion to determining the mood
function determineMood(){
    let mood = "Happy";
    if (hunger > 70)
        mood = "Hungry";
    else if(happiness < 30)
        mood = "Sad";
    else if(health < 50)
        mood = "Tired";
    else if (health < 30)
        mood = "Sick";
    return mood;
}

// initial health,hunger and happiness
let health = 100;
let hunger = 0;
let happiness = 100;

//meter display -> this is to fetch the position to update the new value
const healthMeter = document.getElementById('health-meter').querySelector('span');
const hungerMeter = document.getElementById('hunger-meter').querySelector('span');
const happinessMeter = document.getElementById('happiness-meter').querySelector('span');

// feed pet funcion -> when feed button is clicked then this function is called which decrease hunger and increase health and happiness
function feedPet(){
    if (hunger > 0){
        hunger = Math.max(hunger - 5, 0);
        health = Math.min(health + 5, 100);
        happiness = Math.min(happiness + 5, 100);
        updateMeters();
    }
}

// play pet funcion -> when play button is clicked then this function is called which increase hunger and increase health and happiness
function playPet(){
    if (happiness < 100){
        happiness = Math.min(happiness + 5, 100);
        health = Math.min(health + 5, 100);
        hunger = Math.min(hunger + 5, 100);
        updateMeters();
    }
}

// clean pet funcion -> when clean button is clicked then this function is called which and increase health and happiness
function cleanPet(){
    if (health < 100){
        health = Math.min(health + 5, 100);
        happiness = Math.min(happiness + 5, 100);
        updateMeters();
    }
}

// update meter function -> this is used to update the new values for health, hunger and happiness and also changes color of the text according to the value
function updateMeters() {
    healthMeter.textContent = `${health}%`;
    hungerMeter.textContent = `${hunger}%`;
    happinessMeter.textContent = `${happiness}%`;
    healthMeter.parentNode.style.color = health > 50 ? '#28a745' : '#dc3545';
    hungerMeter.parentNode.style.color = hunger < 50 ? '#28a745' : '#dc3545';
    happinessMeter.parentNode.style.color = happiness > 50 ? '#28a745' : '#dc3545';
    const mood = determineMood();
    petMood.textContent = mood;

}

//this function is called to regularly decrease health and happiness meter and increase hunger meter.
function decreaseStats(){
    if(health > 0){
        hunger = Math.min(hunger + 3, 100);
        happiness = Math.max(happiness - 3, 0);
        health = Math.max(health - 3, 0);
        updateMeters();
    }
}

//this is used to set an interval of 3 seconds and after each interval decrease stats fucntion is called
setInterval(decreaseStats,3000);

 