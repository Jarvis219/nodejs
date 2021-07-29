import Header from '../components/header';
import Footer from '../components/footer';
import productAPI from '../api/productAPI';
import {
    prices,
    checkLogout,
    search
} from '../untils';

const Product = {

    async render() {
        // fetch("http://localhost:3001/products")
        //     .then(response => response.json())
        //     .then(data => console.log(data))



        try {
            var {
                data: products
            } = await productAPI.list();


            var result = products.product.map(element => {
                // console.log(element);
                // const search = element.filter((e) => {
                //     // return e == 'Cotton Over the Knee Socks Purple';
                // })
                const saleProduct = () => {
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
                const showSalePro = () => {
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
                <article class="col-span-12 gap-3 md:col-span-1 group my-4 md:my-0 text-center">
                <a href="#/products/${element._id}">
                         <div class=" relative  overflow-hidden">
                                    <div class="flex justify-center">
                                        <img src="${element.photo}" style="Width:270px; height:360px" alt="" class="w-full object-cover md:w-auto">
                                    </div>
                                    <div class="absolute top-0 mt-4 ml-4">
                                        ${showSalePro()}
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
                                    <div class=" pt-4  md:text-xs lg:text-sm xl:text-base">
                                        <a href="#/products/${element._id}" class="block  hover:text-red-500">${element.name}</a>
                                        <span class="block py-2 text-sm text-yellow-400"><i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i></span>
                                        <span class="font-medium text-xl">${prices(Number(element.price-element.sale))}</span>
                                        ${saleProduct()}
                                    </div>
                                </article>
            `;
            }).join('');
        } catch (error) {
            console.log(error);
        }
        return /*html */ `
        ${await Header.render()}
        <div class="container mx-auto px-16 pt-24">
                <div class="my-8">
                    <a href="./index.html"><span><i class="fas fa-home"></i></span>
                        <span style="font-family: FontAwesome;">Home <span class="text-gray-500 text-sm">></span> <span class="text-gray-600">Shop</span></span>
                        </i></a>
                </div>
                <div class="grid grid-cols-12">
                    <aside class="col-span-12 md:col-span-3">
                        <div class="wow bounceInDown" data-wow-duration="1s">
                            <div class="font-semibold pb-8">
                                <h4>CATEGORIES</h4>
                                <div class="bg-red-600 w-16" style="height: 2px;"></div>
                            </div>
                            <div class="py-2 h-10  border-b w-full md:w-2/3 text-lg md:text-base  overflow-hidden"
                                id="women">
                                <div style="font-family: FontAwesome;"> <a href=" #">Women</a></div>
                                <div class="ml-1 font-serif " id="womenF">
                                    <nav>
                                        <ul>
                                            <li>
                                                <a href="#" class="block text-gray-600 text-base py-1"> - Coats</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Jackets</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Dresses</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Shirts</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- T-shirts</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Jeans</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div class="py-2 border-b w-full md:w-2/3 text-lg md:text-base h-10 overflow-hidden"
                                id="men">
                                <div style="font-family: FontAwesome;"> <a href=" #">Men</a></div>
                                <div class="ml-1 font-serif ">
                                    <nav>
                                        <ul>
                                            <li>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Coats</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Jackets</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Dresses</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Shirts</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- T-shirts</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Jeans</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div class="py-2 border-b w-full md:w-2/3 text-lg md:text-base h-10 overflow-hidden"
                                id="kids">
                                <div style=" font-family: FontAwesome;"> <a href=" #">Kids</a></div>
                                <div class="ml-1 font-serif ">
                                    <nav>
                                        <ul>
                                            <li>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Coats</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Jackets</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Dresses</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Shirts</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- T-shirts</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Jeans</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div class="py-2 border-b w-full md:w-2/3 text-lg md:text-base h-10 overflow-hidden"
                                id="cosmetic">
                                <div style="font-family: FontAwesome;"> <a href=" #">Cosmetic</a></div>
                                <div class="ml-1 font-serif ">
                                    <nav>
                                        <ul>
                                            <li>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Coats</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Jackets</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Dresses</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Shirts</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- T-shirts</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Jeans</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div class="py-2 border-b w-full md:w-2/3 text-lg md:text-base h-10 overflow-hidden"
                                id="acces">
                                <div style="font-family: FontAwesome;"> <a href=" #">Accessories</a></div>
                                <div class="ml-1 font-serif ">
                                    <nav>
                                        <ul>
                                            <li>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Coats</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Jackets</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Dresses</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Shirts</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- T-shirts</a>
                                                <a href="#" class="block text-gray-600 text-base py-1">- Jeans</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div class="md:mt-40 mt-10 wow bounceInUp" data-wow-duration="1s">
                            <div class="mb-8 font-semibold">
                                <h4>SHOP BY SIZE</h4>
                                <div class="bg-red-600 w-16" style="height: 2px;"></div>
                            </div>
                            <div>
                                <form action="#" class="text-sm md:text-xs">
                                    <input type="checkbox" name="" value="XXS" id="XXS">
                                    <label for="XXS" class="block py-1  text-gray-800"> XXS
                                    </label>
                                    <input type="checkbox" name="" value="XS" id="XS">
                                    <label for="XS" class="block py-1  text-gray-800">
                                        XS </label>
                                    <input type="checkbox" name="" value="XS-S" id="XS-S">
                                    <label for="XS-S" class="block py-1  text-gray-800"> XS-S
                                    </label>
                                    <input type="checkbox" name="" value="S" id="S">
                                    <label for="S" class="block py-1  text-gray-800"> S
                                    </label>
                                    <input type="checkbox" name="" value="M" id="M">
                                    <label for="M" class="block py-1  text-gray-800"> M
                                    </label>
                                    <input type="checkbox" name="" value="M-L" id="M-L">
                                    <label for="M-L" class="block py-1  text-gray-800">
                                        M-L </label>
                                    <input type="checkbox" name="" value="L" id="L">
                                    <label for="L" class="block py-1  text-gray-800"> L
                                    </label>
                                    <input type="checkbox" name="" value="XL" id="XL">
                                    <label for="XL" class="block py-1  text-gray-800">
                                        XL </label>
                                </form>
                            </div>
                        </div>
                        <div class="mb-8 mt-10 md:mt-20 wow bounceInLeft" data-wow-duration="1s">
                            <div class="mb-8 font-semibold">
                                <h4>SHOP BY SIZE</h4>
                                <div class="bg-red-600 w-16" style="height: 2px;"></div>
                            </div>
                            <div>
                                <form action="#" class="text-sm md:text-xs">
                                    <input type="checkbox" name="" value="Blacks" id="Blacks">
                                    <label for="Blacks" class="block py-1  text-gray-800">
                                        Blacks
                                    </label>
                                    <input type="checkbox" name="" value="Whites" id="Whites">
                                    <label for="Whites" class="block py-1  text-gray-800">
                                        Whites </label>
                                    <input type="checkbox" name="" value="Reds" id="Reds">
                                    <label for="Reds" class="block py-1  text-gray-800"> Reds
                                    </label>
                                    <input type="checkbox" name="" value="Greys" id="Greys">
                                    <label for="Greys" class="block py-1  text-gray-800">
                                        Greys
                                    </label>
                                    <input type="checkbox" name="" value="Blues" id="Blues">
                                    <label for="Blues" class="block py-1  text-gray-800">
                                        Blues
                                    </label>
                                    <input type="checkbox" name="" value="Beige" id="Beige">
                                    <label for="Beige" class="block py-1  text-gray-800">
                                        Beige Tones </label>
                                    <input type="checkbox" name="" value="Greens" id="Greens">
                                    <label for="Greens" cGreensass="block py-1  text-gray-800">
                                        Greens
                                    </label>
                                    <input type="checkbox" name="" value="Yellows" id="Yellows">
                                    <label for="Yellows" class="block py-1  text-gray-800">
                                        Yellows </label>
                                </form>
                            </div>
                        </div>
                    </aside>
                    <!-- end content-left -->
                    <section class="col-span-12 md:col-span-9 ">
                        <div class="grid md:grid-cols-3 gap-3 lg:grid-cols-3  wow bounceInUp "
                            data-wow-duration="
                    1s">     
                                ${result}
                       
                        </div>
                        
                    </section>
                    <!-- end content-right -->
                </div>
            </div>
            <!-- end content -->
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
    afterRender() {
        checkLogout();
        search();
    }
}
export default Product;