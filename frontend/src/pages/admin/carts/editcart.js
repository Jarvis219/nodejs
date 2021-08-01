import NavBarAdmin from "../../../components/navbaradmin";
import ListCartChild from "../../../components/listcartsChild";
import toast from "toast-me";
import {
    $$,
    useParams,
    reRender
} from "../../../untils";
import {
    ordersAPI
} from "../../../api/ordersAPI";

const EditCart = {
    async render() {
        const {
            id
        } = useParams();
        const {
            data: order
        } = await ordersAPI.read(id);
        // console.log(order);
        if (order.product.length === 0) {
            const dataUpdateOrder = {
                // id: Number(id),
                // address: order.address,
                // name: order.name,
                // email: order.email,
                // note: order.note,
                // phone: order.phone,
                status: 'cancelled',
                // days: order.days,
                // pay: order.pay,
                // product: order.product,
                // sumMoney: order.sumMoney
            }
            // console.log(dataUpdateOrder);
            let {
                _id
            } = JSON.parse(localStorage.getItem('setAuthen'));
            await ordersAPI.eidt(id, _id, dataUpdateOrder).then(async () => {
                await reRender(ListCartChild, '#list-cart');
                window.location.hash = `/listcarts`;
            })


        }

        console.log(order)
        const list_table_product = order.product.map((element, index) => {
            return /*html*/ `
            <tr class="border-b-2 my-4 box-border cor-${element._id}">
            <td class=" w-64">
                <div class="flex justify-center" style="width: 150px ; height: 100px; object-fit: cover;" >
                    <img src="${element.image}"
                        style="width: 150px ; height: 100px; object-fit: cover;" alt="">
                </div>
            </td>
            <td> <div class="text-xs md:text-base mr-24">
            <h6 >${element.name}</h6>
        </div></td>
            <td class="mx-28 text-red-500 font-normal text-xs md:text-base">$
                <span class="priceProduct">${element.price}</span>
            </td>
            <td class="mx-28 text-red-500 font-normal text-xs md:text-base">$
            <span class="priceSale">${element.sale}</span>
        </td>
            <td class="mx-28 w-56">
                <div class="flex justify-center">
                <span class="minus cursor-pointer  px-2 bg-white shadow " data-idp = "${element.product}" data-idname ="${element.name}" data-idprice = "${element.price}" data-idsale = "${element.sale}" data-idsize ="${element.size}"  data-idimage="${element.image}"  data-id="${element._id}">-</span>
                <input type="number" data-id="${element._id}" class="change-number w-16  pl-4" min="1" value="${element.amount}" id="" disabled>
                <span class=" plus cursor-pointer px-2 bg-white shadow  "  data-idp = "${element.product}" data-idname ="${element.name}" data-idprice = "${element.price}" data-idsale = "${element.sale}" data-idsize ="${element.size}"  data-idimage="${element.image}"  data-id="${element._id}">+</span>
                </div>
            </td>
            <td class="mx-28 text-red-500 font-normal text-xs md:text-base">$ <span
                    class="quantityProduct">${element.totalMoney}</span> </td>
            
            <td>
                                        <td><button data-id="${element._id}"
                                    title = "delete" class="list-order-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                                            <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button></td>
                                    </tr>
            `;
        }).join("")
        // const {
        //     data
        // } = await cartAPI.read(id);
        // const {
        //     data: sizes
        // } = await cartAPI.listCartSize(data.productId);
        // // console.log(sizes);
        // var sizePro = data.size;
        // // console.log(sizePro);
        // const arrSize = [];
        // const sizeCart = sizes.size.forEach(element => {
        //     if (element != sizePro) {
        //         arrSize.push(element);
        //     }
        // });
        // const totalSize = arrSize.map(element => {
        //     return /*html*/ `
        //         <option value="${element}">${element}</option>
        //         `;
        // }).join("");
        return /*html*/ `
        <div id="edit-order-sum">
        ${NavBarAdmin.render()}
        <div class="main-panel">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div class="container-fluid">
                    <div class="navbar-wrapper">
                        <a class="navbar-brand uppercase" href="javascript:;">Cart</a>
                    </div>
                </div>
            </nav>
            <!-- End Navbar -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-10">
                            <div class="card">
                                <div class="card-header card-header-primary">
                                    <h4 class="card-title">Edit Cart</h4>
                                </div>
                                <div class="card-body">
                                    <form >
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Name Cart</label>
                                                    <input type="text" class="form-control" value="${order.name}" id="name-cart" name="name_order"
                                                     >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Address</label>
                                                    <input type="text" class="form-control" value="${order.address}" id="user-cart" name="address_order"
                                                     >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Email</label>
                                                    <input type="text"  min=1 class="form-control" value="${order.email}" id="price-cart" name="email_order"
                                                     >
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Phone</label>
                                                    <input type="number"  min=1 class="form-control" value="0${order.phone}" id="amount-cart" name="phone_order"
                                                     >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        <button type="submit" id="edit-cart" class="btn btn-primary pull-left">Update
                                            Cart</button>
                                    </form>
                                    <div class="text-center flex justify-center" id="list-cart">
                            <table class="border-collapse w-full" >
                                <thead class=" border-b-2 ">
                                    <tr class="box-border  text-xs md:text-lg ">
                                        <th class="" colspan="2">PRODUCT</th>
                                        <th class=" ">PRICE</th>
                                        <th class=" ">SALE</th>
                                        <th class=" ">QUANTITY</th>
                                        <th  >TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody class="">
                                    ${list_table_product}
                                </tbody>
                            </table>
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container-fluid">
                    <div class="copyright float-center">
                        &copy;
                        <script>
                            document.write(new Date().getFullYear())
                        </script>, made with <i class="material-icons">favorite</i> by
                        <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a> for a better web.
                    </div>
                </div>
            </footer>
        </div>
    </div>
    </div>
    <!--   Core JS Files   -->




        `;

    },
    async afterRender() {
        $$('.nav li')[5].classList.add("active");
        var {
            id
        } = useParams();
        const {
            data: orders
        } = await ordersAPI.read(id);

        const changeNumber = $$('.change-number')
        const total = $$('.quantityProduct');
        const priceProduct = $$('.priceProduct');
        const priceSale = $$('.priceSale');

        $$('#edit-cart').addEventListener('click', async (e) => {
            e.preventDefault();
            const {
                data: orderClick
            } = await ordersAPI.read(id);
            console.log(orderClick);
            const dataUpdateOrder = {
                // id: Number(id),
                address: $$('input[name="address_order"]').value,
                name: $$('input[name="name_order"]').value,
                email: $$('input[name="email_order"]').value,
                note: orderClick.note,
                phone: $$('input[name="phone_order"]').value,
                // status: orderClick.status,
                // days: orderClick.days,
                // pay: orderClick.pay,
                // product: orderClick.product,
                // sumMoney: orderClick.sumMoney
            }
            let {
                _id
            } = JSON.parse(localStorage.getItem('setAuthen'));
            await ordersAPI.eidt(id, _id, dataUpdateOrder).then(() => {
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
                window.location.hash = `/listcarts`;

            })


        })





        function sumTotal() {
            changeNumber.forEach((element, index) => {
                element.addEventListener('change', () => {
                    total[index].innerHTML = (Number(priceProduct[index].innerHTML) - Number(priceSale[index].innerHTML)) * Number(changeNumber[index].value);
                })
            })
        }
        if (changeNumber.length > 1) {
            sumTotal();
            reloadTotal();
            totals();
            changeNumberInput();
            totalBtn();
        } else {
            total.innerHTML = (Number(priceProduct.innerHTML) - Number(priceSale.innerHTML)) * Number(changeNumber.value);

            changeNumber.onchange = () => {
                total.innerHTML = (Number(priceProduct.innerHTML) - Number(priceSale.innerHTML)) * Number(changeNumber.value);

            }
            $$('.minus').addEventListener('click', () => {
                changeNumber.value = changeNumber.value - 1;
                if (changeNumber.value <= 1) {
                    changeNumber.value = 1;
                }
                total.innerHTML = (Number(priceProduct.innerHTML) - Number(priceSale.innerHTML)) * Number(changeNumber.value);

            });
            $$('.plus').addEventListener('click', () => {
                changeNumber.value = Number(changeNumber.value) + 1;
                total.innerHTML = (Number(priceProduct.innerHTML) - Number(priceSale.innerHTML)) * Number(changeNumber.value);

            });
        }

        function reloadTotal() {
            changeNumber.forEach((element, index) => {
                total[index].innerHTML = (Number(priceProduct[index].innerHTML) - Number(priceSale[index].innerHTML)) * Number(changeNumber[index].value);
            })
        }

        function changeNumberInput() {
            for (let i = 0; i < changeNumber.length; i++) {
                changeNumber[i].addEventListener('change', () => {
                    total[i].innerHTML = (Number(priceProduct[index].innerHTML) - Number(priceSale[index].innerHTML)) * Number(changeNumber[i].value);
                    totals();
                })
            }
        }

        function totals() {
            var quantityProduct = $$('.quantityProduct');
            var sum = 0;
            quantityProduct.forEach(element => {
                sum += Number(element.innerHTML);
            });
        }

        function totalBtn() {
            $$('.minus').forEach((element, index) => {
                element.addEventListener('click', () => {
                    // console.log(changeNumber[index].value);
                    changeNumber[index].value = changeNumber[index].value - 1;
                    if (changeNumber[index].value <= 1) {
                        changeNumber[index].value = 1;
                    }
                    total[index].innerHTML = (Number(priceProduct[index].innerHTML) - Number(priceSale[index].innerHTML)) * Number(changeNumber[index].value);
                    totals();
                });
            });
            $$('.plus').forEach((element, index) => {
                element.addEventListener('click', () => {
                    // console.log(changeNumber[index].value);
                    changeNumber[index].value = Number(changeNumber[index].value) + 1;
                    total[index].innerHTML = (Number(priceProduct[index].innerHTML) - Number(priceSale[index].innerHTML)) * Number(changeNumber[index].value);
                    totals();
                });
            })
        }
        var arrProduct;

        function updateNumberChange() {

            if ($$('.minus').length > 1) {
                $$('.minus').forEach((element, index) => {
                    checkMinus(element, index);
                });
            } else {
                checkMinus($$('.minus'));
            }
            if ($$('.plus').length > 1) {
                $$('.plus').forEach((element, index) => {
                    checkPlus(element, index);
                });
            } else {
                checkPlus($$('.plus'));
            }

        }

        function checkMinus(element, index) {
            const idp = element.dataset.id
            element.addEventListener('click', async () => {
                arrProduct = [];
                const {
                    data: orderProduct
                } = await ordersAPI.read(id);
                orderProduct.product.forEach(element => {
                    if (element._id != idp) {
                        arrProduct.push(element)
                    }
                })
                let totalMoney = 0,
                    amount = 0;
                if ($$('.quantityProduct')[index] && $$('.change-number')[index]) {
                    totalMoney = $$('.quantityProduct')[index].innerHTML;
                    amount = $$('.change-number')[index].value;
                } else {
                    totalMoney = $$('.quantityProduct').innerHTML;
                    amount = $$('.change-number').value;
                }
                // console.log(totalMoney);
                const dataUpdate = {
                    _id: idp,
                    name: element.dataset.idname,
                    image: element.dataset.idimage,
                    price: element.dataset.idprice,
                    sale: element.dataset.idsale,
                    size: element.dataset.idsize,
                    // days: element.dataset.iddays,
                    totalMoney: Number(totalMoney),
                    amount: Number(amount)
                }
                arrProduct.push(dataUpdate);
                // console.log(arrProduct);
                let sumMoney = 0;
                arrProduct.forEach(element => {
                    sumMoney += Number(element.totalMoney)
                })
                // console.log(sumMoney);
                const datas = arrProduct;

                const dataUpdateOrder = {
                    // id: Number(id),
                    address: $$('input[name="address_order"]').value,
                    name: $$('input[name="name_order"]').value,
                    email: $$('input[name="email_order"]').value,
                    note: orders.note,
                    phone: $$('input[name="phone_order"]').value,
                    // status: orders.status,
                    // days: orders.days,
                    product: datas,
                    pay: orders.pay,
                    sumMoney: sumMoney

                }
                // console.log(dataUpdateOrder);
                let {
                    _id
                } = JSON.parse(localStorage.getItem('setAuthen'));
                await ordersAPI.eidt(id, _id, dataUpdateOrder).then(() => {
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

            });
        }

        function checkPlus(element, index) {
            const idp = element.dataset.id
            element.addEventListener('click', async () => {
                arrProduct = [];
                const {
                    data: orderProduct
                } = await ordersAPI.read(id);
                // console.log(orderProduct);
                orderProduct.product.forEach(element => {
                    if (element._id != idp) {
                        arrProduct.push(element)
                    }
                })
                // console.log(idp);
                // console.log(index);
                let totalMoney = 0,
                    amount = 0;
                if ($$('.quantityProduct')[index] && $$('.change-number')[index]) {
                    totalMoney = $$('.quantityProduct')[index].innerHTML;
                    amount = $$('.change-number')[index].value;
                } else {
                    totalMoney = $$('.quantityProduct').innerHTML;
                    amount = $$('.change-number').value;
                }
                // console.log(totalMoney);
                const dataUpdate = {
                    _id: idp,
                    name: element.dataset.idname,
                    image: element.dataset.idimage,
                    price: element.dataset.idprice,
                    sale: element.dataset.idsale,
                    size: element.dataset.idsize,
                    // days: element.dataset.iddays,
                    totalMoney: Number(totalMoney),
                    amount: Number(amount)
                }
                arrProduct.push(dataUpdate);
                // console.log(dataUpdate);
                let sumMoney = 0;
                arrProduct.forEach(element => {
                    // console.log(element);
                    sumMoney += Number(element.totalMoney)
                })
                // console.log(sumMoney);
                // console.log(arrProduct);
                const data =
                    arrProduct;
                const dataUpdateOrder = {
                    // id: Number(id),
                    address: $$('input[name="address_order"]').value,
                    name: $$('input[name="name_order"]').value,
                    email: $$('input[name="email_order"]').value,
                    note: orders.note,
                    phone: $$('input[name="phone_order"]').value,
                    // status: orders.status,
                    // days: orders.days,
                    product: data,
                    pay: orders.pay,
                    sumMoney: sumMoney

                }
                // console.log(dataUpdateOrder);
                let {
                    _id
                } = JSON.parse(localStorage.getItem('setAuthen'));
                await ordersAPI.eidt(id, _id, dataUpdateOrder).then(() => {
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

            });
        }
        updateNumberChange();

        async function deleteItemOder() {

            const list_order_btn = $$('.list-order-btn');
            // console.log(list_order_btn);
            if (list_order_btn.length > 1) {
                list_order_btn.forEach(element => {
                    deleteItem(element)
                });
            } else {
                deleteItem(list_order_btn);
            }

            function deleteItem(element) {

                const idp = element.dataset.id
                element.addEventListener('click', async () => {
                    const removeItem = $$(`.cor-${idp}`)
                    // const question = confirm('Are you want to delete?');
                    // if (question) {

                    element.addEventListener('click', async () => {
                        arrProduct = [];
                        const {
                            data: orderProduct
                        } = await ordersAPI.read(id);
                        orderProduct.product.forEach(element => {
                            if (element._id != idp) {
                                arrProduct.push(element)
                            }
                        })

                        // console.log(arrProduct);
                        let sumMoney = 0;
                        arrProduct.forEach(element => {
                            sumMoney += Number(element.totalMoney)
                        })
                        // console.log(sumMoney);
                        const data = arrProduct;
                        const dataUpdateOrder = {
                            // id: Number(id),
                            address: $$('input[name="address_order"]').value,
                            name: $$('input[name="name_order"]').value,
                            email: $$('input[name="email_order"]').value,
                            note: orders.note,
                            phone: $$('input[name="phone_order"]').value,
                            status: orders.status,
                            // days: orders.days,
                            product: data,
                            pay: orders.pay,
                            sumMoney: sumMoney
                        }
                        // console.log(dataUpdateOrder);
                        let {
                            _id
                        } = JSON.parse(localStorage.getItem('setAuthen'));
                        await ordersAPI.eidt(id, _id, dataUpdateOrder).then(() => {
                            removeItem.remove()
                            reRender(EditCart, '#edit-order-sum')
                            toast(
                                'Delete item product success', {
                                    duration: 3000
                                }, {
                                    // label: 'Confirm',
                                    action: () => alert('Fill in this field!'),
                                    class: 'my-custom-class', // optional, CSS class name for action button
                                },
                            );
                        })

                    });

                    // await ordersAPI.remove(id);

                    // await reRender(ListCartChild, '#list-cart');
                    // }
                })
            }
        }
        deleteItemOder();


    }
}
export default EditCart;