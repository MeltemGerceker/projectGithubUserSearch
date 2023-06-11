const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

const createUserCard = (user) => {
    const userName = user.name ? user.name : user.login;
    const userBio = user.bio ? user.bio : "";

    const cardHTML = `
    <div class="card">
            <img class="user-image" src="${user.avatar_url}" alt="${userName}">
            <div class="user-info">
                <div class="user-name">
                    <h2>${userName}</h2>
                    <small>${user.login}</small>
                </div>
            </div>
            <p>${userBio}</p>
            <ul>
                <li>
                    <i class="fa-solid fa-user-group"></i> ${user.followers} <strong>Followers</strong>
                </li>
                <li> ${user.following} <strong>Following</strong></li>
                <li>
                    <i class="fa-solid fa-bookmark"></i> ${user.public_repos} <strong>Repositories</strong>
                </li>
            </ul>
            <div class="repos" id="repos"></div>
        </div>
    `;

    main.innerHTML = cardHTML;
    getRepos(user.login);
};

const createRepos = (repositories) => {
    const repos = document.getElementById("repos");
    let reposHtml = "";
    repositories.slice(0,5).forEach((repo) => {
        reposHtml += `<a href="${repo.html_url}" target="_blank"><i class="fa-solid fa-book-bookmark"></i> ${repo.name} </a>`;
    });

    repos.innerHTML = reposHtml;
};

const createErrorCard = (errorMessage) => {
    const cardErrorHTML = `
        <div class="card">
            <h2>${errorMessage}</h2>
        </div>
    `;

    main.innerHTML = cardErrorHTML;
};
const getUser = async (username) => {
    try {
        const {data} = await axios(API_URL + username);
        //console.log(data);
        createUserCard(data);
    } catch (error) {
        //console.log(error);
        createErrorCard("Sorry, could not find the user you're looking for. :(");
    }
};

const getRepos = async (username) => {
    try {
        const {data} = await axios(API_URL + username + "/repos");
        //console.log(data);
        createRepos(data);
    } catch (error) {
        //console.log(error);
        createErrorCard("Sorry, could not retrieve repos for this user. :(");
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = search.value;
    if (username) {
        getUser(username);
        search.value = "";
    }
        
});
