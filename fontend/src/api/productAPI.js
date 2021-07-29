import {
    axiosClient
} from './axiosClient';

export const productAPI = {
    list() {
        const url = `/products`;
        return axiosClient.get(url);
    },
    read(id) {
        const url = `products/${id}?_expand=category`;
        return axiosClient.get(url);
    },
    remove(id, userId) {
        const url = `products/${id}/${userId}`;
        // console.log(url);
        return axiosClient.delete(url);
    },
    add(product, userId) {
        const url = `/products/${userId}`;
        return axiosClient.post(url, product);
    },
    update(id, userId, data) {
        const url = `/products/${id}/${userId}`;
        return axiosClient.put(url, data);
    },
    listProductCate(id) {
        const url = `/products?classify=${id}`;
        return axiosClient.get(url);
    },
    listSearch(data) {
        // const url = `/products/?name_like=${data}`;
        // const url = `/products?q=${data}`
        const url = `products/search?q=${data}`;
        console.log(url);
        return axiosClient.get(url);
    }

}
export default productAPI;