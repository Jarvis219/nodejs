import {
    axiosClient
} from "./axiosClient";
export const postAPI = {
    list() {
        const url = `posts`;
        return axiosClient.get(url);
    },
    read(id) {
        const url = `posts/${id}`;
        return axiosClient.get(url);
    },
    add(data, userId) {
        const url = `posts/${userId}`;
        return axiosClient.post(url, data);
    },
    remove(id, userId) {
        const url = `posts/${id}/${userId}`;
        return axiosClient.delete(url);
    },
    edit(id, userId, data) {
        const url = `posts/${id}/${userId}`;
        return axiosClient.put(url, data);
    },

    readCate(id) {
        const url = `posts/related/${id}`;
        return axiosClient.get(url);
    }

}