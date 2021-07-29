import {
    $$
} from '../untils'
import toast from 'toast-me';
const ActiveEmail = {
    async render() {
        return `
            <div class="relative flex justify-center items-center"> 
        <img src="../../images/active.jpeg" alt="">
        <div class="absolute mb-20">
            <img src="../../images/logo.png" alt="" class="">
        <div class="mt-40"><div id="active-email" class="mt-[200px] px-3 py-2 bg-[#29b5e8] rounded"><button class="text-white "> Active email</button></div></div>
        </div>
        </div>
            `
    },
    async afterRender() {
        let emailToken = JSON.parse(localStorage.getItem('emailToken'));
        toast(
            'singup successfully', {
                duration: 3000
            }, {
                // label: 'Confirm',
                action: () => alert('Fill in this field!'),
                class: 'my-custom-class', // optional, CSS class name for action button
            },
        );
        $$('#active-email').onclick = () => {
            window.location.href = `http://localhost:4000/api/auth/verify-email?token=${emailToken}`;
        }
    }
}
export default ActiveEmail;