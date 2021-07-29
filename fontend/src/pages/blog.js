import Header from '../components/header';
import Footer from '../components/footer';
import {
    checkLogout,
    search
} from '../untils';
import {
    postAPI
} from '../api/postAPI';
const Blog = {
    async render() {
        const {
            data: posts
        } = await postAPI.list();
        // console.log(posts);
        const result = posts.post.map(element => {
            return `
            <div class="my-24 md:my-0 shadow p-10 bg-gray-200">
                        <article class="relative overflow-hidden">
                            <img src="${element.image}" alt="" style="height: 240px; width:228px"
                                class="w-full object-cover  transition delay-300 duration-500 ease-in-out transform scale-100 hover:scale-110">
                            <div class="absolute bottom-0 bg-white pr-12 pt-3 ">
                                <a href="/#/blogdetail/${element._id}" class="font-semibold text-xs lg:text-sm">${element.title}</a>
                            </div>
                        </article>
                        <p class="text-xs absolute pt-3"><span class="text-gray-500">by</span> ${element.author}
                            <span class="text-gray-500 "> ${element.day}</span>
                        </p>
                    </div>
            `;
        }).join("");


        return /*html */ `
        ${ await Header.render()}
        <div>
        <div class="container mx-auto px-16 pt-24">
            <div class="my-8 ">
                <a href="#/"><span><i class="fas fa-home"></i></span>
                    <span style="font-family: FontAwesome;">Home > <span
                            class="text-gray-600">Blog</span></span>
                    </i></a>
            </div>
            <div>
                <div>
                    <video autoplay loop>
                        <source src="./assets/video/videoplayback.mp4">
                    </video>
                </div>
                <div class="text-xs lg:text-base my-8">
                    <a href="#"
                        class="text-base md:text-xl lg:text-2xl xl:text-4xl font-medium text-red-500">Google
                        inks pact
                        for new
                        35-storey
                        office</a>
                    <p class="text-gray-600">Video is one of the most important tools for a digital marketing
                        strategy. Viewers are consuming video content more than ever before and that trend isn’t
                        slowing down anytime soon.The move from text and visual content to video content has
                        been
                        FAST and businesses who don’t make the transition will be left behind with an
                        underperforming website.</p>
                </div>
            </div>
            <div class="md:grid grid-cols-3 mb-20 md:mb-0 gap-5">
                    ${result}
                    
            </div>
            <div
                class=" text-center my-12 transform hover:-translate-y-1 hover:scale-110 transition duration-500 ease-in-out">
                <a href="#"
                    class="bg-gray-200 px-4 md:px-12 py-3 rounded-full outline-none hover:bg-gray-500   ">LOAD
                    MORE POSTS</a>
            </div>
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
        `;

    },
    afterRender() {
        checkLogout();
        search();
    }
}
export default Blog;