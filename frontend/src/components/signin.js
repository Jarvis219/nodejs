import {
    UserAPI
} from "../api/userAPI";
import {
    $$,
    setAuthen
} from "../untils";
import Header from "./header";
import Footer from "./footer";
const SignIn = {
    async render() {
        return /*html */ `
        ${await Header.render()}
        <div class=" mx-auto mt-20">
        <div class=" py-20">
            <div class="w-96 bg-white container mx-auto py-16  shadow-2xl">
                <div class="flex justify-center pt-6">
                    <img src="/image/avatar.svg" alt="" class="object-cover w-24">
                </div>
                <h1 class="text-4xl font-bold text-center py-2">WELCOME</h1>
                <div class="flex justify-center text-xs ">
                    <form class="text-gray-600" id="signip">
                        <div>
                            <label for="#"><i class="fas fa-user mx-2 text-2xl"></i><input type="email" name="" id="emails"
                                    placeholder="Email" required
                                    class="ml-2 py-1 px-2 scale-95 transform focus:scale-105 transition duration-300 ease-in-out  outline-none">
                            </label>
                            <hr class="text-gray-500 my-2">
                        </div>
                        <div>
                            <label for="#"><i class="fas fa-lock mx-2 text-2xl"></i> <input type="password" name="" minlength="8"
                                    id="password" placeholder="Password" required
                                    class="ml-1 py-1 px-2 scale-95 transform focus:scale-105 transition duration-300 ease-in-out    outline-none"></label>
                            <hr class="text-gray-500 my-2">
                        </div>
                        <div class="text-center text-red-400 font-bold" id="error">
                        
                        </div>
                        <div>
                            <div class="text-right">
                                <a href="#">Forgot Password?</a>
                            </div>
                            <div class="flex justify-center my-3">
                                <input type="submit" name="" id="" value="LOGIN"
                                    class=" bg-green-400  hover:bg-green-500 text-white px-16 rounded-full py-2 outline-none">
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    ${Footer.render()}
   
        `;
    },
    afterRender() {

        $$('#signip').addEventListener('submit', function (e) {
            e.preventDefault();
            let email = $$('#emails').value;
            let password = $$('#password').value;
            const data = {
                email: email,
                password: password
            }
            UserAPI.signin(data)
                .then(({
                    data
                }) => {
                    // console.log(data.token);
                    localStorage.setItem('user', JSON.stringify(data.user))
                    localStorage.setItem('token', JSON.stringify(data.token));
                    setAuthen(data);
                })
                .then(() => {
                    window.location.hash = `/`;
                })
                .catch((error) => {
                    $$('#error').innerHTML = `<span>${error.response.data.error}</span>`;
                })
        });

    }

}
export default SignIn;