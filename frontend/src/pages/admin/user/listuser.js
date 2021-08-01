import ListUsersChild from "../../../components/listusersChild";
import {
    UserAPI
} from "../../../api/userAPI";
import NavBarAdmin from "../../../components/navbaradmin";
import {
    $$
} from "../../../untils";
const ListUser = {
    async render() {
        return /*html*/ `
        ${NavBarAdmin.render()}
        <div class="main-panel">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div class="container-fluid">
                <div class="navbar-wrapper">
                    <a class="navbar-brand uppercase" href="javascript:;">USER</a>
                </div>
            </div>
        </nav>
        <div  class="flex justify-center">
            <div class=" absolute mt-12 lg:mt-15 z-30">
            <a href="/#/adduser"><button type="submit"
                    class="btn btn-primary pull-left ml-4 uppercase">ADD user</button></a>
            </div>
            </div>
         
        <!-- End Navbar -->
        <div class="mt-12 mx-4">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card"  >
                            <div class="card-header card-header-primary">
                                <h4 class="card-title ">USER</h4>
                            </div>
                            <div class="card-body h-[600px] overflow-y-scroll" >
                                <div class="table-responsive" id="list-user">

                               ${await ListUsersChild.render()}
                                
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
        $$('.nav li')[2].classList.add("active");
        return `${await ListUsersChild.afterRender()}`;
    }
}
export default ListUser;