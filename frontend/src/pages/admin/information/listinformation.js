import NavBarAdmin from "../../../components/navbaradmin";
import {
    $$
} from "../../../untils";
import {
    ListInformationChild
} from "../../../components/listinformationsChild";
const ListInformation = {
    async render() {
        return /*html*/ `
                ${NavBarAdmin.render()}
                <div class="main-panel">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div class="container-fluid">
                <div class="navbar-wrapper">
                    <a class="navbar-brand uppercase" href="javascript:;">information</a>
                </div>
            </div>
        </nav>
        
         
        <!-- End Navbar -->
        <div class="content flex justify-center">
            <div class="">
                <div class="">
                    <div class="col-md-12">
                            <div class="card-body  z-50 flex justify-center" >
                                ${await ListInformationChild.render()}
                                <div  class="flex justify-center">
           
                            </div>
                            </div>
                            <div class="flex justify-center ">
                    <a href="/#/addinformation"><button type="submit"
                            class="btn btn-primary pull-left ml-4 uppercase">ADD information</button></a>
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
        $$('.nav li')[1].classList.add("active");
        return `${await ListInformationChild.afterRender()}`;
    }

}
export default ListInformation;