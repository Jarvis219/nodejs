import Home from './pages/home';
import Product from './pages/product';
import Blog from './pages/blog';
import Contact from './pages/contact';
import ProductDetail from './pages/productDetail';
import ShopCart from './pages/shopCart';
import CheckOut from './pages/checkout';
import BlogDetail from './pages/blogdetail';
import Error404 from './pages/error404';
import AddCategory from './pages/admin/category/addcategory';
import AdminCategory from './pages/admin/category/listcategory';
import {
    useParams,
    isSetAuthen,
    $$
} from './untils';
import {
    UserAPI
} from './api/userAPI';
import Adminproducts from './pages/admin/Product/listproducts';
import EitProduct from './pages/admin/Product/editproduct';
import AddProduct from './pages/admin/Product/addproduct';
import EditCategory from './pages/admin/category/editcategory';
import SignUp from './components/signup';
import SignIn from './components/signin';
import ProductCate from './pages/productCate';
import ListContact from './pages/admin/contact/listcontact';
import ListCarts from './pages/admin/carts/listcart';
import EditCart from './pages/admin/carts/editcart';
import ListUser from './pages/admin/user/listuser';
import AddUser from './pages/admin/user/adduser';
import EditUser from './pages/admin/user/edituser';
import ListInformation from './pages/admin/information/listinformation';
import AddInformation from './pages/admin/information/addinformation';
import EditInformation from './pages/admin/information/editinformation';
import AddPost from './pages/admin/posts/addpost';
import Dashboard from './pages/admin/dashboard/dashboard';
import Order from './pages/order';
import ListPost from './pages/admin/posts/listpost';
import EditPost from './pages/admin/posts/editpost';
import ActiveEmail from './pages/activeEmail';
import User from './pages/user'
let routes;
async function checkUser() {

    if (isSetAuthen() !== false) {
        const {
            data: user
        } = await UserAPI.listedit(isSetAuthen()._id);
        // console.log(user);
        if (user.permission !== 0) {
            routes = {
                '/': Home,
                '/products': Product,
                '/blog': Blog,
                '/contact': Contact,
                '/products/:id': ProductDetail,
                '/shopcart': ShopCart,
                '/checkout': CheckOut,
                '/blogdetail/:id': BlogDetail,
                '/signup': SignUp,
                '/signin': SignIn,
                //Admin
                '/listproducts': Adminproducts,
                '/listcategory': AdminCategory,
                '/editproduct/:id': EitProduct,
                '/editcategory/:id': EditCategory,
                '/addproduct': AddProduct,
                '/addcategory': AddCategory,
                '/listusers': ListUser,
                '/adduser': AddUser,
                '/edituser/:id': EditUser,
                '/productcate/:id': ProductCate,
                '/listcontact': ListContact,
                '/listcarts': ListCarts,
                '/editcart/:id': EditCart,
                '/listinformation': ListInformation,
                '/addinformation': AddInformation,
                '/editinformation/:id': EditInformation,
                '/addpost': AddPost,
                '/dashboard': Dashboard,
                '/order': Order,
                '/listpost': ListPost,
                '/editpost/:id': EditPost,
                '/activeemail': ActiveEmail
            }
        } else {
            routes = {
                '/': Home,
                '/products': Product,
                '/blog': Blog,
                '/contact': Contact,
                '/products/:id': ProductDetail,
                '/shopcart': ShopCart,
                '/checkout': CheckOut,
                '/blogdetail/:id': BlogDetail,
                '/signup': SignUp,
                '/signin': SignIn,
                '/order': Order,
                '/user':User,
                //Admin
                '/listproducts': Home,
                '/listcategory': Home,
                '/editproduct/:id': Home,
                '/editcategory/:id': Home,
                '/addproduct': Home,
                '/addcategory': Home,
                '/listusers': Home,
                '/adduser': Home,
                '/edituser/:id': Home,
                '/productcate/:id': ProductCate,
                '/listcontact': Home,
                '/listcarts': Home,
                '/editcart/:id': Home,
                '/listinformation': Home,
                '/addinformation': Home,
                '/editinformation/:id': Home,
                '/addpost': Home,
                '/dashboard': Home,
                '/listpost': Home,
                '/editpost/:id': Home,
                '/activeemail': ActiveEmail

            }
        }
    } else {
        routes = {
            '/': Home,
            '/products': Product,
            '/blog': Blog,
            '/contact': Contact,
            '/products/:id': ProductDetail,
            '/shopcart': ShopCart,
            '/checkout': CheckOut,
            '/blogdetail/:id': BlogDetail,
            '/signup': SignUp,
            '/signin': SignIn,
            '/order': Order,
            //Admin
            '/listproducts': Home,
            '/listcategory': Home,
            '/editproduct/:id': Home,
            '/editcategory/:id': Home,
            '/addproduct': Home,
            '/addcategory': Home,
            '/listusers': Home,
            '/adduser': Home,
            '/edituser/:id': Home,
            '/productcate/:id': ProductCate,
            '/listcontact': Home,
            '/listcarts': Home,
            '/editcart/:id': Home,
            '/listinformation': Home,
            '/addinformation': Home,
            '/editinformation/:id': Home,
            '/addpost': Home,
            '/dashboard': Home,
            '/listpost': Home,
            '/editpost/:id': Home,
            '/activeemail': ActiveEmail,
            '/user':User,
        }
    }
}

// routes = {
//     '/': Home,
//     '/products': Product,
//     '/blog': Blog,
//     '/contact': Contact,
//     '/products/:id': ProductDetail,
//     '/shopcart': ShopCart,
//     '/checkout': CheckOut,
//     '/blogdetail/:id': BlogDetail,
//     '/signup': SignUp,
//     '/signin': SignIn,
//     //Admin
//     '/listproducts': Adminproducts,
//     '/listcategory': AdminCategory,
//     '/editproduct/:id': EitProduct,
//     '/editcategory/:id': EditCategory,
//     '/addproduct': AddProduct,
//     '/addcategory': AddCategory,
//     '/listusers': ListUser,
//     '/adduser': AddUser,
//     '/edituser/:id': EditUser,
//     '/productcate/:id': ProductCate,
//     '/listcontact': ListContact,
//     '/listcarts': ListCarts,
//     '/editcart/:id': EditCart,
//     '/listinformation': ListInformation,
//     '/addinformation': AddInformation,
//     '/editinformation/:id': EditInformation,
//     '/addpost': AddPost,
//     '/dashboard': Dashboard,
//     '/order': Order,
//     '/listpost': ListPost,
//     '/editpost/:id': EditPost,
//     '/activeemail': ActiveEmail
// }
const router = async () => {
    const {
        resource,
        id,
        action
    } = useParams();
    await checkUser();
    // // console.log(resource);
    const parseUrl = (resource ? `/${resource}` : '/') + (id ? `/:id` : '') + (action ? `/action` : '');
    // console.log("par :" + parseUrl);
    const page = routes[parseUrl] ? routes[parseUrl] : Error404;
    // console.log(page);
    $$('#main-content').innerHTML = await page.render();
    if (page.afterRender) {
        await page.afterRender();
    } else {
        console.log('not afterRender');
    }
}

//
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);