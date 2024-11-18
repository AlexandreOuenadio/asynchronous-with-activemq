const socket = io();

const form = document.getElementById("form")


const handleForm = async e => {

    e.preventDefault()

    const formData = new FormData(form)

    try {
        const reponse = await fetch("http://localhost:8080/msg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: formData.get("name"),
                firstname: formData.get("firstname")
            })
        })

        if (!reponse.ok)
            throw new Error(`${reponse.status} : ${reponse.statusText}`)
    } catch (e) {
        console.error(`Erreur: ${e.message}`)
    }

}

form.addEventListener("submit", handleForm)