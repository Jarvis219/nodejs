import {
    axiosClient
} from "./axiosClient";
export const ordersAPI = {
    list() {
        const url = `orders`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = `orders`;
        return axiosClient.post(url, data)
    },
    eidt(id, userId, data) {
        const url = `orders/${id}/${userId}`;
        return axiosClient.put(url, data);
    },
    remove(id, userId) {
        const url = `orders/${id}/${userId}`;
        return axiosClient.delete(url)
    },
    read(id) {
        const url = `orders/${id}`;
        return axiosClient.get(url);
    },
    listSort(data) {
        const url = `orders/totals?sort=${data}`;
        return axiosClient.get(url);
    },
    listSortDesc() {
        const url = `orders?_sort=sumMoney&_order=desc`;
        return axiosClient.get(url);
    },
    listSearchAll(data) {
        const url = `orders/totals?q=${data}`;
        // console.log(url)
        return axiosClient.get(url);
    }


}