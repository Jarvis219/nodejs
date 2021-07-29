import Header from '../components/header';
import Footer from '../components/footer';
import {
    checkLogout,
    search,
    useParams
} from '../untils';
import {
    postAPI
} from '../api/postAPI';
const BlogDetail = {
    async render() {
        const {
            id
        } = useParams();
        const {
            data: post
        } = await postAPI.read(id);
        // console.log(post);
        const {
            data: cate
        } = await postAPI.readCate(id);
        // console.log(cate[0].updatedAt);
        const postCate = cate.map(element => {
            return /*html */ `
                <div class="flex justify-between items-center gap-2 my-2">
                     <div class="shadow w-72 flex p-2"> 
                            <a href="/#/blogdetail/${element._id}"><div >
                                <div><img src="${element.image}" class="object-cover" style="width: 110px; height: 73px;" alt=""></div>
                                </div>
                            <div class="">
                                <h4 class="font-serif text-sm">${element.title}</h4>
                                <span class="font-serif text-gray-600 text-sm">${element.updatedAt}</span>
                            </div></a>
                    </div>
                    </div>
                `
        }).join("");
        return /*html */ `
       ${await Header.render()}
        <div class="mb-12">
        <main class="container mx-auto lg:px-16 lg:pt-24">
            <div>
                <div class="my-8 ">
                    <a href="./index.html"><span><i class="fas fa-home"></i></span>
                        <span style="font-family: FontAwesome;">Home > <span class="text-gray-600">Blog > ${post.title}</span></span>
                        </i></a>
                </div>
            </div>
            <div class="grid lg:grid-cols-12 gap-4">
                <div class="col-span-8">
                    <img src=" ${post.image}" alt="" class="object-cover " style="width: 750px; height: 500px;">
                    <div class="my-4">
                        <h2 class=" uppercase font-semibold"> ${post.title}</h2>
                        <p class="font-serif text-gray-400 text-base">by <span> ${post.author} | </span><span> ${post.updatedAt} |
                            </span><span>39
                                comment</span></p>
                    </div>
                    <div class="font-serif text-md text-gray-600"> ${post.introduce}</div>
                    <div class="font-serif text-gray-600">

                    ${post.content}
                    </div>
                </div>
                <div class="col-span-4 ">
                    <div class=" font-serif text-xl mb-4">
                        <h3>FEATURE POSTS </h3>
                    </div>
                        
                    ${postCate}

                </div>
            </div>
        </main>
    </div>
            ${Footer.render()}
        `;
    },
    async afterRender() {
        checkLogout();
        search();
    }
}
export default BlogDetail;