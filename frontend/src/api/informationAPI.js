import {
    axiosClient
} from "./axiosClient";

export const informationAPI = {
    list() {
        const url = `information`;
        return axiosClient.get(url);
    },
    listedit(id) {
        const url = `information/${id}`;
        return axiosClient.get(url);
    },
    listcontact() {
        const url = `information`;
        return axiosClient.get(url);
    },
    add(data, userId) {
        const url = `information/${userId}`;
        return axiosClient.post(url, data);
    },
    edit(id, userId, data) {
        const url = `information/${id}/${userId}`;
        return axiosClient.put(url, data);
    },
    remove(id, userId) {
        const url = `information/${id}/${userId}`;
        return axiosClient.delete(url);
    }

}