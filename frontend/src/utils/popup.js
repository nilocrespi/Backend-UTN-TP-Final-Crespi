import Swal from "sweetalert2"

const generatePopup = async ({textTitle, textContent, icon, btnTextDelete}) => {
    const validateDelete = await Swal.fire({
        title: `${textTitle}`,
        html: `${textContent}`,
        icon: `${icon}`,
        confirmButtonText: `${btnTextDelete}`,
        showCancelButton: true,
        cancelButtonText: "Cancelar"
    });

    return validateDelete
}

export {generatePopup}

