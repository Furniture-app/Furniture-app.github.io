export const settings = { // whoever imports this module has to set the host value
    host: ''
};

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function getOptions(method = 'get', body) { // default value of param 'method' is 'get' (if we have not passed such argument)
    const options = {
        method,
        headers: {}
    }

    const token = sessionStorage.getItem('authToken');
    if (token) {
        options.headers['X-Authorization'] = token;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await request(url, getOptions());
}

export async function post(url, data) {
    return await request(url, getOptions('post', data));
}

export async function put(url, data) {
    return await request(url, getOptions('put', data));
}

export async function del(url) {
    return await request(url, getOptions('delete'));
}

export async function login(email, password) {
    const result = await post(settings.host + '/users/login', { email, password });

    //Upon login AND register we should save these values in the sessionStorage:
    sessionStorage.setItem('authToken', result.accessToken); // the accessToken for making authorized requests
    sessionStorage.setItem('email', result.email); // the email to display it somewhere if need be
    sessionStorage.setItem('_id', result._id); // the id to check whether this user is the owner(creator) of a certain item 
    
    return result;
}

export async function register(email, password) {
    const result = await post(settings.host + '/users/register', { email, password });

    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('_id', result._id);

    return result;
}



export async function logout() {
    const result =  await get(settings.host + '/users/logout');

    //Upon logout we should remove these values from the sessionStorage:
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('_id');

    return result;
}