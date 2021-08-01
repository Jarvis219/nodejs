import {
    axiosClient
} from "./axiosClient";

export const UserAPI = {
    signup(data) {
        const url = `auth/signup`;
        return axiosClient.post(url, data);
    },
    signin(data) {
        const url = `auth/signin`;
        return axiosClient.post(url, data);
    },
    signout() {
        const url = `auth/signout`;
        return axiosClient.get(url);
    },
    update(id, data) {
        const url = `users/${id}`;
        return axiosClient.put(url, data)
    },
    listedit(id) {
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },
    list() {
        const url = `/users`;
        return axiosClient.get(url);
    },
    listDashboard() {
        const url = `/users`;
        return axiosClient.get(url);
    },

    remove(id) {
        const url = `/users/${id}`;
        return axiosClient.delete(url);
    }
}