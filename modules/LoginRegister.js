const login = document.createElement("div")
document.body.appendChild(login)
login.classList = "login"

//Login
const form = document.createElement("form")
login.appendChild(form)

const loginEmailLabel = document.createElement("label")
loginEmailLabel.innerText = "Email:"
const loginEmailInput = document.createElement("input")
loginEmailInput.type = "email"
loginEmailInput.className = "emailInput"
loginEmailInput.setAttribute("required", "")

const loginPasswordLabel = document.createElement("label")
loginPasswordLabel.innerText = "Password:"
const loginPasswordInput = document.createElement("input")
loginPasswordInput.type = "password"
loginPasswordInput.className = "passwordInput"
loginPasswordInput.setAttribute("required", "")

const submit = document.createElement("input")
submit.type = "submit"
submit.value = "Login"
submit.style.marginTop = "18px"

const linkBox = document.createElement("div")
linkBox.className = "linkBox"
linkBox.innerText = "Register"

form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(loginEmailInput.value, loginPasswordInput.value) //del testavimo
    if ((linkBox.innerText == "Register")) {
        // patikrina DB,jei ok ileidzia,kitap alert
    } else if ((linkBox.innerText == "Login")) {
        if (loginPasswordInput.value == registerPasswordinput.value) {
            console.log(registerNameInput.value,loginEmailInput.value,loginPasswordInput.value,registerPasswordinput.value);
            linkBox.innerText = "Register"
            submit.value = "Login"
            registerNameLabel.style.display = "none"
            registerNameInput.style.display = "none"
            registerNameInput.removeAttribute("required")
            registerPasswordLabel.style.display = "none"
            registerPasswordinput.style.display = "none"
            registerPasswordinput.removeAttribute("required")

            // name,Email,Password isiuncia i DB

            //isvalo inputus
            loginEmailInput.value=""
            loginPasswordInput.value=""
        } else {
            alert("Passwords don't match")
        }
    }
})

// Register
const registerNameLabel = document.createElement("label")
registerNameLabel.innerText = "Name:"
registerNameLabel.style.display = "none"
const registerNameInput = document.createElement("input")
registerNameInput.type = "text"
registerNameInput.style.display = "none"
registerNameInput.className = "nameInput"

const registerPasswordLabel = document.createElement("label")
registerPasswordLabel.innerText = "Re-enter Password:"
registerPasswordLabel.style.display = "none"
const registerPasswordinput = document.createElement("input")
registerPasswordinput.type = "password"
registerPasswordinput.style.display = "none"
registerPasswordinput.className = "registerPasswordInput"

linkBox.addEventListener("click", (event) => {
    if (linkBox.innerText == "Register") {
        linkBox.innerText = "Login"
        submit.value = "Register"
        registerNameLabel.style.display = "block"
        registerNameInput.style.display = "block"
        registerNameInput.setAttribute("required", "")
        registerPasswordLabel.style.display = "block"
        registerPasswordinput.style.display = "block"
        registerPasswordinput.setAttribute("required", "")
    } else if (linkBox.innerText == "Login") {
        linkBox.innerText = "Register"
        submit.value = "Login"
        registerNameLabel.style.display = "none"
        registerNameInput.style.display = "none"
        registerNameInput.removeAttribute("required")
        registerPasswordLabel.style.display = "none"
        registerPasswordinput.style.display = "none"
        registerPasswordinput.removeAttribute("required")
    }
})
login.appendChild(linkBox)
form.append(
    registerNameLabel,
    registerNameInput,
    loginEmailLabel,
    loginEmailInput,
    loginPasswordLabel,
    loginPasswordInput,
    registerPasswordLabel,
    registerPasswordinput,
    submit
)

export default login
