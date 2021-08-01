import Header from '../components/header';
import Footer from '../components/footer';
import 'owl.carousel';
import {
    btnScoll,
    prices,
    checkLogout,
    search
} from '../untils';
const Home = {
    async render() {
        var result = '';
        try {
            // const response = await fetch("http://localhost:3001/products?_limit=12&_sort=id&_order=desc");
            const response = await fetch("http://localhost:4000/api/products?limit=12");

            const data = await response.json();
            // console.log(data.product);
            result = data.product.map(element => {
                // console.log(element.images[0]);
                const saleHome = () => {
                    if (element.sale > 0) {
                        return /*html*/ `
                        <span class="text-gray-500 text-sm line-through font-medium ">${prices(Number(element.price))}</span>
                        `;
                    } else {
                        return /*html*/ `
                        <span></span>
                        `;
                    }
                }
                const showSale = () => {
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
                return /*html*/ `
                <article class="text-center group py-8 md:py-0 md:mx-auto md:pb-6 lg:pb-0">
                <a href="#/products/${element._id}">
                    <div class=" relative  overflow-hidden">
                        <div class="flex justify-center">
                            <img src="${element.photo}" style="Width:270px; height:360px" alt="" class="w-full object-cover md:w-auto">
                        </div>
                        <div class="absolute top-0 mt-4 ml-4">
                            ${showSale()}
                        </div>
                        <div class="flex justify-center">
                            <div
                                class="absolute bottom-0 mb-8  text-xs   transition duration-500 ease-in-out transform translate-y-40 group-hover:translate-y-0">
                                <a href="#" class="bg-gray-200   p-3  rounded-full  hover:bg-red-600 hover:text-white"><i
                                        class="fas fa-expand-arrows-alt transform hover:rotate-360 transition duration-500 ease-in-out "></i></a>
                                <a href="#"
                                    class="bg-gray-200   p-3 rounded-full mx-4  hover:bg-red-600 hover:text-white"><i
                                        class="far fa-heart transform hover:rotate-360 transition duration-500 ease-in-out "></i></a>
                                <a href="#" class="bg-gray-200   p-3   rounded-full  hover:bg-red-600 hover:text-white"><i
                                        class="fas fa-cart-plus transform hover:rotate-360 transition duration-500 ease-in-out "></i></a>
                            </div>
                        </div>
                    </div>
                    </a>
                    <div class="pt-4">
                        <a href="#/products/${element._id}" class="block hover:text-red-500">${element.name}</a>
                        <span class="block py-2 text-sm text-yellow-400"><i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i></span>
                        <span class="font-medium text-xl">${prices(Number(element.price-element.sale))}</span>
                        ${saleHome()}
                    </div>
                </article>
                `;
            }).join('');
        } catch (error) {
            console.log(error);
        }

        return /*html*/ `
        ${ await  Header.render()}
        <div id="banner" class="">
            <section class="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-24">
                <div class="  relative">
                    <div class="object-cover">
                        <img src="./images/categories/category-1.jpg" alt="" class="h-full object-cover">
                        <div class="absolute inset-0 pt-48 pl-4 lg:pl-16 md:hidden ">
                            <span class="font-bold text-3xl lg:text-5xl block"
                                style="font-family: Cookie, cursive;">Women’s
                                fashion</span>
                            <p style="font-family: Montserrat, sans-serif;"
                                class="text-gray-600 py-4 text-xs lg:text-base block w-64">
                                Sitamet,
                                consectetur
                                adipiscing elit, sed do eiusmod
                                tempor<br> incidid-unt labore edolore magna
                                aliquapendisse ultrices gravida.</p>
                            <a href="#" class="inline-block uppercase group  font-bold pt-1 " style="left: 40%;">Shop
                                now<div
                                    class="transition duration-300 ease-in-out h-1 bg-red-700  w-full transform scale-x-0 group-hover:scale-x-100"
                                    style="height: 2px;"> </div> </a>
                        </div>
                        <div class="absolute inset-0 pt-48 pl-16 pr-64 hidden md:block">
                            <div class="owl-carousel">
                                <div>
                                    <span class="font-bold text-5xl block antialiased"
                                        style="font-family: Cookie, cursive;">Women’s
                                        fashion</span>
                                    <p style="font-family: Montserrat, sans-serif;"
                                        class="text-gray-600 py-4 text-base block">
                                        Sitamet,
                                        consectetur
                                        adipiscing elit, sed do eiusmod
                                        tempor<br> incidid-unt labore edolore magna
                                        aliquapendisse ultrices gravida.</p>
                                    <a href="#" class="inline-block uppercase group  font-bold pt-1 "
                                        style="left: 40%;">Shop
                                        now<div
                                            class="transition duration-300 ease-in-out h-1 bg-red-700  w-full transform scale-x-0 group-hover:scale-x-100"
                                            style="height: 2px;"> </div> </a>
                                </div>
                                <div>
                                    <span class="font-bold text-5xl block antialiased"
                                        style="font-family: Cookie, cursive;">Women’s
                                        fashion</span>
                                    <p style="font-family: Montserrat, sans-serif;"
                                        class="text-gray-600 py-4 text-base block">
                                        Sitamet,
                                        consectetur
                                        adipiscing elit, sed do eiusmod
                                        tempor<br> incidid-unt labore edolore magna
                                        aliquapendisse ultrices gravida.</p>
                                    <a href="#" class="inline-block uppercase group  font-bold pt-1 "
                                        style="left: 40%;">Shop
                                        now<div
                                            class="transition duration-300 ease-in-out h-1 bg-red-700  w-full transform scale-x-0 group-hover:scale-x-100"
                                            style="height: 2px;"> </div> </a>
                                </div>
                                <div>
                                    <span class="font-bold text-5xl block antialiased"
                                        style="font-family: Cookie, cursive;">Women’s
                                        fashion</span>
                                    <p style="font-family: Montserrat, sans-serif;"
                                        class="text-gray-600 py-4 text-base block">
                                        Sitamet,
                                        consectetur
                                        adipiscing elit, sed do eiusmod
                                        tempor<br> incidid-unt labore edolore magna
                                        aliquapendisse ultrices gravida.</p>
                                    <a href="#" class="inline-block uppercase group  font-bold pt-1 "
                                        style="left: 40%;">Shop
                                        now<div
                                            class="transition duration-300 ease-in-out h-1 bg-red-700  transform scale-x-0 group-hover:scale-x-100"
                                            style="height: 2px;"> </div> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end banner -->
                <div class="grid md:grid-cols-2 gap-3">
                    <div>
                        <div class="relative  wow bounceIn " data-wow-duration="1s">
                            <div class=" absolute pt-20 pl-12 ">
                                <span style="font-family: Montserrat, sans-serif;" class="font-semibold text-xl">Men’s
                                    fashion</span>
                                <a href="#" class="uppercase group block relative  font-medium pt-1">Shop now<div
                                        class="transition duration-300 ease-in-out h-1 bg-red-700 absolute left-0 w-full transform scale-x-0 group-hover:scale-x-100"
                                        style="height: 2px; width: 85px;"> </div> </a>
                            </div>
                            <div class="">
                                <img src="./images/categories/category-2.jpg" alt=""
                                    class="w-full md:w-auto h-full object-cover">
                            </div>
                        </div>
                        <div class="relative mt-3 wow bounceIn" data-wow-duration="1s">
                            <div class="absolute pt-20 pl-12">
                                <span style="font-family: Montserrat, sans-serif;"
                                    class="font-semibold text-xl">Cosmetics</span>
                                <a href="#" class="uppercase group block relative w-24 font-medium pt-1">Shop now<div
                                        class="transition duration-300 ease-in-out h-1 bg-red-700 absolute left-0 w-full transform scale-x-0 group-hover:scale-x-100"
                                        style="height: 2px; width: 85px;"> </div> </a>
                            </div>
                            <div>
                                <img src="./images/categories/category-4.jpg" alt=""
                                    class="w-full md:w-auto h-full object-cover">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="relative  wow  bounceIn" data-wow-duration="1s">
                            <div class="absolute pt-20 pl-12">
                                <span style="font-family: Montserrat, sans-serif;" class="font-semibold text-xl">Kid’s
                                    fashion</span>
                                <a href="#" class="uppercase group block relative w-24 font-medium pt-1">Shop now<div
                                        class="transition duration-300 ease-in-out h-1 bg-red-700 absolute left-0 w-full transform scale-x-0 group-hover:scale-x-100"
                                        style="height: 2px; width: 85px;"> </div> </a>
                            </div>
                            <div>
                                <img src="./images/categories/category-3.jpg" alt=""
                                    class="w-full md:w-auto h-full object-cover">
                            </div>
                        </div>
                        <div class="relative mt-3 wow bounceIn" data-wow-duration="1s">
                            <div class="absolute pt-20 pl-12">
                                <span style="font-family: Montserrat, sans-serif;"
                                    class="font-semibold text-xl">Accessories</span>
                                <a href="#" class="uppercase group block relative w-24 font-medium pt-1">Shop now<div
                                        class="transition duration-300 ease-in-out h-1 bg-red-700 absolute left-0 w-full transform scale-x-0 group-hover:scale-x-100"
                                        style="height: 2px; width: 85px;"> </div> </a>
                            </div>
                            <div>
                                <img src="./images/categories/category-5.jpg" alt=""
                                    class="w-full md:w-auto h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- end section banner -->
            <section class="container mx-auto mt-16 px-16 text-center">
                <div class="flex justify-between xl:ml-3 mb-8 ld:mb-12 wow bounceIn" data-wow-duration="3s" ">
                <div>
                    <h4 class=" font-semibold text-xl text-left lg:text-1xl">NEW PRODUCT</h4>
                    <div class="bg-red-700 w-12" style="height: 2px;"></div>
                </div>
                <nav class="hidden lg:block">
                    <ul class="flex">
                        <li><a href="#" class="px-6 hover:bg-green-200 hover:text-red-500 rounded-md py-1">All</a></li>
                        <li><a href="#" class="px-6 hover:bg-green-200 hover:text-red-500 rounded-md py-1">Women’s</a>
                        </li>
                        <li><a href="#" class="px-6 hover:bg-green-200 hover:text-red-500 rounded-md py-1">Men's</a>
                        </li>
                        <li><a href="#" class="px-6 hover:bg-green-200 hover:text-red-500 rounded-md py-1">Kid's</a>
                        </li>
                        <li><a href="#"
                                class="px-6 hover:bg-green-200 hover:text-red-500 rounded-md py-1">Accessories</a>
                        </li>
                        <li><a href="#" class="px-6 hover:bg-green-200 hover:text-red-500 rounded-md py-1">Cosmetics</a>
                        </li>
                    </ul>
                </nav>
        </div>
        <nav class=" hidden md:block lg:hidden pt-3 pb-8 pl-6">
            <ul class="flex">
                <li><a href="#" class="px-2   hover:bg-green-200 hover:text-red-500 rounded-md py-1">All</a></li>
                <li><a href="#" class="px-2 hover:bg-green-200 hover:text-red-500 rounded-md py-1">Women’s</a></li>
                <li><a href="#" class="px-2 hover:bg-green-200 hover:text-red-500 rounded-md py-1">Men's</a></li>
                <li><a href="#" class="px-2 hover:bg-green-200 hover:text-red-500 rounded-md py-1">Kid's</a></li>
                <li><a href="#" class="px-2 hover:bg-green-200 hover:text-red-500 rounded-md py-1">Accessories</a></li>
                <li><a href="#" class="px-2 hover:bg-green-200 hover:text-red-500 rounded-md py-1">Cosmetics</a></li>
            </ul>
        </nav>
        <div class="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-2 wow bounceInUp text-center"
            data-wow-duration=" 2s">
         ${result}
        </div>
        </section>
        <!-- end section content -->
        <section class="banner-product relative overflow-hidden md:my-24 ">
            <img src="./images/banner/banner-1.jpg" alt="" class="object-cover">
            <div class="absolute inset-0 pt-48 ">
                <div class="md:hidden text-center ">
                    <span class="text-red-600 text-lg block">THE CHLOE
                        COLLECTION</span>
                    <span style="font-family: Cookie, cursive; " class="block font-black text-3xl py-6 ">THE
                        PRIOJECT
                        JACKET</span>
                    <a href="#" class="inline-block uppercase group  w-32 font-bold text-lg">Shop
                        now<div
                            class="transition duration-300 ease-in-out h-1 bg-red-700  w-full transform scale-x-0 group-hover:scale-x-100"
                            style="height: 2px;"> </div> </a>
                </div>
                <div class="text-center owl-carousel " style="padding: 0px 250px;">
                    <div class="hidden md:block">
                        <span class="text-red-600  xl:text-1xl ">THE CHLOE COLLECTION</span>
                        <span style="font-family: Cookie, cursive; "
                            class="block font-black text-2xl xl:text-5xl pt-2 pb-8 ">THE
                            PRIOJECT
                            JACKET</span>
                        <a href="#" class="inline-block uppercase group  w-24 font-bold pt-1 " style="left: 40%;">Shop
                            now<div
                                class="transition duration-300 ease-in-out h-1 bg-red-700  w-full transform scale-x-0 group-hover:scale-x-100"
                                style="height: 2px;"> </div> </a>
                    </div>
                    <div class="hidden md:block">
                        <span class="text-red-600  xl:text-1xl ">THE CHLOE COLLECTION</span>
                        <span style="font-family: Cookie, cursive; "
                            class="block font-black text-2xl xl:text-5xl pt-2 pb-8 ">THE
                            PRIOJECT
                            JACKET</span>
                        <a href="#" class="inline-block uppercase group  w-24 font-bold pt-1 " style="left: 40%;">Shop
                            now<div
                                class="transition duration-300 ease-in-out h-1 bg-red-700  w-full transform scale-x-0 group-hover:scale-x-100"
                                style="height: 2px;"> </div> </a>
                    </div>
                    <div class="hidden md:block">
                        <span class="text-red-600  xl:text-1xl ">THE CHLOE COLLECTION</span>
                        <span style="font-family: Cookie, cursive; "
                            class="block font-black text-2xl xl:text-5xl pt-2 pb-8 ">THE
                            PRIOJECT
                            JACKET</span>
                        <a href="#" class="inline-block uppercase group  w-24 font-bold pt-1 " style="left: 40%;">Shop
                            now<div
                                class="transition duration-300 ease-in-out h-1 bg-red-700  w-full transform scale-x-0 group-hover:scale-x-100"
                                style="height: 2px;"> </div> </a>
                    </div>
                </div>
            </div>
        </section>
        <!-- end section banner slideshow -->
        <section class="container mx-auto md:flex justify-between px-16  xl:ml-auto mt-12 md:mt-0">
            <div class=" wow rollIn " data-wow-duration=" 1s">
                <div class=" mb-12">
                    <h4 class="font-semibold lg:text-xl">HOT TREND</h4>
                    <div class="bg-red-700 w-12" style="height: 2px;"></div>
                </div>
                <div>
                    <div>
                        <a href="#" class="flex overflow-hidden">
                            <img src="./images/trend/ht-1.jpg" alt=""
                                class="transition delay-150 duration-500 ease-in-out transform  hover:scale-110 object-cover">
                            <div class="pl-3 pt-1">
                                <span class="hover:text-red-500">Chain bucket bag</span>
                                <span class="block text-yellow-400 text-xs py-2"><i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i></span>
                                <span class="font-medium">$ 59.0</span>
                            </div>
                        </a>
                    </div>
                    <div class="my-4">
                        <a href="#" class="flex overflow-hidden">
                            <img src="./images/trend/ht-2.jpg" alt=""
                                class="transition delay-150 duration-500 ease-in-out transform  hover:scale-110 object-cover">
                            <div class="pl-3 pt-1">
                                <span class="hover:text-red-500">Pendant earrings</span>
                                <span class="block text-yellow-400 text-xs py-2"><i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i></span>
                                <span class="font-medium">$ 59.0</span>
                            </div>
                        </a>
                    </div>
                    <div>
                        <a href="#" class=" flex overflow-hidden">
                            <img src="./images/trend/ht-3.jpg" alt=""
                                class="transition delay-150 duration-500 ease-in-out transform  hover:scale-110 object-cover">
                            <div class="pl-3 pt-1">
                                <span class="hover:text-red-500">Cotton T-Shirt</span>
                                <span class="block text-yellow-400 text-xs py-2"><i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i></span>
                                <span class="font-medium">$ 59.0</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div class="py-12 md:py-0 xl:px-64 lg:px-32 wow rollIn " data-wow-duration=" 1s">
                <div class=" mb-12 ">
                    <h4 class="font-semibold lg:text-xl">BEST SELLER</h4>
                    <div class="bg-red-700 w-16" style="height: 2px;"></div>
                </div>
                <div>
                    <div>
                        <a href="#" class="  flex overflow-hidden">
                            <img src="./images/trend/bs-1.jpg" alt=""
                                class="transition delay-150 duration-500 ease-in-out transform  hover:scale-110 object-cover">
                            <div class="pl-3 pt-1">
                                <span class="hover:text-red-500">Chain bucket bag</span>
                                <span class="block text-yellow-400 text-xs py-2"><i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i></span>
                                <span class="font-medium">$ 59.0</span>
                            </div>
                        </a>
                    </div>
                    <div class="my-4">
                        <a href="#" class=" flex overflow-hidden">
                            <img src="./images/trend/bs-2.jpg" alt=""
                                class="transition delay-150 duration-500 ease-in-out transform  hover:scale-110 object-cover">
                            <div class="pl-3 pt-1">
                                <span class="hover:text-red-500">Zip-pockets pebbled tote<br>
                                    briefcase </span>
                                <span class="block text-yellow-400 text-xs py-2"><i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i></span>
                                <span class="font-medium">$ 59.0</span>
                            </div>
                        </a>
                    </div>
                    <div>
                        <a href="#" class=" flex overflow-hidden">
                            <img src="./images/trend/bs-3.jpg" alt=""
                                class="transition delay-150 duration-500 ease-in-out transform  hover:scale-110 object-cover">
                            <div class="pl-3 pt-1">
                                <span class="hover:text-red-500">Round leather bag</span>
                                <span class="block text-yellow-400 text-xs py-2"><i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i></span>
                                <span class="font-medium">$ 59.0</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div class="wow rollIn" data-wow-duration=" 1s">
                <div class=" mb-12">
                    <h4 class="font-semibold lg:text-xl">FEATURE</h4>
                    <div class="bg-red-700 w-16" style="height: 2px;"></div>
                </div>
                <div>
                    <div>
                        <a href="#" class="flex overflow-hidden">
                            <img src="./images/trend/f-1.jpg" alt=""
                                class="transition delay-150 duration-500 ease-in-out transform  hover:scale-110 object-cover">
                            <div class="pl-3 pt-1">
                                <span class="hover:text-red-500">Bow wrap skirt</span>
                                <span class="block text-yellow-400 text-xs py-2"><i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i></span>
                                <span class="font-medium">$ 59.0</span>
                            </div>
                        </a>
                    </div>
                    <div class="my-4">
                        <a href="#" class=" flex overflow-hidden">
                            <img src="./images/trend/f-2.jpg" alt=""
                                class="transition delay-150 duration-500 ease-in-out transform  hover:scale-110 object-cover">
                            <div class="pl-3 pt-1">
                                <span class="hover:text-red-500">Metallic earrings</span>
                                <span class="block text-yellow-400 text-xs py-2"><i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i></span>
                                <span class="font-medium">$ 59.0</span>
                            </div>
                        </a>
                    </div>
                    <div>
                        <a href="#" class="flex overflow-hidden">
                            <img src="./images/trend/f-3.jpg" alt=""
                                class="transition delay-150 duration-500 ease-in-out transform  hover:scale-110 object-cover">
                            <div class="pl-3 pt-1">
                                <span class="hover:text-red-500">Flap cross-body bag</span>
                                <span class="block text-yellow-400 text-xs py-2"><i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i></span>
                                <span class="font-medium">$ 59.0</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div>
            </div>
            <div>
            </div>
        </section>
        <!-- end section contenttwo -->
        <section class="my-16 md:px-16 container md:mx-auto grid lg:grid-cols-4 ">
            <div class="w-screen md:w-auto col-span-2 wow slideInLeft" data-wow-duration=" 1s">
                <img src=" ./images/discount.jpg" alt="" class="w-full object-cover">
            </div>
            <div class="col-span-2 relative bg-gray-200  wow swing " data-wow-duration=" 1s">
                <div>
                    <div class=" absolute inline-block bg-yellow-300 opacity-25 border-dotted border-red-600 rounded-full"
                        style="width: 45%;;height: 50%;margin-left: 27%;margin-top: 2%;">
                    </div>
                    <div class="pt-12 text-center">
                        <span style="font-family: Montserrat, sans-serif;" class="block ">DISCOUNT</span>
                        <span style="font-family: Cookie, cursive;"
                            class="text-red-600 text-5xl font-semibold block">Summer
                            2019</span>
                        <span>SALE <span class="text-red-600 font-bold">50%</span></span>
                    </div>
                    <div class="px-32 pt-16 lg:pt-0 xl:pt-16 flex justify-between items-center">
                        <div>
                            <span class="md:text-3xl font-bold" id="dayF"></span>
                            <span class="text-xs">Day</span>
                        </div>
                        <div>
                            <span class="md:text-3xl font-bold" id="hours"></span>
                            <span class="text-xs">Hour</span>
                        </div>
                        <div>
                            <span class="md:text-3xl font-bold" id="minute"></span>
                            <span class="text-xs">Min</span>
                        </div>
                        <div>
                            <span class="md:text-3xl font-bold" id="seconds"></span>
                            <span class="text-xs">Sec</span>
                        </div>
                    </div>
                    <div class="pt-4 pb-10 lg:pb-0 flex justify-center ">
                        <a href="#" class="uppercase group block relative  font-bold pt-1" style="width: 90px;">Shop now
                            <div class="transition duration-300 ease-in-out bg-red-700 absolute left-0 w-full transform scale-x-0 group-hover:scale-x-100"
                                style="height: 2px;"> </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <!-- end section sale -->
        <section
            class="container mx-auto grid grid-cols-1 md:flex justify-between items-center wow slideInRight mt-20  "
            data-wow-duration=" 1s">
            <div>

            </div>
            <div class=" flex mx-auto">
                <div class="text-red-500 text-4xl">
                    <span><i class="fas fa-car-side"></i></span>
                </div>
                <div style="font-family: Montserrat, sans-serif;" class="pl-4">
                    <span class="font-medium block">Free Shipping</span>
                    <span class="text-sm text-gray-600">For all oder over $99</span>
                </div>
            </div>
            <div class="flex py-2 mx-auto">
                <div class="text-red-500 text-4xl">
                    <span><i class="far fa-money-bill-alt"></i></span>
                </div>
                <div style="font-family: Montserrat, sans-serif;" class="pl-4">
                    <span class="font-medium block">Free Shipping</span>
                    <span class="text-sm text-gray-600">For all oder over $99</span>
                </div>
            </div>
            <div class="flex mx-auto">
                <div class="text-red-500 text-4xl">
                    <span><i class="far fa-life-ring"></i></span>
                </div>
                <div style="font-family: Montserrat, sans-serif;" class="pl-4">
                    <span class="font-medium block">Free Shipping</span>
                    <span class="text-sm text-gray-600">For all oder over $99</span>
                </div>
            </div>
            <div class="flex  py-2 mx-auto">
                <div class="text-red-500 text-4xl">
                    <span><i class="fas fa-headphones"></i></span>
                </div>
                <div style="font-family: Montserrat, sans-serif;" class="pl-4">
                    <span class="font-medium block">Free Shipping</span>
                    <span class="text-sm text-gray-600">For all oder over $99</span>
                </div>
            </div>
        </section>
        <!-- end section freeship -->
        <section class="instagram md:flex my-16 ">
            <div class="relative group overflow-hidden">
                <a href="#"><img src="./images/instagram/insta-1.jpg" alt="" class="w-screen object-cover"></a>
                <div class="absolute  inset-0 opacity-75 hover:bg-white ">
                    <div
                        class=" absolute inset-0 text-white hidden group-hover:block  text-center hover:text-red-800 py-40">
                        <span><i class="fab fa-instagram block "></i>
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
                        <span><i class="fab fa-instagram block "></i>
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
                        <span><i class="fab fa-instagram block "></i>
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
                        <span><i class="fab fa-instagram block "></i>
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
                        <span><i class="fab fa-instagram block "></i>
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
                        <span><i class="fab fa-instagram block "></i>
                        </span>
                        <a href="#">@ ashion_shop</a>
                    </div>
                </div>
            </div>
        </section>
        ${Footer.render()}
     `;
    },
    async afterRender() {
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
        checkLogout();
        btnScoll();
        search();
        // Set the date we're counting down to
        var countDownDate = new Date("november 21, 2021 23:59:00").getTime();

        // Update the count down every 1 second
        const x = setInterval(function () {

            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            let hoursF = document.getElementById('hours');
            let secondsF = document.getElementById('seconds');
            let minuteF = document.getElementById('minute');
            let dayF = document.getElementById('dayF');
            hoursF.innerHTML = hours;
            minuteF.innerHTML = minutes;
            secondsF.innerHTML = seconds;
            dayF.innerHTML = days;
            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "EXPIRED";
            }
        }, 1000);
    }
}

export default Home;