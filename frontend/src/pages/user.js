import Header from '../components/header';
import Footer from '../components/footer';
import {$$} from '../untils';
import {UserAPI} from '../api/userAPI';
 const User = {
     
     async render(){
         let user = JSON.parse(localStorage.getItem('user'));
         console.log(user)
         return `
            ${await Header.render()}

            <div class="  mx-auto mt-20">
            <div class=" py-20">
                <div class="w-96 bg-white container mx-auto py-16  shadow-2xl">
                    <div class="flex justify-center pt-6">
                        <img src="/image/avatar.svg" alt="" class="object-cover w-24">
                    </div>
                    <h1 class="text-4xl font-bold text-center py-2 uppercase">User</h1>
                    <div class="flex justify-center text-xs ">
                        <form class="text-gray-600" id="change-user">
                            <div>
                                <label for="#"><i class="fas fa-user mx-2 text-2xl"></i><input type="email" name="" id="emails"
                                        placeholder="Email" value="${user.email}" required disabled
                                        class="ml-2 py-1 px-2 scale-95 transform focus:scale-105 transition duration-300 ease-in-out  outline-none">
                                </label>
                                <hr class="text-gray-500 my-2">
                            </div>
                            <div>
                                <label for="#"><i class="fas fa-user mx-2 text-2xl"></i><input type="text" name="" id="fullname"
                                        placeholder="name" value="${user.name}" required
                                        class="ml-2 py-1 px-2 scale-95 transform focus:scale-105 transition duration-300 ease-in-out  outline-none">
                                </label>
                                <hr class="text-gray-500 my-2">
                            </div>
                            <div>
                                <label for="#"><i class="fas fa-lock mx-2 text-2xl"></i> <input type="password" name="" minlength="8"
                                        id="password" placeholder="Password" 
                                        class="ml-1 py-1 px-2 scale-95 transform focus:scale-105 transition duration-300 ease-in-out    outline-none"></label>
                                <hr class="text-gray-500 my-2">
                            </div>
                            <div>
                            <label for="#"><i class="fas fa-lock mx-2 text-2xl"></i> <input type="password" name="" minlength="8"
                                    id="new-password" placeholder="New password" 
                                    class="ml-1 py-1 px-2 scale-95 transform focus:scale-105 transition duration-300 ease-in-out    outline-none"></label>
                            <hr class="text-gray-500 my-2">
                         </div>
                            <div>
                                <label for="#"><i class="fas fa-lock mx-2 text-2xl"></i> <input type="password" name="" minlength="8"
                                        id="retypepass-new-password" placeholder="Retypepass new password" 
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

            ${await Footer.render()}
         `;
     },

     async afterRender() {
        let {_id} = JSON.parse(localStorage.getItem('user'));
        let {data} = await UserAPI.listedit(_id);
        // console.log(data)
        $$('#change-user').addEventListener('submit',async (event) => {
            event.preventDefault();
            const fullname = $$('#fullname');
            const password = $$('#password');
            const newPass = $$('#new-password');
            const repPass = $$('#retypepass-new-password');
            const error = $$('#error');
            // console.log(password.value)
            if(password.value==''){
                error.innerHTML= `<span>Password can not be blank</span>`;
            }else if(password.value!==data.password){
                error.innerHTML= `<span>Password  not Match</span>`;
            }else{
                if(newPass.value=='' || retypepass.value==''){
                    error.innerHTML= `<span>New password or retypepass new password not Match</span>`;
                }else if(newPass.value!=retypepass.value){
                    error.innerHTML= `<span>New password or retypepass new password can not be blank</span>`;
                }else{
                    // const data = {
                    //     name: fullname.value,
                    //     pass
                    // }
                }
            }
        })



     }
 }

 export default User;