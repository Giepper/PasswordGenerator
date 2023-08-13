const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const specialChars = "!?/|[]{};:.,<>@#$%^&*()-_=+";

const copy = document.querySelector('.copy');
const refresh = document.querySelector('.refresh');
const generatedPasswordInput = document.querySelector('.generated-password-input');

function hasUpperCase(password, upperCase) {
    for (let i = 0; i < password.length; i++) {
      if (upperCase.includes(password[i])) {
        return true;
      }
    }
    return false;
}
function hasLowerCase(password, lowerCase) {
    for (let i = 0; i < password.length; i++) {
      if (lowerCase.includes(password[i])) {
        return true;
      }
    }
    return false;
}
function hasNumbers(password, numbers) {
    for (let i = 0; i < password.length; i++) {
      if (numbers.includes(password[i])) {
        return true;
      }
    }
    return false;
}
function hasSpecialChars(password, specialChars) {
    for (let i = 0; i < password.length; i++) {
      if (specialChars.includes(password[i])) {
        return true;
      }
    }
    return false;
}

function copyToClipboard(e){
    navigator.clipboard.writeText(e.value);
}

function generatePassword(){
    const passwordGeneratorCheckbox = document.querySelectorAll('.password-generator-btn');
    const passwordGeneratorLength = document.querySelector('.password-generator-length');
    const passwordStrength = document.querySelector('.password-strength');
    const passwordStrengthDesc = document.querySelector('.password-strength-desc');

    let charset = "";

    for(let x=0;x< passwordGeneratorCheckbox.length;x++){
        switch(passwordGeneratorCheckbox[x].value){
            case 'uppercase':
                if(passwordGeneratorCheckbox[x].checked){
                    charset += upperCase;
                }
                break;
            case 'lowercase':
                if(passwordGeneratorCheckbox[x].checked){
                    charset += lowerCase;
                }
                break;
            case 'number':
                if(passwordGeneratorCheckbox[x].checked){
                    charset += numbers;
                }
                break;
            case 'symbol':
                if(passwordGeneratorCheckbox[x].checked){
                    charset += specialChars;
                }
                break;
        }
    }

    // Generate password

    let password = "";
    for(let x=0;x<passwordGeneratorLength.value;x++){
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
        console.log(password);
    }
    generatedPasswordInput.value = password;

    // Strength check
    let barWidth = 0;
    if(password.length > 8){
        barWidth += 40;
    }
    if(hasUpperCase(password, upperCase)){
        barWidth += 15;
    }
    if(hasLowerCase(password, lowerCase)){
        barWidth += 15;
    }
    if(hasNumbers(password, numbers)){
        barWidth += 15;
    }
    if(hasSpecialChars(password, specialChars)){
        barWidth += 15;
    }

    if(barWidth <= 40){
        passwordStrength.style.backgroundColor = "red";
        passwordStrengthDesc.textContent = 'very weak';
    }
    if(barWidth > 40 && barWidth <= 50){
        passwordStrength.style.backgroundColor = "yellow";
        passwordStrengthDesc.textContent = 'weak';
    }
    if(barWidth > 50 && barWidth <= 90){
        passwordStrength.style.backgroundColor = "green";
        passwordStrengthDesc.textContent = 'strong';
    }
    if(barWidth > 90){
        passwordStrength.style.backgroundColor = "darkgreen";
        passwordStrengthDesc.textContent = 'very strong';
    }

    barWidth += '%';
    passwordStrength.style.width = barWidth;
    passwordStrengthDesc.style.width = barWidth;
}

window.addEventListener('load', generatePassword);
refresh.addEventListener('click', generatePassword);
copy.addEventListener('click', ()=>{
    copyToClipboard(generatedPasswordInput);
});