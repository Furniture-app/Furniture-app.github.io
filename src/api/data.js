import * as api from "./api.js";

const host = 'https://parseapi.back4app.com';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implementation of application-specific functions

export async function getAllFurniture() {
    const response =  await api.get(host + '/classes/Furniture');
    return response.results;
}

export async function getItemById(id) {
    return await api.get(host + '/classes/Furniture/' + id);
}

export async function getMyFurniture() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

export async function createItem(data) {
    return await api.post(host + '/classes/Furniture', data);
}

export async function editItem(id, data) {
    return await api.put(host + '/classes/Furniture' + id, data);
}

export async function deleteItem(id) {
    return await api.del(host + '/classes/Furniture' + id);
}




