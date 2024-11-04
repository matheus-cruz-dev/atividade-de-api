document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://137.184.108.252:5000/api";
    let token = "";

    async function login() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log('Dados de login:', { email, password });

        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Falha no login");
            }

            const data = await response.json();
            token = data.token;
            alert("Login realizado");

            console.log("ultimo token: " + token)

            fetchCidades();
        } catch (error) {
            alert("Erro ao fazer login.");
        }
    }

    async function fetchCidades() {
        try {
            const response = await fetch(`${apiUrl}/cidades`, {
                method: "GET",
                headers: {
                    "x-access-token": token,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar cidades.");
            }

            const cidades = await response.json();
            const tableBody = document.querySelector('#cidades tbody');

            tableBody.innerHTML = '';

            cidades.forEach(city => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${city.id}</td>
                    <td>${city.nome}</td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            alert("Erro ao buscar cidades.");
        }
    }

    document.getElementById("login").addEventListener("click", login);
});
