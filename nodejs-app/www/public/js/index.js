const socket = io();

const form = document.getElementById("form")
const personnes = document.getElementById("personnes")
const circle = document.getElementById("circle")
const text = document.getElementById("text")


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

        form.reset();
        console.log("resetting form...")

    } catch (e) {
        console.error(`Erreur: ${e.message}`)
    }

}

form.addEventListener("submit", handleForm);

socket.on("connect", () => {
    if (circle.classList.contains("notConnected")) {
        circle.classList.remove("notConnected")
        circle.classList.add("connected")
        text.textContent = "Connected !"
    }
})

socket.on("disconnect", () => {
    if (circle.classList.contains("connected")) {
        circle.classList.remove("connected")
        circle.classList.add("notConnected")
        text.textContent = "Not connected"
    }
})

socket.on("notify", (personne) => {
    const p = document.createElement("p");
    p.textContent = JSON.stringify(personne);

    personnes.appendChild(p);
})