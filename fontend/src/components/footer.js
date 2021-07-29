const Footer = {
    render() {
        return /*html*/`
        <footer>
        <div
            class=" ml-4  grid grid-cols-1 md:grid-cols-2 md:pl-0 lg:container  lg:mx-auto lg:flex justify-between items-center ">
            <div>
                <div>
                    <a href="#"><img src="./images/logo.png" alt=""></a>
                </div>
                <div>
                    <p class="text-sm text-gray-600 py-6">Lorem ipsum dolor sit amet, consectetur <br> adipiscing
                        elit,
                        sed
                        do
                        eiusmod tempor
                        incididunt<br>
                        cilisis.</p>
                </div>
                <div class="flex">
                    <a href="#" class="px-2"><img src="./images/payment/payment-1.png" alt=""></a>
                    <a href="#" class="px-2"><img src="./images/payment/payment-2.png" alt=""></a>
                    <a href="#" class="px-2"><img src="./images/payment/payment-3.png" alt=""></a>
                    <a href="#" class="px-2"><img src="./images/payment/payment-4.png" alt=""></a>
                    <a href="#" class="px-2"><img src="./images/payment/payment-5.png" alt=""></a>
                </div>
            </div>
            <div>
                <div class="font-semibold mb-8 mt-8 md:mt-0">
                    <h6>QUICK LINKS</h6>
                </div>
                <div>
                    <a href="#" class="block text-sm text-gray-700 mb-2 hover:text-red-500">About</a>
                    <a href="#" class="block text-sm text-gray-700 mb-2 hover:text-red-500">Blogs</a>
                    <a href="#" class="block text-sm text-gray-700 mb-2 hover:text-red-500">Contact</a>
                    <a href="#" class="block text-sm text-gray-700  hover:text-red-500">FAQ</a>
                </div>
            </div>
            <div>
                <div class="font-semibold mb-8 mt-8 md:mt-0">
                    <h6>ACCOUNT</h6>
                </div>
                <div>
                    <a href="#" class="block text-sm text-gray-700  mb-2  hover:text-red-500">AboMy Accountut</a>
                    <a href="#" class="block text-sm text-gray-700 mb-2 hover:text-red-500">Orders Tracking</a>
                    <a href="#" class="block text-sm text-gray-700 mb-2 hover:text-red-500">Checkout</a>
                    <a href="#" class="block text-sm text-gray-700 hover:text-red-500">Wishlist</a>
                </div>
            </div>
            <div>
                <div class="font-semibold  mt-8 md:mt-6">
                    <h6>NEWLETTER</h6>
                </div>
                <div class="mt-8 mb-8">
                    <form action=" #" class="relative border border-gray-400 rounded-full outline-none">
                        <input type="email" name="" id="" placeholder="Email*"
                            class=" border-0 py-3 pl-2 pr-32  rounded-full  outline-none" required>
                        <input type="submit" name="" id="" value="SUBSRCIBE"
                            class=" absolute right-0 pt-3   pb-3 border border-gray-400   px-4  bg-red-500 text-white outline-none rounded-full">
                    </form>
                </div>
                <div class="flex justify-between md:block items-center text-4xl mt-8 ">
                    <a href="#" class="px-1 inline-block pt-12 md:pt-0 hover:text-red-500"><i
                            class="fab fa-facebook"></i> </a>
                    <a href="#" class="px-1 inline-block pt-12 md:pt-0 hover:text-red-500"><i
                            class="fab fa-twitter-square"></i> </a>
                    <a href="#" class="px-1 inline-block pt-12 md:pt-0 hover:text-red-500"><i
                            class="fab fa-youtube-square"></i> </a>
                    <a href="#" class="px-1 inline-block pt-12 md:pt-0 hover:text-red-500"><i
                            class="fab fa-instagram-square"></i> </a>
                    <a href="#" class="px-1 mr-4 inline-block pt-12 md:pt-0 hover:text-red-500"> <i
                            class="fab fa-pinterest-square"></i></a>
                </div>
            </div>
        </div>
        <hr class="container mx-auto my-8">
        <div>
            <span class="text-gray-700 block text-center pb-8"> Copyright © 2020 All rights reserved | This template
                is
                made
                with <span class="text-red-700"><i class="fas fa-heart"></i></span> by Colorlib</span>
        </div>
    </footer>
    <!-- end footer -->
        
        `;
    }
}
export default Footer