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
        headers: {
            'X-Parse-Application-Id': 'zaRU7S4AyhIiR1FOzAS26sajmnvIXM9SMlvNt1U8',
            'X-Parse-REST-API-Key': 'C87mPrz3tOjGYIbEDyBeWBpxpVe1W3eyczP3piin'
        }
    }

    const token = sessionStorage.getItem('sessionToken');
    if (token) {
        options.headers['X-Parse-Session-Token'] = token;
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

export async function login(username, password) {
    const result = await post(settings.host + '/login', { username, password });

    //Upon login AND register we should save these values in the sessionStorage:
    sessionStorage.setItem('username', username); // the username to display it somewhere if need be (welcoming message)
    sessionStorage.setItem('sessionToken', result.sessionToken); // the sessionToken for making authorized requests
    sessionStorage.setItem('userId', result.objectId); // the userId to check whether this user is the owner(creator) of a certain item 

    return result;
}

export async function register(email, username, password) {
    const result = await post(settings.host + '/users', { email, username, password });

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('sessionToken', result.sessionToken);
    sessionStorage.setItem('userId', result.objectId);

    return result;
}



export async function logout() {
    const result = await post(settings.host + '/logout', {});

    //Upon logout we should remove these values from the sessionStorage:
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('userId');

    return result;
}