import * as api from "./api.js";

const host = 'https://parseapi.back4app.com';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

function createPointer(name, id) {
    return {
        __type: 'Pointer',
        className: name,
        objectId: id
    };
}

function addOwner(object) {
    const userId = sessionStorage.getItem('userId');

    object.owner = createPointer('_User', userId);
}

export async function getAllFurniture() {
    const response = await api.get(host + '/classes/Furniture');
    return response.results;
}

export async function getItemById(id) {
    const response =  await api.get(host + '/classes/Furniture/' + id);
    response.objectId = id;
    return response;
}

export async function getMyFurniture() {
    const userId = sessionStorage.getItem('userId');
    const query = JSON.stringify({ owner: createPointer('_User', userId) });
    const response = await api.get(host + '/classes/Furniture?where=' + encodeURIComponent(query));

    return response.results;
}

export async function createItem(data) {
    addOwner(data);
    return await api.post(host + '/classes/Furniture', data);
}

export async function editItem(id, data) {
    return await api.put(host + '/classes/Furniture' + id, data);
}

export async function deleteItem(id) {
    return await api.del(host + '/classes/Furniture' + id);
}




