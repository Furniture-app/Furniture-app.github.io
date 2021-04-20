import { html } from "../lib.js"

import { login } from "../api/data.js";

const loginTemplate = (onSubmit) => html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit = ${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
`;

export async function loginPage(context) {
    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
    
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
    
        await login(email,password);
    
        ev.target.reset();

        context.setUserNav();
        context.page.redirect('/');
    }

    context.render(loginTemplate(onSubmit));
}