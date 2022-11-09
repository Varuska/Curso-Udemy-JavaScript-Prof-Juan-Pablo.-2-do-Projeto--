document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email'); //# Para seleccionar el id
    const inputAsunto = document.querySelector('#asunto');
    const inputmensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputmensaje.addEventListener('input', validar)
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {

        e.preventDefault(); //previene el comportamiento que tiene por default el html.
        
        resetFormulario();

    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            // crear una alerta

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);

    }

    //blur se usa cuando se abandona un campo
    //input en vez de blur, se activa cada vez que se escribe y se realiza una validacion en tiempo real.
    //value para saber lo que se escribe

    function validar(e) {

        if (e.target.value.trim() === '') { //trim para quitar los espacios vacios
            mostrarAlerta(`El Campo ${e.target.id} es Obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;

        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {

            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //comprobar el objeto del email
        comprobarEmail();
    }


    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia);

        // Generar una alerta en HTML
        const error = document.createElement('P'); //Genera un parrafo
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        referencia.appendChild(error); //appendChild inyecta los elementos al final del formualrio
    }

    // Inyectar el error al fromulario
    function limpiarAlerta(referencia) {

        // comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600')

        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {

        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

        const resultado = regex.test(email);
        return resultado;

    };

    function comprobarEmail() {

        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return

        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;

    }

    function resetFormulario() {    // Reiniciar el objeto
           
            email.email = '',
            email.asunto = '',
            email.mensaje = ''

        formulario.reset();
        comprobarEmail();

    }

}); //com Dom nos aseguramos de ejecutar despues de que todo el codigo html fue descargado.