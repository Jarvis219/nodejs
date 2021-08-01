import {
    axiosClient
} from "./axiosClient";

export const categoryAPI = {
    list() {
        const url = `/categories`;
        return axiosClient.get(url);
    },
    read(id_cate) {
        // console.log(id_cate);
        const url = `products/related/${id_cate}`;
        return axiosClient.get(url);
    },
    edit(id_cate) {
        const url = `categories/${id_cate}`;
        return axiosClient.get(url);
    },
    editProduct(id) {
        // const url = `categories?id_ne=${id}`;
        const url = `categories?id_ne=${id}`;
        return axiosClient.get(url);
    },
    add(category, userId) {
        const url = `categories/${userId}`
        // console.log(url);
        return axiosClient.post(url, category);
    },
    remove(id, userId) {
        const url = `categories/${id}/${userId}`;
        // console.log(url);
        return axiosClient.delete(url)
    },
    update(id, userId, data) {
        const url = `categories/${id}/${userId}`;
        return axiosClient.put(url, data);
    },
    listNe(id_cate) {
        // console.log(id_cate);
        const url = `categories/related/${id_cate}`;
        // console.log(url);
        return axiosClient.get(url);
    }

}
export default categoryAPI;