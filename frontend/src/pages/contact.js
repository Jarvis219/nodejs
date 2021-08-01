import Header from '../components/header';
import Footer from '../components/footer';
import toast from 'toast-me';
import {
    $$,
    checkLogout,
    search
} from '../untils';
import {
    informationAPI
} from '../api/informationAPI';
import {
    contactAPI
} from '../api/contactAPI';
const Contact = {
    async render() {
        const {
            data
        } = await informationAPI.listcontact();
        // console.log(data.infor[0]);
        return /*html*/ `
        ${await Header.render()}
        <div class="container mx-auto md:px-16 pt-24">
                <div>
                    <div class="my-8 ml-2 md:ml-0">
                        <a href="./index.html"><span><i class="fas fa-home"></i></span>
                            <span style="font-family: FontAwesome;">Home > <span
                                    class="text-gray-600">Contact</span></span>
                            </i></a>
                    </div>
                    <div class="  grid  md:grid-cols-2 gap-10 ">
                        <aside class="w-auto wow slideInRight" data-wow-duration=" 2s">
                            <div>
                                <div class=" pb-4 font-medium text-xl">
                                    <h5>CONTACT INFO</h5>
                                </div>
                                <div>
                                    <span>
                                        <i class="fas fa-map-marker-alt text-red-500"></i> Address
                                    </span>
                                    <p style="font-family: FontAwesome;" class="text-gray-600 pt-1">${data.infor[0].address}</p>
                                </div>
                                <div class="py-3">
                                    <span>
                                        <i class="fas fa-phone-alt text-red-500"></i> Phone
                                    </span>
                                    <p style="font-family: FontAwesome;" class="text-gray-600 pt-1">${data.infor[0].numberPhone}
                                    </p>
                                </div>
                                <div>
                                    <span><i class="fas fa-headphones text-red-500"></i> Support</span>
                                    <p style="font-family: FontAwesome;" class="text-gray-600 pt-1">
                                        ${data.infor[0].email}</p>
                                </div>
                            </div>
                            <div>
                                <div class="mt-8 mb-4 font-medium text-xl">
                                    <h5>SEND MESSAGE</h5>
                                </div>
                                <div>
                                    <form id="contact-submit">
                                        <input
                                            class="block w-full border border-gray-400 pl-4 rounded-lg h-12 my-4 outline-none"
                                            type="text" name="" id="name" placeholder="Name*" required>
                                        <input
                                            class="block w-full border border-gray-400 pl-4 rounded-lg h-12 my-4 outline-none"
                                            type="email" name="" id="email" placeholder="Email*" required>
                                        <input
                                            class="block w-full border border-gray-400 pl-4 rounded-lg h-12 my-4 outline-none"
                                            type="tel" name="" id="phone" placeholder="Phone number*" required>
                                        <textarea
                                            class="block w-full border border-gray-400 pl-4 pt-2 rounded-lg my-4  outline-none"
                                            name="" id="content" cols="30" rows="10" maxlength="300"
                                            placeholder="Messange" required></textarea>
                                        <input
                                            class="bg-red-600 text-white px-4 py-2 rounded-full outline-none hover:bg-gray-400 hover:text-red-600"
                                            type="submit" name="" id="" value="SEND MESSAGE">
                                    </form>
                                </div>
                                
                            </div>
                        </aside>
                        <!-- end contact -->
                        <section class="wow bounceInLeft" data-wow-duration=" 2s">
                           ${data.infor[0].linkMap}
                        </section>
                        <!-- end ggmap -->
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
        $$('#contact-submit').addEventListener('submit', async (e) => {
            e.preventDefault();
            const contact = {
                name: $$('#name').value,
                email: $$('#email').value,
                phone: $$('#phone').value,
                content: $$('#content').value,
                status: "Not approved yet"
            }
            // console.log(contact);
            // contactAPI.add(contact);
            await contactAPI.add(contact).then(() => {
                toast(
                    'Message sent successfully', {
                        duration: 3000
                    }, {
                        // label: 'Confirm',
                        action: () => alert('Fill in this field!'),
                        class: 'my-custom-class', // optional, CSS class name for action button
                    },
                );
            }).catch(err => {
                toast(
                    'send message failed', {
                        duration: 3000
                    }, {
                        // label: 'Confirm',
                        action: () => alert('Fill in this field!'),
                        class: 'my-custom-class', // optional, CSS class name for action button
                    },
                );
            })

            // feedback
        })
    }
}
export default Contact;