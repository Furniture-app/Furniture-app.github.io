import { page, render } from './lib.js';

import { dashboardPage } from "./views/dashboard.js";
import { detailsPage } from "./views/details.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";
import { registerPage } from "./views/register.js";
import { loginPage } from "./views/login.js";
import { myFurniturePage } from "./views/myFurniture.js";
import { logout } from "./api/data.js";

import * as api from "./api/data.js";

window.api = api;

const main = document.querySelector('.container');

page('/', decorateContext, dashboardPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/my-furniture', decorateContext, myFurniturePage);

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    page.redirect('/');
    setUserNav();
});

// Start application
setUserNav()

page.start();


function decorateContext(cxt, next) {
    cxt.render = (content) => render(content, main);
    cxt.setUserNav = setUserNav;

    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');

    if (userId) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}
