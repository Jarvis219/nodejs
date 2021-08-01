import {
    axiosClient
} from "./axiosClient";

export const cartAPI = {
    add(data, userId) {
        const url = `carts/${userId}`;
        return axiosClient.post(url, data);
    },
    list() {
        const url = `carts`;
        return axiosClient.get(url);
    },
    read(id) {
        const url = `carts/${id}`;
        return axiosClient.get(url);
    },
    edit(id, userId, data) {
        const url = `carts/${id}/${userId}`;
        // console.log(url);
        return axiosClient.put(url, data);
    },
    remove(id) {
        const url = `carts/${id}`;
        return axiosClient.delete(url);
    },
    listUser(user) {
        const url = `carts/cart-user?user=${user}`;
        return axiosClient.get(url);
    },
    listCartSize(id) {
        const url = `products/${id}`;
        return axiosClient.get(url);
    },

}