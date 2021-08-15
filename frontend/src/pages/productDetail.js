import Header from '../components/header';
import Footer from '../components/footer';
import categoryAPI from '../api/categoryAPI';
import toast from 'toast-me';
import {
    cartAPI
} from '../api/cartAPI';
import {
    isSetAuthen
} from '../untils';
import 'owl.carousel';
import {
    $$,
    prices,
    checkLogout,
    search,
    useParams
} from '../untils';
import productAPI from '../api/productAPI';

const ProductDetail = {
    async render() {
        // console.log(useParams());
        const {
            id
        } = useParams();
        // const response = await fetch("http://localhost:3001/products");
        // const data = await response.json();
        // console.log(data);
        // const result = data.find(element => {
        //     return element.id == id;
        // })
        // console.log(result.name); 

        const {
            data: result
        } = await productAPI.read(id);
        // console.log(await result._id);
        const {
            data: cate
        } = await categoryAPI.read(id);
        // console.log(cate);
        var productCate;
        if (cate) {
            productCate = cate.map(element => {
                // console.log(element.photo);
                const saleCate = () => {
                    if (element.sale > 0) {
                        return /*html*/ `
                    <span class="text-gray-500 text-lg line-through font-medium">${'$ '+prices(Number(element.price)).replace('VND',' ')} </span>
                    `;
                    } else {
                        return /*html*/ `
                    <span></span>
                    `;
                    }
                }
                const showSaleCate = () => {
                    if (element.sale > 0) {
                        return /*html*/ `
                    <span class="bg-red-300 px-2 py-1 text-white">${Math.round((100-(element.price-element.sale)*100/(element.price)),1)+'%'}</span>
                    `;
                    } else {
                        return /*html*/ `
                    <span class="bg-green-400 px-2 py-1 text-white">NEW</span>
                    `;
                    }
                }


                return /*html */ `
            <article class="group my-8 md:my-0 md:mx-2 xl:mx-0 ">
            <div class="relative  overflow-hidden">
                <img src="${element.photo}" alt="" style="width:270px; height:360px" class="w-full object-cover">
                <div class="absolute top-0 mt-4 ml-4">
                    ${showSaleCate()}
                </div>
                <div class="flex justify-center">
                    <div
                        class="absolute bottom-0 mb-8   text-xs  xl:text-xl transition duration-500 ease-in-out transform translate-y-40 group-hover:translate-y-0">
                        <a href="#"
                            class="bg-gray-200 text-sm  p-3 md:m-1 md:p-1 lg:p-3 xl:p-2 xl:px-3 rounded-full  hover:bg-red-600 hover:text-white"><i
                                class="fas fa-expand-arrows-alt transform hover:rotate-360 transition duration-500 ease-in-out "></i></a>
                        <a href="#"
                            class="bg-gray-200 text-sm  p-3 md:m-1  md:p-1 lg:p-3 xl:p-2 xl:px-3 rounded-full mx-4 hover:bg-red-600 hover:text-white"><i
                                class="far fa-heart transform hover:rotate-360 transition duration-500 ease-in-out "></i></a>
                        <a href="#"
                            class="bg-gray-200 text-sm  p-3  md:m-1  md:p-1 lg:p-3 xl:p-2 xl:px-3 rounded-full  hover:bg-red-600 hover:text-white"><i
                                class="fas fa-cart-plus transform hover:rotate-360 transition duration-500 ease-in-out "></i></a>
                    </div>
                </div>
            </div>
            <div class="text-center pt-4">
                <a href="#/products/${element._id}" class="block hover:text-red-500">${element.name}</a>
                <span class="block py-2 text-sm text-yellow-400"><i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i></span>
                <span class="font-medium">${'$ '+prices(Number(element.price-element.sale)).replace('VND',' ')}</span>
                ${saleCate()}
            </div>
        </article>
            `;
            }).join("");
        } else {
            productCate = null;
        }
        const size = result.size.map((element) => {
            return /*html */ `
            <option  value="${element}">${element}</option>
            `;
        }).join("");
        const imgChild = result.album.map((element) => {
            // console.log(element);
            return /*html*/ `
            <div>
            <img src="${element}"  style="Width:500px; height:588px" alt="" id="imgAll" class="object-cover shadow">
        </div>
            `;
        }).join("");

        const sales = () => {
            // console.log(result.sale);
            if (result.sale > 0) {
                return /*html*/ `
                <span class="text-gray-500 text-lg line-through font-medium">${'$ '+prices(Number(result.price)).replace('VND',' ')}</span>
                `;
            } else {
                return /*html*/ `
                <span class="text-gray-500 text-lg line-through font-medium">$ 0</span>
                `;
            }
        }
        // const checkUserCarts = () => {
        //     // console.log(isSetAuthen());
        //     if (isSetAuthen() != false) {
        //         return /*html*/ `
        //             <button 
        //                         class="bg-red-700 text-white py-3 px-6 rounded-full inline-block my-8 outline-none "  id="btn-to-cart"><span>
        //                             <i class="fas fa-cart-plus"> </i> ADD TO CART
        //                         </span> </button>
        //             `;
        //     } else {
        //         return /*html*/ `
        //             <p
        //                         class="bg-red-700 cursor-pointer text-white py-3 px-6 rounded-full inline-block my-8 outline-none " onclick="alert('Sign in to continue')"><span>
        //                             <i class="fas fa-cart-plus"> </i> ADD TO CART
        //                         </span> </p>
        //             `;
        //     }
        // }

        return /*html*/ `
        ${await Header.render()}
            <div class="container mx-auto px-16 pt-[120px]">
                <div class="my-3">
                    <a href="./index.html"><span><i class="fas fa-home"></i></span>
                        <span style="font-family: FontAwesome;">Home <span class="text-gray-500 text-sm">></span> ${result.category.name} <span class="text-gray-500 text-sm">></span> ${result.name} <span class="text-gray-600"></span></span>
                        </i></a>
                </div>
                <div class="grid md:grid-cols-2  mt-10 md:mt-0 wow fadeInDown " >
                    <div class=" ">
                        <div class="">
                        <div  class="owl-carousel">
                        <div>
                        <img src="${result.photo}"  style="Width:500px; height:588px" alt="" id="imgAll" class="object-cover shadow">
                    </div>
                    ${imgChild}
                        </div>
                        </div>
                    </div>
                    <!-- end content-img -->
                    <div >
                        <div class="mx-8">
                            <div>
                                <h3 class=" font-semibold text-xl md:text-3xl uppercase" id="name-product">
                                ${result.name}
                                </h3>
                                <span class="text-sm text-gray-600">Brand: ${result.category.name}</span>
                            </div>
                            <div>
                                <span class="inline-block py-2 text-xs text-yellow-500"><i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i></span>
                                <span class="inline text-xs text-gray-700">( 138 reviews )</span>
                            </div>
                            <div class="pb-6">
                                <span class="text-red-700 text-3xl font-semibold inline-block pt-2 pr-2">${'$ '+prices(Number(result.price-result.sale)).replace('VND',' ')} </span>
                                ${sales()}
                            </div>
                            <p class="text-sm text-gray-700 pb-8 w-[400px]">${result.description }</p>
                            <div>
                                <span>Quantity:</span>
                                <div class="inline-block border border-gray-500 rounded-full py-3 text-gray-700">  
                                <div class="flex justify-between items-center gap-5">
                                <span  class=" cursor-pointer pl-3" id="minus">-</span>
                                <input type="text" name="" id="number-cart" value="1" min="0"
                                    class=" outline-none text-center  w-12 bg-[#eeeeee]">
                                 <span  class="cursor-pointer pr-3" id="plus">+</span>
                                </div>
                                </div>
                                <button 
                                class="bg-red-700 text-white py-3 px-6 rounded-full inline-block my-8 outline-none "  id="btn-to-cart"><span>
                                    <i class="fas fa-cart-plus"> </i> ADD TO CART
                                </span> </button>
                                <div class="inline-block">
                                    <span class="border boder-gray-700 rounded-full p-4 mx-2"><i
                                            class="far fa-heart"></i></span>
                                    <span class="border boder-gray-700 rounded-full p-4 "><i
                                            class="fas fa-sliders-h"></i></span>
                                </div>
                            </div>
                            <hr class="my-8">
                            <div>
                                <div class="flex">
                                    <span>Availability:</span>
                                    <div class="pl-12">
                                        <label for="" class="text-gray-600 text-sm "><input type="checkbox" name=""
                                                id="">
                                            In
                                            Stock</label>
                                    </div>
                                </div>
                                <div class=" flex relative">
                                    <span>Available size:</span>
                                    <div class="pl-6 ">
                                    <select name="" id="size" class="pl-4 w-[75px] bg-[#eeeeee] shadow ml-1">
                                         ${size}
                                    </select>
                                    </div>
                                   
                                </div>
                                <div class="">
                                    <span>Promotions:</span>
                                    <span class="pl-10  text-sm text-gray-700">Free shipping</span>
                                </div>
                            </div>
                        </div>
                        <!-- end shop cart -->
                    </div>
                </div>
                <div class="mt-20">
                    <section class="wow rotateIn" data-wow-duration="2s" ">
                <nav>
                    <ul class=" flex justify-center">
                        <li class="text-lg font-medium"><a href="#"></a>Description</li>
                        <li class="text-lg px-2 md:px-14"><a href="#"></a>Specification</li>
                        <li class="text-lg"><a href="#"></a>Reviews ( 2 )</li>
                        </ul>
                        </nav>
                        <article class="text-gray-600 pt-12">
                            <h6 class="text-gray-800 text-base font-medium">Description</h6>
                            <p class="pt-6 pb-4 w-[1000px]">${result.content}</p>
                           
                        </article>
                    </section>
                    <section class="mt-20">
                        <h5 class="pb-8 font-semibold text-xl text-center">
                            RELATED PRODUCTS
                        </h5>
                        <div class="md:flex justify-between  gap-3 wow bounceInUp" data-wow-duration=" 1s">
                            ${productCate}
                        </div>
                    </section>
                </div>
                <!-- end content bottom -->
            </div>
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
                            class="absolute inset-0 text-white  text-center hidden group-hover:block hover:text-red-800  py-40">
                            <span><i class="fab fa-instagram block "></i><br>
                            </span>
                            <a href="#">@ ashion_shop</a>
                        </div>
                    </div>
                </div>
                <div class="relative group overflow-hidden">
                    <a href="#"><img src="./images/instagram/insta-3.jpg" alt="" class="w-screen object-cover"></a>
                    <div class="absolute  inset-0 opacity-75 hover:bg-white ">
                        <div
                            class="absolute inset-0 text-white hidden group-hover:block text-center hover:text-red-800 py-40">
                            <span><i class="fab fa-instagram block "></i><br>
                            </span>
                            <a href="#">@ ashion_shop</a>
                        </div>
                    </div>
                </div>
                <div class="relative group overflow-hidden">
                    <a href="#"><img src="./images/instagram/insta-4.jpg" alt="" class="w-screen object-cover"></a>
                    <div class="absolute  inset-0 opacity-75 hover:bg-white ">
                        <div
                            class="absolute inset-0 text-white hidden group-hover:block text-center hover:text-red-800 py-40">
                            <span><i class="fab fa-instagram block "></i><br>
                            </span>
                            <a href="#">@ ashion_shop</a>
                        </div>
                    </div>
                </div>
                <div class="relative group overflow-hidden">
                    <a href="#"><img src="./images/instagram/insta-5.jpg" alt="" class="w-screen object-cover"></a>
                    <div class="absolute  inset-0 opacity-75 hover:bg-white ">
                        <div
                            class="absolute inset-0 hidden group-hover:block text-white  text-center hover:text-red-800 py-40">
                            <span><i class="fab fa-instagram block "></i><br>
                            </span>
                            <a href="#">@ ashion_shop</a>
                        </div>
                    </div>
                </div>
                <div class="relative group overflow-hidden">
                    <a href="#"><img src="./images/instagram/insta-6.jpg" alt="" class="w-screen object-cover"></a>
                    <div class="absolute  inset-0 opacity-75 hover:bg-white ">
                        <div
                            class="absolute inset-0 text-white hidden group-hover:block  text-center hover:text-red-800 py-40">
                            <span><i class="fab fa-instagram block "></i><br>
                            </span>
                            <a href="#">@ ashion_shop</a>
                        </div>
                    </div>
                </div>
            </section>
            <!-- end section instagram -->
            ${Footer.render()}
            `;
    },
    async afterRender() {
        const {
            id
        } = useParams();
        const {
            data: result
        } = await productAPI.read(id);
        // console.log(result);
        checkLogout();
        search();
        $(document).ready(function () {
            $('.owl-carousel').owlCarousel({
                items: 1,
                loop: true,
                margin: 10,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true
            });
        });
        var number = $$('#number-cart');
        $$('#minus').onclick = () => {
            number.value = Number(number.value) - 1;
            if (number.value <= 1) {
                number.value = 1;
            }
        }
        $$('#plus').onclick = () => {
            number.value = Number(number.value) + 1;
        }
        var day = moment(new Date()).format('DD-MM-YYYY');
        // const {
        //     data: products
        // } = await cartAPI.list();
        // console.log(products);
        // var total = products.findIndex(element => element.productId == id);
        // console.log(total);
        $$('#btn-to-cart').onclick = async (e) => {
            e.preventDefault();
            console.log(isSetAuthen());
            if (isSetAuthen()) {
                const {
                    data: products
                } = await cartAPI.list();
                // console.log(products);
                var total = products.cart.findIndex(element => element.product == id);
                // console.log(total);
                if (total != -1) {
                    products.cart.forEach(async (element) => {
                        if (element.product == id) {
                            const carts = {
                                id: element._id,
                                product: id,
                                email: isSetAuthen().email,
                                name: result.name,
                                image: result.photo,
                                price: result.price,
                                sale: result.sale,
                                size: $$('#size').value,
                                totalmoney: Number(element.totalmoney) + (Number(result.price) - Number(result.sale)) * $$('#number-cart').value,
                                amount: Number(element.amount) + Number($$('#number-cart').value),
                                // status: 'not approved yet',
                                // days: day
                            }
                            // console.log(carts);
                            let {
                                _id
                            } = JSON.parse(localStorage.getItem('setAuthen'));
                            await cartAPI.edit(element._id, _id, carts).then(() => {
                                toast(
                                    `Add product: ${result.name} success to cart`, {
                                        duration: 3000
                                    }, {
                                        // label: 'Confirm',
                                        action: () => alert('Fill in this field!'),
                                        class: 'my-custom-class', // optional, CSS class name for action button
                                    },
                                );
                            })
                        }
                    });
                } else {
                    // console.log(result);
                    const carts = {
                        // id: Math.round(Math.random() * 700000),
                        product: id,
                        email: isSetAuthen().email,
                        name: result.name,
                        image: result.photo,
                        price: result.price,
                        sale: result.sale,
                        size: $$('#size').value,
                        totalMoney: (Number(result.price) - Number(result.sale)) * $$('#number-cart').value,
                        amount: $$('#number-cart').value,
                        // status: 'not approved yet',
                        // days: day
                    }
                    let {
                        _id
                    } = JSON.parse(localStorage.getItem('setAuthen'));
                    // console.log(_id);
                    await cartAPI.add(carts, _id).then(() => {
                        toast(
                            `Add product: ${result.name} success to cart`, {
                                duration: 3000
                            }, {
                                // label: 'Confirm',
                                action: () => alert('Fill in this field!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        );
                    })
                }
            } else {
                let cartStorage = localStorage.getItem('dataCart');
                let screenCart = null;
                if (cartStorage == null) {
                    screenCart = [];
                } else {
                    screenCart = JSON.parse(cartStorage);
                }
                const data = {
                    id: id,
                    name: result.name,
                    image: result.photo,
                    price: result.price,
                    sale: result.sale,
                    size: $$('#size').value,
                    amount: Number($$('#number-cart').value),
                    totalMoney: (Number(result.price) - Number(result.sale)) * Number($$('#number-cart').value),
                    // days: day
                }
                // var checkCart;
                // if (screenCart.length < 1 || screenCart.length == undefined) {
                //     if (screenCart.id == data.id) {
                //         checkCart = 1;
                //     } else {
                //         checkCart = -1;
                //     }
                // } else {
                //     checkCart = screenCart.findIndex(element => element.id == data.id);
                // }

                let checkCart = screenCart.findIndex(element => element.id == data.id);
                // console.log(checkCart);

                if (checkCart == -1) { // không có id nào trùng với trên local thì số lượng sẽ tăng lên 1 và push thêm object data vào mảng screenCart
                    
                    data.amount = 1;
                    screenCart.push(data);

                } else {
                    // console.log(screenCart.checkCart);
                    screenCart[checkCart].amount = screenCart[checkCart].amount + Number($$('#number-cart').value);
                    screenCart[checkCart].totalmoney = screenCart[checkCart].totalmoney + (Number(result.price) - Number(result.sale)) * Number($$('#number-cart').value);

                }
                // console.log(data);
                localStorage.setItem('dataCart', JSON.stringify(screenCart));
                toast(
                    `Add product: ${result.name} success to cart`, {
                        duration: 3000
                    }, {
                        // label: 'Confirm',
                        action: () => alert('Fill in this field!'),
                        class: 'my-custom-class', // optional, CSS class name for action button
                    },
                );
            }
        }
    }
}
export default ProductDetail;