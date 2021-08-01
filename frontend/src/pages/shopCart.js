import Header from '../components/header';
import Footer from '../components/footer';
import {
    cartAPI
} from '../api/cartAPI';
import {
    $$,
    showCartNotUser,
    checkLogout,
    isSetAuthen,
    search
} from '../untils';
const ShopCart = {
    async render() {
        var status;
        if (isSetAuthen()) {
            var {
                data: {
                    data
                }
            } = await cartAPI.listUser(isSetAuthen().email);
        } else {
            status = '';
            if (showCartNotUser()) {
                // console.log(1);
                var data = showCartNotUser();
            }
        }
        // console.log(data);
        var showShopCarts;
        if (showCartNotUser() || isSetAuthen()) {
            if (data.length === 0 && isSetAuthen()) {
                var tables = () => {
                    return `<h2 class="text-center"><button><a href="/#/products">BUY NOW</a></button><h2>`
                }
            } else {
                var tables = () => {
                    return `
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
                                    ${showShopCarts}
                                </tbody>
                            </table>
                        </div>

                        <div class="flex justify-center lg:justify-end">
                        <div class="mt-14 bg-gray-100 w-80">
                            <div class="p-12">
                                <h2 class="text-sm lg:text-lg font-bold">CART TOTAL</h2>
                                <div class="my-4">
                                    <div class="flex justify-between items-center">
                                        <div class="font-medium text-sm md:text-lg">
                                            <span>Subtotal</span>
                                        </div>
                                        <div class="text-red-500 font-normal text-xs md:text-base">
                                            $ <span class="subtotal">0</span>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center mt-2">
                                        <div class=" font-medium  text-sm md:text-lg">
                                            <span>Total</span>
                                        </div>
                                        <div class="text-red-500 font-normal text-xs md:text-base">
                                            $<span class="totals">750</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="text-center font-bold text-white rounded-lg bg-red-500 hover:text-green-300 ">
                                    <a href="#/checkout"><button class="py-1 px-3 text-xs md:text-base" id="check-Btn">
                                    PROCEED TO CHECKOUT
                                </button></a>
                                </div>
                            </div>

                        </div>
                    </div>
                `;
                }
            }
            showShopCarts = data.map(element => {
                if (isSetAuthen()) {
                    var trashCart = () => {

                        return `<button data-id="${element._id}"
                    class="list-cart-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                        <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button>`;

                    }
                } else {
                    trashCart = () => {
                        return `<button data-id="${element._id}"
                    class="list-cart-btn-local bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                        <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button>`;
                    }
                }
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
            ${trashCart()}
            </td>
        </tr>
            `;
            }).join("");
        } else {
            tables = () => {
                return `<h2 class="text-center"><button><a href="/#/products">BUY NOW</a></button><h2>`;
            }
        }


        return /*html */ `
        ${await Header.render()}
        <div  id="scart">
        <main class="pt-24">
            <div>
                <div class="container mx-auto px-16 pt-4">
                    <div class="my-8 ">
                        <a href="./index.html"><span><i class="fas fa-home"></i></span>
                            <span style="font-family: FontAwesome;">Home > <span class="text-gray-600">Shopping
                                    cart</span></span>
                            </i></a>
                    </div>

                    ${tables()}

                    

                </div>
            </div>
            <!-- end content -->


            <section class="instagram md:flex my-16 ">
            <div class="relative group overflow-hidden">
                <a href="#"><img src="./images/instagram/insta-1.jpg" alt="" class="w-screen object-cover"></a>
                <div class="absolute  inset-0 opacity-75 hover:bg-white ">
                <div
                class=" absolute inset-0 text-white hidden group-hover:block  text-center hover:text-red-800 py-40">
                <span><i class="fab fa-instagram block"></i><br>
                    <a href="#">@ ashion_shop</a>
                </span>
            </div>
                </div>
            </div>
            <div class="relative group overflow-hidden">
                <a href="#"><img src="./images/instagram/insta-2.jpg" alt="" class="w-screen object-cover"></a>
                <div class="absolute  inset-0 opacity-75 hover:bg-white ">
                <div
                class=" absolute inset-0 text-white hidden group-hover:block  text-center hover:text-red-800 py-40">
                <span><i class="fab fa-instagram block"></i><br>
                    <a href="#">@ ashion_shop</a>
                </span>
            </div>
                </div>
            </div>
            <div class="relative group overflow-hidden">
                <a href="#"><img src="./images/instagram/insta-3.jpg" alt="" class="w-screen object-cover"></a>
                <div class="absolute  inset-0 opacity-75 hover:bg-white ">
                <div
                class=" absolute inset-0 text-white hidden group-hover:block  text-center hover:text-red-800 py-40">
                <span><i class="fab fa-instagram block"></i><br>
                    <a href="#">@ ashion_shop</a>
                </span>
            </div>
                </div>
            </div>
            <div class="relative group overflow-hidden">
                <a href="#"><img src="./images/instagram/insta-4.jpg" alt="" class="w-screen object-cover"></a>
                <div class="absolute  inset-0 opacity-75 hover:bg-white ">
                <div
                class=" absolute inset-0 text-white hidden group-hover:block  text-center hover:text-red-800 py-40">
                <span><i class="fab fa-instagram block"></i><br>
                    <a href="#">@ ashion_shop</a>
                </span>
            </div>
                </div>
            </div>
            <div class="relative group overflow-hidden">
                <a href="#"><img src="./images/instagram/insta-5.jpg" alt="" class="w-screen object-cover"></a>
                <div class="absolute  inset-0 opacity-75 hover:bg-white ">
                <div
                class=" absolute inset-0 text-white hidden group-hover:block  text-center hover:text-red-800 py-40">
                <span><i class="fab fa-instagram block"></i><br>
                    <a href="#">@ ashion_shop</a>
                </span>
            </div>
                </div>
            </div>
            <div class="relative group overflow-hidden">
                <a href="#"><img src="./images/instagram/insta-6.jpg" alt="" class="w-screen object-cover"></a>
                <div class="absolute  inset-0 opacity-75 hover:bg-white ">
                <div
                class=" absolute inset-0 text-white hidden group-hover:block  text-center hover:text-red-800 py-40">
                <span><i class="fab fa-instagram block"></i><br>
                    <a href="#">@ ashion_shop</a>
                </span>
            </div>
                </div>
            </div>
        </section>
        <!-- end section instagram -->
            ${Footer.render()}
        </main>
    </div>
    <!-- end container -->
        `;
    },
    async afterRender() {

        checkLogout();
        search();
        const changeNumber = $$('.change-number')
        const total = $$('.quantityProduct');
        const priceProduct = $$('.priceProduct');
        const priceSale = $$('.priceSale');

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
            $$('.totals').innerHTML = Number($$('.quantityProduct').innerHTML) + Number($$('.subtotal').innerHTML);
            changeNumber.onchange = () => {
                total.innerHTML = (Number(priceProduct.innerHTML) - Number(priceSale.innerHTML)) * Number(changeNumber.value);
                $$('.totals').innerHTML = Number($$('.quantityProduct').innerHTML) + Number($$('.subtotal').innerHTML);
            }
            $$('.minus').addEventListener('click', () => {
                changeNumber.value = changeNumber.value - 1;
                if (changeNumber.value <= 1) {
                    changeNumber.value = 1;
                }
                total.innerHTML = (Number(priceProduct.innerHTML) - Number(priceSale.innerHTML)) * Number(changeNumber.value);
                $$('.totals').innerHTML = Number($$('.quantityProduct').innerHTML) + Number($$('.subtotal').innerHTML);
            });
            $$('.plus').addEventListener('click', () => {
                changeNumber.value = Number(changeNumber.value) + 1;
                total.innerHTML = (Number(priceProduct.innerHTML) - Number(priceSale.innerHTML)) * Number(changeNumber.value);
                $$('.totals').innerHTML = Number($$('.quantityProduct').innerHTML) + Number($$('.subtotal').innerHTML);
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
            // console.log(sum);
            $$('.totals').innerHTML = Number(sum) + Number($$('.subtotal').innerHTML);
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
            const id = element.dataset.id
            element.addEventListener('click', async () => {
                let totalmoney = 0,
                    amount = 0;
                if ($$('.quantityProduct')[index] && $$('.change-number')[index]) {
                    totalmoney = $$('.quantityProduct')[index].innerHTML;
                    amount = $$('.change-number')[index].value;
                } else {
                    totalmoney = $$('.quantityProduct').innerHTML;
                    amount = $$('.change-number').value;
                }
                const dataUpdate = {
                    id: Number(id),
                    product: element.dataset.idp,
                    email: isSetAuthen().email,
                    name: element.dataset.idname,
                    image: element.dataset.idimage,
                    price: element.dataset.idprice,
                    sale: element.dataset.idsale,
                    size: element.dataset.idsize,
                    // status: element.dataset.idstatus,
                    // days: element.dataset.iddays,
                    totalMoney: Number(totalmoney),
                    amount: amount
                }
                // console.log(dataUpdate);
                let {
                    _id
                } = JSON.parse(localStorage.getItem('setAuthen'));
                await cartAPI.edit(id, _id, dataUpdate);
            });
        }


        function checkPlus(element, index) {
            const id = element.dataset.id
            element.addEventListener('click', async () => {
                let totalmoney = 0,
                    amount = 0;
                if ($$('.quantityProduct')[index] && $$('.change-number')[index]) {
                    totalmoney = $$('.quantityProduct')[index].innerHTML;
                    amount = $$('.change-number')[index].value;
                } else {
                    totalmoney = $$('.quantityProduct').innerHTML;
                    amount = $$('.change-number').value;
                }
                const dataUpdate = {
                    id: Number(id),
                    productId: element.dataset.idp,
                    user: isSetAuthen().email,
                    name: element.dataset.idname,
                    image: element.dataset.idimage,
                    price: element.dataset.idprice,
                    sale: element.dataset.idsale,
                    size: element.dataset.idsize,
                    status: element.dataset.idstatus,
                    days: element.dataset.iddays,
                    totalmoney: Number(totalmoney),
                    amount: amount
                }
                // console.log(dataUpdate);
                let {
                    _id
                } = JSON.parse(localStorage.getItem('setAuthen'));
                await cartAPI.edit(id, _id, dataUpdate);
            });
        }
        // function unUserChangenumber() {
        //     const arr = JSON.parse(localStorage.getItem('dataCart'))
        //     const newArr = [];
        //     $$('.minus').forEach((element, index) => {
        //         const id = element.dataset.id
        //         element.addEventListener('click', async () => {
        //             // console.log(arr[index]);
        //             delete arr[index];
        //             arr.forEach(ele => {
        //                 console.log(ele);
        //                 newArr.push(ele);
        //             })
        //             console.log(newArr);
        //             const data = {
        //                 id: id,
        //                 name: element.dataset.idname,
        //                 image: element.dataset.idimage,
        //                 price: element.dataset.idprice,
        //                 sale: element.dataset.idsale,
        //                 size: element.dataset.idsize,
        //                 amount: $$('.change-number')[index].value,
        //                 totalmoney: $$('.quantityProduct')[index].innerHTML,
        //                 days: element.dataset.iddays,
        //             }
        //             newArr.push(data);
        //             console.log(newArr);
        //             // localStorage.removeItem('dataCart')
        //             // localStorage.setItem('dataCart', JSON.stringify(newArr));

        //         });
        //     });
        // }


        if (isSetAuthen()) {
            updateNumberChange();

            const btns = $$('.list-cart-btn')

            function deleteItem(element) {
                const id = element.dataset.id
                element.addEventListener('click', async () => {
                    const question = confirm('Are you want to delete?');
                    if (question) {
                        // console.log(id);
                        await cartAPI.remove(id);

                        var removeItem = $$(`.cor-${id}`);
                        if (removeItem) {
                            await removeItem.remove();
                            if (btns.length > 2) {
                                console.log(btns.length);
                                totals();
                            } else {
                                $$('.totals').innerHTML = Number($$('.quantityProduct').innerHTML) + Number($$('.subtotal').innerHTML);
                            }
                            const {
                                data
                            } = await cartAPI.list();
                            if (data.length === 0) {
                                window.location.hash = `/products`;
                            }
                        }
                    }
                })
            }
            if (btns.length > 1) {
                btns.forEach((element) => {
                    deleteItem(element)
                });
            } else {
                deleteItem(btns);
            }
        } else {
            // unUserChangenumber();
            const btns_local = $$('.list-cart-btn-local');
            const arr = JSON.parse(localStorage.getItem('dataCart'))
            const newArr = [];

            function deleteItem(element, index) {
                const id = element.dataset.id;
                // console.log(id);
                element.addEventListener('click', async () => {
                    const question = confirm('Are you want to delete?');
                    var removeItem = $$(`.cor-${id}`);
                    console.log(arr.length);
                    if (arr.length > 1) {
                        if (question) {
                            // console.log(localStorage.getItem('dataCart'));
                            if (removeItem) {
                                delete arr[index];
                                arr.forEach(ele => {
                                    newArr.push(ele);
                                })
                                localStorage.removeItem('dataCart')
                                localStorage.setItem('dataCart', JSON.stringify(newArr));
                                removeItem.remove();
                                if (btns_local.length > 2) {
                                    totals();
                                } else {
                                    $$('.totals').innerHTML = Number($$('.quantityProduct').innerHTML) + Number($$('.subtotal').innerHTML);
                                }

                            }
                        }
                    } else {
                        // console.log(removeItem);
                        if (removeItem) {
                            localStorage.removeItem('dataCart');
                            removeItem.remove();
                            if (btns_local.length > 2) {
                                totals();
                            } else {
                                $$('.totals').innerHTML = Number($$('.quantityProduct').innerHTML) + Number($$('.subtotal').innerHTML);
                            }
                            if (!localStorage.getItem("dataCart")) {
                                window.location.hash = `/products`;
                            }
                        }
                    }
                })
            }
            if (btns_local.length > 1) {
                btns_local.forEach((element, index) => {
                    deleteItem(element, index)

                });
            } else {
                // console.log(2);
                deleteItem(btns_local);

            }
        }
    }
}
export default ShopCart;