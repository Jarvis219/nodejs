import NavBarAdmin from "../../../components/navbaradmin";
import ListContactChild from "../../../components/listcontactChild";
import {
    $$
} from "../../../untils";
const ListContact = {
    async render() {
        return /*html */ `
        ${NavBarAdmin.render()}
        <div class="main-panel">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div class="container-fluid">
                <div class="navbar-wrapper">
                    <a class="navbar-brand uppercase" href="javascript:;">Contact</a>
                </div>
                
            </div>
        </nav>
        <!-- End Navbar -->
        <div class="mt-12 mx-4">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header card-header-primary flex justify-between">
                                <h4 class="card-title ">Contact</h4>
                            </div>
                            <div class="card-body h-[600px] overflow-y-scroll">
                                <div class="table-responsive">
                                    ${await ListContactChild.render()}
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
</div>
<!--   Core JS Files   -->
        
        `;
    },
    async afterRender() {
        $$('.nav li')[6].classList.add("active");
        return `${await ListContactChild.afterRender()}`;
    }
}
export default ListContact;