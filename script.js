/* ===================================================== */
/* SCRIPT PRINCIPAL - CLÍNICA VETERINARIA */
/* ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ===============================================
    // SELECCIÓN DEL FORMULARIO
    // ===============================================

    const form = document.getElementById("contactForm");
    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const mensajeInput = document.getElementById("mensaje");

    // ===============================================
    // FUNCIÓN PARA VALIDAR EMAIL CON EXPRESIÓN REGULAR
    // ===============================================

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // ===============================================
    // CREACIÓN DINÁMICA DEL MODAL BOOTSTRAP
    // ===============================================

    const modalHTML = `
    <div class="modal fade" id="modalConfirmacion" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">✅ Mensaje Enviado</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <p>📧 Tu aplicación de correo fue abierta correctamente.</p>
                    <p>Gracias por confiar en AnimalCare 🐾💙</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));

    // ===============================================
    // EVENTO SUBMIT DEL FORMULARIO
    // ===============================================

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        // Validación de campos vacíos
        if (nombre === "" || email === "" || mensaje === "") {
            alert("⚠️ Todos los campos son obligatorios.");
            return;
        }

        // Validación de email
        if (!validarEmail(email)) {
            alert("❌ Ingresa un correo electrónico válido.");
            return;
        }

        try {

            // ===============================================
            // GUARDAR DATOS EN LOCALSTORAGE (PERSISTENCIA)
            // ===============================================

            const datosFormulario = {
                nombre: nombre,
                email: email,
                mensaje: mensaje,
                fecha: new Date().toLocaleString()
            };

            localStorage.setItem("ultimoMensaje", JSON.stringify(datosFormulario));

            // ===============================================
            // CREAR ENLACE MAILTO
            // ===============================================

            const asunto = encodeURIComponent("Consulta desde la Web - Clínica Veterinaria");
            const cuerpo = encodeURIComponent(
                "Nombre: " + nombre + "\n" +
                "Email: " + email + "\n\n" +
                "Mensaje:\n" + mensaje
            );

            const mailtoLink = `mailto:clinica@animalcare.com?subject=${asunto}&body=${cuerpo}`;

            // Abrir aplicación de correo
            window.location.href = mailtoLink;

            // Esperar 1 segundo y mostrar modal
            setTimeout(() => {
                modal.show();
                form.reset();
            }, 1000);

        } catch (error) {

            console.error("Error al enviar el formulario:", error);
            alert("❌ Ocurrió un error inesperado. Intenta nuevamente.");

        }

    });

});