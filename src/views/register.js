import { html } from "../lib.js"

import { register } from "../api/data.js";

const registerTemplate = ( onSubmit,errorMsg,invalidEmail, invalidPass, invalidRepass) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                ${errorMsg ? html`<div class="form-group">
                    <p>${errorMsg}</p>
                </div>` : ''}
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class=${"form-control" + (invalidEmail ? ' is-invalid' : '' )} id="email" type="text"
                        name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class=${"form-control" + (invalidPass ? ' is-invalid' : '' )} id="password" type="password"
                        name="password">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class=${"form-control" + (invalidRepass ? ' is-invalid' : '' )} id="rePass" type="password"
                        name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </div>
        </div>
    </form>
`;

export async function registerPage(context) {
    context.render(registerTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('rePass').trim();

        if (email == '' || password == '' || rePass == '') {
            return context.render(registerTemplate(onSubmit,'All fields are required!', email == '', password == '', rePass == ''));

        }

        if (password != rePass) {
            return context.render(registerTemplate(onSubmit,'Passwords don\'t match!', false, true, true));
        }

        await register(email, password);

        ev.target.reset();
        
        context.setUserNav();

        context.page.redirect('/');
    }
}