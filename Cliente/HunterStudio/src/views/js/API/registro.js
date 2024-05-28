document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#register-button").addEventListener("click", (event) => {
        event.preventDefault();
        
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const repeatPassword = document.querySelector("#repeat-password").value;
        const terms = document.querySelector("#terms").checked;

        const nameError = document.querySelector("#name-error");
        const emailError = document.querySelector("#email-error");
        const passwordError = document.querySelector("#password-error");
        const repeatPasswordError = document.querySelector("#repeat-password-error");
        const termsError = document.querySelector("#terms-error");

        nameError.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        repeatPasswordError.style.display = 'none';
        termsError.style.display = 'none';

        let isValid = true;
        
        if (!name) {
            nameError.style.display = 'inline';
            nameError.setAttribute('title', 'Por favor, introduce tu nombre.');
            isValid = false;
        }

        if (!email) {
            emailError.style.display = 'inline';
            emailError.setAttribute('title', 'Por favor, introduce tu email.');
            isValid = false;
        }

        if (!password) {
            passwordError.style.display = 'inline';
            passwordError.setAttribute('title', 'Por favor, introduce tu contraseña.');
            isValid = false;
        } else if (password.length < 8) {
            passwordError.style.display = 'inline';
            passwordError.setAttribute('title', 'La contraseña debe tener al menos 8 caracteres.');
            isValid = false;
        }

        if (!repeatPassword) {
            repeatPasswordError.style.display = 'inline';
            repeatPasswordError.setAttribute('title', 'Por favor, repite tu contraseña.');
            isValid = false;
        } else if (password !== repeatPassword) {
            repeatPasswordError.style.display = 'inline';
            repeatPasswordError.setAttribute('title', 'Las contraseñas no coinciden.');
            isValid = false;
        }

        if (!terms) {
            termsError.style.display = 'inline';
            termsError.setAttribute('title', 'Debes aceptar los términos y condiciones.');
            isValid = false;
        }

        if (isValid) {
            const userData = {
                name: name,
                email: email,
                password: password
            };

            fetch('http://localhost:8001/user/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue correcta');
                }
                return response.json(); 
            })
            .then(data => {
                console.log(data);
                alert("Registro exitoso");
                window.location.href = "./login.html";
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error en el registro");
            });
        }
    });
});