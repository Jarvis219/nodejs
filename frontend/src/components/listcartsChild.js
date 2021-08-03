import {
    $$,
    reRender,
    prices
} from "../untils";
import toast from "toast-me";
import {
    ordersAPI
} from "../api/ordersAPI";
const ListCartChild = {
    async render() {
        const {
            data: {
                data
            }
        } = await ordersAPI.list();
        // console.log(data);
        const showListCart = data.map((element, index) => {
            // console.log(element.status);
            // if(element.s)
            const statusTable = () => {
                if (element.status == 'not approved yet') {
                    return /*html*/ `
                    <option value="${element.status}">${element.status}</option>
                    <option value="approved">approved</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                    `;
                } else if (element.status == 'approved') {
                    return /*html*/ `
                    <option value="approved">approved</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                    `;
                } else if (element.status == 'delivered') {
                    return /*html*/ `
                    <option value="approved">delivered</option>
                    <option value="cancelled">cancelled</option>
                    `;
                } else {
                    return ` <option value="cancelled">cancelled</option>`;
                }
            }
            var checkEdit;
            if (element.status == "cancelled" || element.status == "delivered") {
                checkEdit = ``;
            } else {
                checkEdit = `<button
                title="edit"    class=" bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><a
                    href="#/editcart/${element._id}"
                    class="inline-block py-2 px-3"><i class="far fa-edit"></i></a></button>`;
            }

            let monney = element.sumMoney;
            // console.log(`${element.sumMoney}`.length);
            if (`${element.sumMoney}`.length == 4) {
                monney = `${element.sumMoney}`.substr(0, 2)
            } else if (`${element.sumMoney}`.length == 5) {
                monney = `${element.sumMoney}`.substr(0, 3)
            } else if (`${element.sumMoney}`.length == 6) {
                monney = `${element.sumMoney}`.substr(0, 4)
            } else if (`${element.sumMoney}`.length == 7) {
                monney = `${element.sumMoney}`.substr(0, 5)
            } else if (`${element.sumMoney}`.length == 8) {
                monney = `${element.sumMoney}`.substr(0, 6)
            }
            // console.log(monney);
            return /*html*/ `
            <tr>
            <td>${index+1}</td>
            <td>${element.name}</td>
            <td>0${element.phone}</td>
            <td>${element.address}</td>
            <td>${prices(Number(monney))}</td>
            <td>${element.updatedAt}</td>
            <td ><div class="selectorid"> <select data-id="${element._id}" class="status border-2 border-green-400 border-opacity-100 rounded-lg text-green-700">
                ${statusTable()}
            </select></div></td>
            <td class="w-20"> <button data-id="${element._id}"
            class="list-eye-btn text-xl bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><i class="far fa-eye"></i></button></td>
            <td class="w-20">${checkEdit}</td> 
            <td class="w-20"><button data-id="${element._id}"
            class="list-cart-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button></td>
            </tr>
            `;
        }).join("");
        return /*html*/ `
            <table class="table text-center" id="table-product">
        <thead class=" text-primary">
                                        <th>
                                            stt
                                        </th>
                                        <th>Name</th>
                                        <th>
                                          Phone
                                        </th>
                                        <th >
                                         Address
                                       </th>
                                        <th>
                                        Total money
                                        </th>
                                        <th>
                                        Created at
                                         </th>
                                         <th>Status</th>
                                        <th colspan="3" class="w-32">Custom</th>
                                    </thead>
                                    <tbody id="show-search">
                                       ${showListCart}
                                    </tbody>
                    </table>
            `;
    },
    async afterRender() {
        const product_detail = $$('#product-detail')
        const close_product = $$('#close-product');
        const list_eye = $$('.list-eye-btn');

        $$('#status').onchange = async () => {
            const {
                data: status
            } = await ordersAPI.listSearchAll($$('#status').value);
            // console.log(1);
            // console.log(status);
            const showStatus = status.data.map((element, index) => {
                const statusTable = () => {
                    if (element.status == 'not approved yet') {
                        return /*html*/ `
                        <option value="${element.status}">${element.status}</option>
                        <option value="approved">approved</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                        `;
                    } else if (element.status == 'approved') {
                        return /*html*/ `
                        <option value="approved">approved</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                        `;
                    } else if (element.status == 'delivered') {
                        return /*html*/ `
                        <option value="approved">delivered</option>
                        <option value="cancelled">cancelled</option>
                        `;
                    } else {
                        return ` <option value="cancelled">cancelled</option>`;
                    }
                }
                let checkEdit;
                if (element.status == "cancelled" || element.status == "delivered") {
                    checkEdit = ``;
                } else {
                    checkEdit = `<button
                    title="edit"    class=" bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><a
                        href="#/editcart/${element._id}"
                        class="inline-block py-2 px-3"><i class="far fa-edit"></i></a></button>`;
                }

                let monney = element.sumMoney;
                // console.log(`${element.sumMoney}`.length);
                if (`${element.sumMoney}`.length == 4) {
                    monney = `${element.sumMoney}`.substr(0, 2)
                } else if (`${element.sumMoney}`.length == 5) {
                    monney = `${element.sumMoney}`.substr(0, 3)
                } else if (`${element.sumMoney}`.length == 6) {
                    monney = `${element.sumMoney}`.substr(0, 4)
                } else if (`${element.sumMoney}`.length == 7) {
                    monney = `${element.sumMoney}`.substr(0, 5)
                } else if (`${element.sumMoney}`.length == 8) {
                    monney = `${element.sumMoney}`.substr(0, 6)
                }
                if (element.status == $$('#status').value) {
                    return /*html */ `
                    <tr>
            <td>${index+1}</td>
            <td>${element.name}</td>
            <td>0${element.phone}</td>
            <td>${element.address}</td>
            <td>${prices(monney)}</td>
            <td>${element.updatedAt}</td>
            <td ><div class="selectorid"> <select data-id="${element._id}" class="status border-2 border-green-400 border-opacity-100 rounded-lg text-green-700">
                ${statusTable()}
            </select></div></td>
            <td class="w-20"> <button data-id="${element._id}"
            class="list-eye-btn text-xl bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><i class="far fa-eye"></i></button></td>
            <td class="w-20">${checkEdit}</td> 
            <td class="w-20"><button data-id="${element._id}"
            class="list-cart-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button></td>
            </tr>
                    `;
                }
            }).join("");
            $$('#show-search').innerHTML = showStatus;
            this.afterRender();
        }

        $$('#sort').onchange = async () => {
            // let sort;
         
                const {
                    data: sorts
                } = await ordersAPI.listSort($$('#sort').value);
                // sort = sorts;
                // console.log(sort)

            const showSort = sorts.data.map((element, index) => {
                const statusTable = () => {
                    if (element.status == 'not approved yet') {
                        return /*html*/ `
                        <option value="${element.status}">${element.status}</option>
                        <option value="approved">approved</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                        `;
                    } else if (element.status == 'approved') {
                        return /*html*/ `
                        <option value="approved">approved</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                        `;
                    } else if (element.status == 'delivered') {
                        return /*html*/ `
                        <option value="approved">delivered</option>
                        <option value="cancelled">cancelled</option>
                        `;
                    } else {
                        return ` <option value="cancelled">cancelled</option>`;
                    }
                }

                let checkEdit;
                if (element.status == "cancelled" || element.status == "delivered") {
                    checkEdit = ``;
                } else {
                    checkEdit = `<button
                    title="edit"    class=" bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><a
                        href="#/editcart/${element._id}"
                        class="inline-block py-2 px-3"><i class="far fa-edit"></i></a></button>`;
                }

                let monney = element.sumMoney;
                // console.log(`${element.sumMoney}`.length);
                if (`${element.sumMoney}`.length == 4) {
                    monney = `${element.sumMoney}`.substr(0, 2)
                } else if (`${element.sumMoney}`.length == 5) {
                    monney = `${element.sumMoney}`.substr(0, 3)
                } else if (`${element.sumMoney}`.length == 6) {
                    monney = `${element.sumMoney}`.substr(0, 4)
                } else if (`${element.sumMoney}`.length == 7) {
                    monney = `${element.sumMoney}`.substr(0, 5)
                } else if (`${element.sumMoney}`.length == 8) {
                    monney = `${element.sumMoney}`.substr(0, 6)
                }
                return /*html */ `
                    <tr>
            <td>${index+1}</td>
            <td>${element.name}</td>
            <td>0${element.phone}</td>
            <td>${element.address}</td>
            <td>${prices(monney)}</td>
            <td>${element.updatedAt}</td>
            <td ><div class="selectorid"> <select data-id="${element._id}" class="status border-2 border-green-400 border-opacity-100 rounded-lg text-green-700">
                ${statusTable()}
            </select></div></td>
            <td class="w-20"> <button data-id="${element._id}"
            class="list-eye-btn text-xl bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><i class="far fa-eye"></i></button></td>
            <td class="w-20">${checkEdit}</td> 
            <td class="w-20"><button data-id="${element._id}"
            class="list-cart-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button></td>
            </tr>
                    `;
            }).join("");
            $$('#show-search').innerHTML = showSort;
            this.afterRender();
        }

        $$('#search-order').addEventListener('submit', async (e) => {
            e.preventDefault();
            if ($$('#searchAll').value.trim().toLocaleLowerCase() == "") {
                $$('#searchAll').placeholder = "Fill in this field!";
                $$('#searchAll').style.border = "1px solid red";
                toast(
                    'Name cannot be blank!', {
                        duration: 3000
                    }, {
                        // label: 'Confirm',
                        action: () => alert('Fill in this field!'),
                        class: 'my-custom-class', // optional, CSS class name for action button
                    },
                );

            } else {
                $$('#searchAll').placeholder = "";
                $$('#searchAll').style.border = "none";
                const {
                    data: searchAll
                } = await ordersAPI.listSearchAll($$('#searchAll').value)
                // console.log(searchAll.data);
                if (searchAll.length !== 0) {
                    const showAll = searchAll.data.map((element, index) => {
                        const statusTable = () => {
                            if (element.status == 'not approved yet') {
                                return /*html*/ `
                                <option value="${element.status}">${element.status}</option>
                                <option value="approved">approved</option>
                                <option value="delivered">delivered</option>
                                <option value="cancelled">cancelled</option>
                                `;
                            } else if (element.status == 'approved') {
                                return /*html*/ `
                                <option value="approved">approved</option>
                                <option value="delivered">delivered</option>
                                <option value="cancelled">cancelled</option>
                                `;
                            } else if (element.status == 'delivered') {
                                return /*html*/ `
                                <option value="approved">delivered</option>
                                <option value="cancelled">cancelled</option>
                                `;
                            } else {
                                return ` <option value="cancelled">cancelled</option>`;
                            }
                        }
                        let checkEdit;
                        if (element.status == "cancelled" || element.status == "delivered") {
                            checkEdit = ``;
                        } else {
                            checkEdit = `<button
                    title="edit"    class=" bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><a
                        href="#/editcart/${element.id}"
                        class="inline-block py-2 px-3"><i class="far fa-edit"></i></a></button>`;
                        }
                        let monney = element.sumMoney;
                        // console.log(`${element.sumMoney}`.length);
                        if (`${element.sumMoney}`.length == 4) {
                            monney = `${element.sumMoney}`.substr(0, 2)
                        } else if (`${element.sumMoney}`.length == 5) {
                            monney = `${element.sumMoney}`.substr(0, 3)
                        } else if (`${element.sumMoney}`.length == 6) {
                            monney = `${element.sumMoney}`.substr(0, 4)
                        } else if (`${element.sumMoney}`.length == 7) {
                            monney = `${element.sumMoney}`.substr(0, 5)
                        } else if (`${element.sumMoney}`.length == 8) {
                            monney = `${element.sumMoney}`.substr(0, 6)
                        }
                        return /*html */ `
                            <tr>
                    <td>${index+1}</td>
                    <td>${element.name}</td>
                    <td>0${element.phone}</td>
                    <td>${element.address}</td>
                    <td>${prices(monney)}</td>
                    <td>${element.updatedAt}</td>
                    <td ><div class="selectorid"> <select data-id="${element._id}" class="status border-2 border-green-400 border-opacity-100 rounded-lg text-green-700">
                        ${statusTable()}
                    </select></div></td>
                    <td class="w-20"> <button data-id="${element._id}"
                    class="list-eye-btn text-xl bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><i class="far fa-eye"></i></button></td>
                    <td class="w-20">${checkEdit}</td> 
                    <td class="w-20"><button data-id="${element._id}"
                    class="list-cart-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                        <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button></td>
                    </tr>
                            `;
                    }).join("");
                    $$('#show-search').innerHTML = showAll;
                    this.afterRender();
                } else {
                    $$('#show-search').innerHTML = `<div class="absolute mx-64 mt-4 text-center">
                    <i class="far fa-sad-tear text-6xl block text"></i>
                    <span class="block text-2xl py-5">The requested product could not be found, please try again
                    </span>`;
                }
            }

        })

        close_product.onclick = () => {
            product_detail.classList.toggle('hidden');
        }
        if (list_eye.length > 1) {
            list_eye.forEach(element => {
                viewOrderDetail(element);
            })
        } else {
            viewOrderDetail(list_eye);
        }

        function viewOrderDetail(element) {
            const id = element.dataset.id
            element.addEventListener('click', async () => {
                const {
                    data
                } = await ordersAPI.read(id);
                // console.log(data);
                const list_table = data.product.map((element, index) => {
                    return /*html*/ `<tr>
                        <td>${index+1}</td>
                        <td>${element.name}</td>
                        <td><img width="100" height="100" src="${element.image}"></td>
                        <td>${prices(Number(element.price))}</td>
                        <td>${prices(Number(element.sale))}</td>
                        <td>${element.amount}</td>
                        <td>${prices(element.totalMoney)}</td>
                    </tr>`
                });
                // console.log(list_table);
                $$('#name').innerHTML = data.name;
                $$('#email').innerHTML = data.email;
                $$('#address').innerHTML = data.address;
                $$('#phone').innerHTML = '0' + data.phone;
                $$('#note').innerHTML = data.note;
                $$('#pay').innerHTML = data.pay;
                $$('#total').innerHTML = prices(Number(data.sumMoney));
                $$('#times').innerHTML = data.updatedAt;

                $$('#tbody-list').innerHTML = `${list_table} 
                <tr class="font-bold text-red-400">
                             <td colspan="5" >SUM</td>
                             <td colspan="2" id="sumproduct">total</td>
                         </tr>
                `;
                $$('#sumproduct').innerHTML = prices(Number(data.sumMoney));
                product_detail.classList.toggle('hidden');
            })
        }

        const btns = $$('.list-cart-btn')

        if (btns.length > 1) {
            btns.forEach(element => {
                deleteItem(element)
            });
        } else {
            deleteItem(btns);
        }

        function deleteItem(element) {
            const id = element.dataset.id
            element.addEventListener('click', async () => {
                const question = confirm('Are you want to delete?');
                if (question) {
                    let {
                        _id
                    } = JSON.parse(localStorage.getItem('setAuthen'));
                    await ordersAPI.remove(id, _id).then(() => {
                        reRender(ListCartChild, '#list-cart');
                        toast(
                            'Update order success', {
                                duration: 3000
                            }, {
                                // label: 'Confirm',
                                action: () => alert('Fill in this field!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        );
                    }).catch(err => toast(
                        err, {
                            duration: 3000
                        }, {
                            // label: 'Confirm',
                            action: () => alert('Fill in this field!'),
                            class: 'my-custom-class', // optional, CSS class name for action button
                        },
                    ))

                }
            })
        }
        const stt = $$('.status');
        const selectorid = $$('.selectorid');
        // console.log(selectorid.length);
        if (selectorid.length !== undefined) {
            stt.forEach(element => {
                statuss(element)
            });
        } else {
            statuss(stt);
        }

        async function statuss(element) {
            const id = element.dataset.id
            const {
                data
            } = await ordersAPI.read(id);
            // console.log(data);
            element.addEventListener('change', async () => {
                const editCart = {
                    // id: Number(id),
                    // address: data.address,
                    // email: data.email,
                    // name: data.name,
                    // note: data.note,
                    // phone: data.phone,
                    // product: data.product,
                    // sumMoney: data.sumMoney,
                    // pay: data.pay,
                    status: element.value,
                    // days: data.days,
                }
                // console.log(editCart);
                let {
                    _id
                } = JSON.parse(localStorage.getItem('setAuthen'));
                await ordersAPI.eidt(id, _id, editCart).then(() => {
                    reRender(ListCartChild, '#list-cart');
                    toast(
                        'Update order success', {
                            duration: 3000
                        }, {
                            // label: 'Confirm',
                            action: () => alert('Fill in this field!'),
                            class: 'my-custom-class', // optional, CSS class name for action button
                        },
                    );
                })

            })
        }

    }
}
export default ListCartChild;