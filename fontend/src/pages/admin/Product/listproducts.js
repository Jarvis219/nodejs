import NavBarAdmin from '../../../components/navbaradmin';
import ListProductchild from '../../../components/listproductchild';
import {
    $$
} from '../../../untils';
const Adminproducts = {
    async render() {
        // const {data:product} = await productAPI.list() ;
        // const result = product.map((element, index)=>{
        //         return /*html */`
        //         <tr>
        //         <td>${element.id}</td>
        //         <td>${element.name}</td>
        //         <td>${element.categoryId}</td>
        //         <td>${element.content}</td>
        //         <td>${element.price}</td>
        //         <td>${element.sale}</td>
        //         <td>${element.introduce}</td>
        //         <td>${element.images}</td>
        //         <td>${element.size}</td>
        //         <td>${element.classify}</td>
        //         <td class="w-20"><button
        //         class=" bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><a
        //             href="#/editproduct/${element.id}"
        //             class="inline-block py-2 px-3"><i class="far fa-edit"></i></a></button></td>
        // <td class="w-20"><button data-id="${element.id}"

        //         class="list-product-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">

        //             <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button>
        // </td>
        //     </tr>
        //         `;
        // }).join("");
        return /*html*/ `
        ${NavBarAdmin.render()}
        <div class="main-panel">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div class="container-fluid">
                    <div class="navbar-wrapper">
                        <a class="navbar-brand uppercase" href="javascript:;">PRODUCTS</a>
                    </div>
                </div>
                
            </nav>
            <div class="flex justify-center">
            <div class=" absolute mt-12 lg:mt-15 z-50">
            <a href="/#/addproduct"><button type="submit"
                    class="btn btn-primary pull-left ml-4">ADD PRODUCT</button></a>
           </div>
            </div>
           
            <!-- End Navbar -->
            <div class="mt-12 mx-4 ">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card"  >
                                <div class="card-header card-header-primary">
                                    <h4 class="card-title ">PRODUCTS</h4>
                                </div>
                                <div class="card-body h-[600px] overflow-y-scroll" >
                                    <div class="table-responsive" id="list-product">
                                    ${await ListProductchild.render()}
                                </table>
                             </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container-fluid">
                    <div class="copyright float-center">
                        &copy;
                        <script>
                            document.write(new Date().getFullYear())
                        </script>, made with <i class="material-icons">favorite</i> by
                        <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a> for a better web.
                    </div>
                </div>
            </footer>
        </div>
        `;
    },
    async afterRender() {
        $$('.nav li')[3].classList.add("active");
        return `
        ${await ListProductchild.afterRender()}
        `;
    }

}
export default Adminproducts;