import {
    isSetAuthen,
    $$
} from "../untils";
import {
    informationAPI
} from "../api/informationAPI";
// import {
//     UserAPI
// } from "../api/userAPI";
const Header = {
    async render() {
        const {
            data: logo
        } = await informationAPI.listcontact();
        const user = async () => {
            if (isSetAuthen()) {
                // console.log(isSetAuthen().name);
                // const {
                //     data: user
                // } = await UserAPI.listedit(isSetAuthen().sub)
                var name = isSetAuthen().name;
                if (isSetAuthen().permission !== 0) {
                    if (isSetAuthen() == false) {
                        return ` <a href="#/signin">Login</a>
                    <a href="#/signup">/ Register</a>`;
                    } else {
                        return /*html*/ `
                        <div class="group text-center">
                    Hi ${name}  
                        <div class="hidden group-hover:block absolute z-20 bg-white rounded-md  border border-blue-600" >
                        <a href="/#/dashboard"><div class="hover:bg-gray-200 rounded-t-md py-2  "><i class="fas fa-user-shield"></i>
                        <button  class="text-sm font-semibold text-black hover:text-[#89229b]" >Admin </button>
                        </div></a>
                        <a href="/#/order"><div class="hover:bg-gray-200 rounded-t-md py-2  "><i class="fas fa-file-medical-alt"></i>
                        <button  class="text-sm font-semibold text-black hover:text-[#89229b]" >Order </button>
                        </div></a>
                        <div class=" hover:bg-gray-200 ">
                        <button class=" cursor-pointer  rounded-b-md px-10 text-sm py-2 font-semibold text-black hover:text-[#89229b]" id="log-out"><i class="fas fa-sign-out-alt"></i>logout</button>
                        </div>
                    </div>
                        </div>
                          `;
                    }
                } else {
                    if (isSetAuthen() == false) {
                        return ` <a href="#/signin">Login</a>
                        <a href="#/signup">/ Register</a>`;
                    } else {
                        return /*html*/ `
                        <div class="group text-center">
                    Hi ${name}  
                        <div class="hidden group-hover:block absolute z-20 bg-white rounded-md  border border-blue-600" >
                        <a href="/#/order"><div class="hover:bg-gray-200 rounded-t-md py-2  "><i class="fas fa-file-medical-alt"></i>
                        <button  class="text-sm font-semibold text-black hover:text-[#89229b]" >Order </button>
                        </div></a>
                        <a href="/#/user"><div class="hover:bg-gray-200 rounded-t-md py-2  "><i class="fas fa-users-cog"></i>
                        <button  class="text-sm font-semibold text-black hover:text-[#89229b]" >User </button>
                        </div></a>
                        <div class=" hover:bg-gray-200 ">
                        <button class=" cursor-pointer  rounded-b-md px-10 text-sm py-2 font-semibold text-black hover:text-[#89229b]" id="log-out"><i class="fas fa-sign-out-alt"></i>logout</button>
                        </div>
                    </div>
                        </div>
                        `;
                    }
                }
            } else {
                if (isSetAuthen() == false) {
                    return ` <a href="#/signin">Login</a>
                    <a href="#/signup">/ Register</a>`;
                } else {
                    return /*html*/ `
                    <div class="group text-center">
                    Hi ${name}  
                        <div class="hidden group-hover:block absolute z-20 bg-white rounded-md  border border-blue-600" >
                        <a href="/#/order"><div class="hover:bg-gray-200 rounded-t-md py-2  "><i class="fas fa-file-medical-alt"></i>
                        <button  class="text-sm font-semibold text-black hover:text-[#89229b]" >Order </button>
                        </div></a>
                        <div class=" hover:bg-gray-200 ">
                        <button class=" cursor-pointer  rounded-b-md px-10 text-sm py-2 font-semibold text-black hover:text-[#89229b]" id="log-out"><i class="fas fa-sign-out-alt"></i>logout</button>
                        </div>
                    </div>
                        </div>`;
                }
            }
        }
        // const cartHeader = () => {
        //     if (isSetAuthen() != false) {
        //         return /*html*/ `
        //         <a href="#/shopcart" class="px-2 text-xl"><i class="fas fa-shopping-cart"></i></a>
        //         `;
        //     } else {
        //         return ``;
        //     }
        // }
        return /*html*/ `
        <header class="bg-gray-100 position fixed w-screen z-20 top-0  " id="heading">
            <div>
                <div class="container mx-auto flex justify-between items-center pt-8 pb-6 md:pb-0 lg:gap-4 lg:py-8">
                    <div class="logo  md:mx-0">
                        <a href="#/"><img src="${logo.infor[0].logo}" alt="" class="w-full"></a>
                        <div class="md:hidden absolute right-0 top-0 ml-6 mt-8 mr-16 ">
                            <button id="btnMenu" class="border border-gray-700 px-2 py-1 ">
                                <i class="fas fa-bars"></i>
                            </button>
                        </div>
                    </div>
                    <div class="menu hidden md:block pt-3">
                        <nav class="pl-3">
                            <ul class="flex xl:text-lg lg:text-sm md:text-xs">
                                <li><a href="#/" class="group block relative px-3">HOME
                                        <div class="transition duration-300 ease-in-out bg-red-700 absolute left-0 w-full transform scale-x-0 group-hover:scale-x-100"
                                            style="height: 2px;">
                                        </div>
                                    </a>
                                </li>
                                <li><a href="#/productcate/female" class="px-4 group block relative ">WOMEN'S<div
                                            class="transition duration-300 ease-in-out h-1 bg-red-700 absolute left-0 w-full transform scale-x-0 group-hover:scale-x-100"
                                            style="height: 2px;">
                                        </div> </a></li>
                                <li><a href="#/productcate/male" class="px-3 group block relative" >MEN'S <div
                                            class="transition duration-300 ease-in-out h-1 bg-red-700 absolute left-0 w-full transform scale-x-0 group-hover:scale-x-100"
                                            style="height: 2px;">
                                        </div></a></li>
                                <li><a href="#/products" class="px-3 group block relative" id="shopss">SHOP <div
                                            class="transition duration-300 ease-in-out h-1 bg-red-700 absolute left-0 w-full transform scale-x-0 group-hover:scale-x-100"
                                            style="height: 2px;">
                                        </div></a></li>
                               
                                <li><a href="#/blog" class="px-4 group block relative  ">BLOG<div
                                            class="transition duration-300 ease-in-out h-1 bg-red-700 absolute left-0 w-full transform scale-x-0 group-hover:scale-x-100"
                                            style="height: 2px;">
                                        </div> </a></li>
                                <li><a href="#/contact" class="px-3 group block relative">CONTACT<div
                                            class="transition duration-300 ease-in-out h-1 bg-red-700 absolute left-0 w-full transform scale-x-0 group-hover:scale-x-100"
                                            style="height: 2px;">
                                        </div></a></li>
                            </ul>
                        </nav>
                    </div>
                    <div class="md:flex hidden ">
                        <div class=" pt-3 md:mb-4 text-gray-700 text-xs">
                            ${await user()}
                        </div>
                        <div class="md:hidden lg:block mx-2 ">
                            <form class="inline demo-search" id="demo-search-lg">
                                <input type="search" name="search" placeholder="search">
                            </form>
                            <a href="#" class="px-2 text-xl"><i class="far fa-heart"></i></a>
                            <a href="#/shopcart" class="px-2 text-xl"><i class="fas fa-shopping-cart"></i></a>
                        </div>
                    </div>
                </div>
                <div class="text-center hidden md:block lg:hidden mx-4">
                    <form  id="demo-search">
                        <input type="search" value="as"  id="data-search"  placeholder="search">
                    </form>
                    <a href="#" class="px-2 text-xl"><i class="far fa-heart"></i></a>
                    <a href="#/shopcart" class="px-2 text-xl"><i class="fas fa-shopping-cart"></i></a>
                </div>
                <div id="menu">
                    <ul class="bg-gray-3 md:hidden  pb-2  z-auto ml-2">
                        <li><a href="./index.html"
                                class="px-3 inline-block py-1 w-full hover:bg-blue-200 hover:underline">HOME
                            </a>
                        </li>
                        <li><a href="#"
                                class="px-3   inline-block py-1 w-full hover:bg-blue-200 hover:underline">WOMEN'S
                            </a></li>
                        <li><a href="#" class="px-3  inline-block py-1 w-full hover:bg-blue-200 hover:underline">MEN'S
                            </a></li>
                        <li><a href="./shop.html"
                                class="px-3  inline-block py-1 w-full hover:bg-blue-200 hover:underline">SHOP </a>
                        </li>
                        
                        <li><a href="blog.html"
                                class="px-4  inline-block py-1 w-full hover:bg-blue-200 hover:underline">BLOG </a>
                        </li>
                        <li><a href="contact.html"
                                class="px-3  inline-block py-1 w-full hover:bg-blue-200 hover:underline">CONTACT</a>
                        </li>
                    </ul>
                    <div class="md:hidden">
                        <div class="grid grid-cols-1 md:flex justify-center">
                            <div class=" pl-6 pr-12 pt-3 text-gray-700 text-xs">
                                <a href="#">Login</a>
                                <a href="#">/ Register</a>
                            </div>
                            <div class=" mx-4">
                                <form class="inline " id="demo-search">
                                    <input type="search" value="" placeholder="search">
                                </form>
                                <a href="#" class="px-2 text-xl"><i class="far fa-heart"></i></a>
                                <a href="#" class="px-2 text-xl"><i class="fas fa-shopping-cart"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </header>
        
        <!-- end header -->
        `;
    },
}
export default Header