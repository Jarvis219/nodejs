import {
    UserAPI
} from "../api/userAPI";
import {
    $$
} from "../untils";
import Header from "./header";
import Footer from "./footer";
import toast from "toast-me";
const SignUp = {
    async render() {
        return /*html */ `
        ${await Header.render()}
        <div class="  mx-auto mt-20">
        <div class=" py-20">
            <div class="w-96 bg-white container mx-auto py-16  shadow-2xl">
                <div class="flex justify-center pt-6">
                    <img src="/image/avatar.svg" alt="" class="object-cover w-24">
                </div>
                <h1 class="text-4xl font-bold text-center py-2">WELCOME</h1>
                <div class="flex justify-center text-xs ">
                    <form class="text-gray-600" id="signup">
                        <div>
                            <label for="#"><i class="fas fa-user mx-2 text-2xl"></i><input type="email" name="" id="emails"
                                    placeholder="Email" required
                                    class="ml-2 py-1 px-2 scale-95 transform focus:scale-105 transition duration-300 ease-in-out  outline-none">
                            </label>
                            <hr class="text-gray-500 my-2">
                        </div>
                        <div>
                            <label for="#"><i class="fas fa-user mx-2 text-2xl"></i><input type="text" name="" id="fullname"
                                    placeholder="name" required
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
                        <div>
                            <label for="#"><i class="fas fa-lock mx-2 text-2xl"></i> <input type="password" name="" minlength="8"
                                    id="retypepass" placeholder="Retypepass" required
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
                                <input type="submit" name="" id="" value="SIGN UP"
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
        $$('#signup').addEventListener('submit', function (e) {
            e.preventDefault();
            let email = $$('#emails').value;
            let password = $$('#password').value;
            let retypepass = $$('#retypepass').value;
            let name = $$('#fullname').value;
            if (password == retypepass) {
                const data = {
                    email: email,
                    name: name,
                    password: password,
                    // permission: "Member"
                }
                // console.log(data);
                UserAPI.signup(data)
                    .then(data => {
                        // console.log(data.data.emailToken);
                        localStorage.removeItem("emailToken");
                        localStorage.setItem('emailToken', JSON.stringify(data.data.emailToken))
                        toast(
                            `${data.data.message} `, {
                                duration: 3000
                            }, {
                                // label: 'Confirm',
                                action: () => alert('Fill in this field!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        );
                        $$('#error').innerHTML = ``;

                    }).catch(error => {
                            console.log(error);
                            $$('#error').innerHTML = `<span>${error.response.data.messager}</span>`
                        }

                    );

                // if (UserAPI.signup(data)) {
                //     toast(
                //         `Register success `, {
                //             duration: 3000
                //         }, {
                //             // label: 'Confirm',
                //             action: () => alert('Fill in this field!'),
                //             class: 'my-custom-class', // optional, CSS class name for action button
                //         },
                //     );
                //     $$('#error').innerHTML = '';
                // } else {
                //     alert('Register failure')
                // }


            } else {
                $$('#error').innerHTML = `<span>Password does not match !!!</span>`;
            }

        });

    }

}
export default SignUp;