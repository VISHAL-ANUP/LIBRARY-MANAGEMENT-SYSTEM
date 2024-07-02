let searchInputEl = document.getElementById("searchInput");
let searchResultEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let messageEl = document.getElementById("message");
let headingEl = document.getElementById("heading");

function createSearchResult(search_results) {
    if (search_results.length < 1) {
        searchResultEl.textContent = "No Books Found";
    } 
    else {
        searchResultEl.textContent = "";
        messageEl.textContent = "Popular Books";
        searchResultEl.appendChild(messageEl);
        for (let eachItem of search_results) {
            let title = eachItem.title;
            let image = eachItem.imageLink;
            let author = eachItem.author;
            let imageEl = document.createElement("img");
            let textEl = document.createElement("p");
            imageEl.setAttribute("src", image);
            textEl.textContent = author;
            searchResultEl.appendChild(imageEl);
            searchResultEl.appendChild(textEl);
            console.log(title);
            console.log(author);
            console.log(eachItem);
        }
    }
}
searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        let searchInputvalue = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputvalue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                createSearchResult(search_results);
                spinnerEl.classList.toggle("d-none");
            });
    }
});
