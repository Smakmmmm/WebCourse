(function () {
    const countriesArray = [
        {
            name: "Russian Federation",
            cities: [
                {
                    name: "Moscow",
                    population: 13104177
                },
                {
                    name: "Novosibirsk",
                    population: 1635338
                },
                {
                    name: "Vladivostok",
                    population: 597237
                },
                {
                    name: "Ekaterinburg",
                    population: 1539371
                }
            ]
        },
        {
            name: "France",
            cities: [
                {
                    name: "Paris",
                    population: 2240621
                },
                {
                    name: "Marseilles",
                    population: 861635
                },
                {
                    name: "Lyon",
                    population: 522228
                }
            ]
        },
        {
            name: "Germany",
            cities: [
                {
                    name: "Berlin",
                    population: 3677472
                },
                {
                    name: "Munich",
                    population: 1512491
                },
                {
                    name: "Hamburg",
                    population: 1814879
                }
            ]
        }
    ];

    (function getBiggestCountries() {
        const maxCitiesCount = countriesArray.reduce((sum, country) => sum > country.cities.length ? sum : country.cities.length, 0);
        console.log("Максимальное количество городов:");
        console.log(maxCitiesCount);

        const biggestCountries = countriesArray.filter(country => country.cities.length == maxCitiesCount).map(country => country.name);
        console.log("Страны с наибольшим количеством городов:");
        console.log(biggestCountries);
    })();

    (function getCountriesInfo() {
        const countriesInfo = {};

        countriesArray.forEach(function(country) {
            const populationSum = country.cities.reduce((sum, city) => sum + city.population, 0);
            countriesInfo[country.name] = populationSum;
         });

         console.log("Получили объект стран с общей численностью населения:");
         console.log(countriesInfo);
    })();
})();