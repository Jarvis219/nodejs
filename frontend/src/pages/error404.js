import {
    checkLogout
} from "../untils";
const Error404 = {
    render() {
        return /*html */ `
        <img src="https://thanhbinhpc.com/wp-content/uploads/2019/03/sua-loi-404-tren-may-tinh.1PNG-1.png" alt="" 
         class="w-screen h-screen object-cover">
        `;
    },
    afterRender() {
        checkLogout();
    }

}
export default Error404;