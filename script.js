(function () {
    const form = document.querySelector("#search-form");
    const input = document.querySelector("#country");
    const div = document.querySelector("#res-table");
    const apiKey = "rc_live_9e285b7b6e404184a5fe019bcfb0368a";

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = input.value;
        fetch(
            `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(value)}`,
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            },
        )
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(
                        "Niepoprawna odpowiedź HTTP: " + response.status,
                    );
                }
                return response.json();
            })
            .then(({ data: { objects } }) => {
                html =
                    "<table><tr><td>NAME</td><td>CAPITAL</td><td>POPULATION</td><td>REGION</td><td>SUBREGION</td></tr>";
                if (objects.length == 0) {
                    html = "Brak informacji o danym kraju";
                    div.innerHTML = html;
                } else {
                    objects.forEach((element) => {
                        html += `
                        <tr>
                            <td>${element.names.common}</td>
                            <td>${element.capitals?.[0]?.name || "BRAK DANYCH"}</td>
                            <td>${element.population}</td>
                            <td>${element.region}</td>
                            <td>${element.subregion}</td>
                        </tr>`;
                    });
                    div.innerHTML = html;
                }
            })
            .catch(function (error) {
                div.innerHTML = "Wystąpił błąd: " + error.message;
                console.error(error);
            });
    });
})();
