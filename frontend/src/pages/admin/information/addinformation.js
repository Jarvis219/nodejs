import NavBarAdmin from "../../../components/navbaradmin";
import {
    $$,
    reRender
} from "../../../untils";
import {
    informationAPI
} from "../../../api/informationAPI";
import firebase from "firebase";
import {
    ListInformationChild
} from "../../../components/listinformationsChild";
const AddInformation = {
    async render() {
        return /*html */ `
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
            <div class="mt-12 mx-4">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-10">
                        <div class="card">
                            <div class="card-header card-header-primary">
                                <h4 class="card-title uppercase">Add information</h4>
                            </div>
                            <div class="card-body">
                                <form id="add-infor">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">ID (disabled)</label>
                                                <input type="text" class="form-control" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Number Phone</label>
                                                <input type="tel" class="form-control" id="phone"
                                                    name="information_phone" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Address</label>
                                                <input type="text" class="form-control" id="address"
                                                    name="information_address" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Link google map</label>
                                                <input type="text" class="form-control" id="maps" name="link_map" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Slogan</label>
                                                <input type="text" class="form-control" id="slogan"
                                                    name="information_slogan" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Email</label>
                                                <input type="email" class="form-control" id="email"
                                                    name="information_email" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="">
                                                <label class="bmd-label-floating">Logo</label>
                                                <input type="file" class="form-control" id="logo" name="logo" required>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary pull-left uppercase" name="submit">add information</button>
                                </form>
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
        $$('.nav li')[1].classList.add("active");
        $$('#add-infor').addEventListener('submit', async (e) => {
            e.preventDefault();
            const img = $$('#logo').files[0];
            // console.log(img);
            let storageRef = firebase.storage().ref(`images/${img.name}`);
            storageRef.put(img).then(() => {
                storageRef.getDownloadURL().then((async (url) => {
                    console.log(url);
                    const informatins = {
                        // id: Math.round(Math.random() * 700000),
                        numberPhone: $$('#phone').value,
                        address: $$('#address').value,
                        linkMap: $$('#maps').value,
                        slogan: $$('#slogan').value,
                        logo: url,
                        email: $$('#email').value
                    }
                    // console.log(informatins);
                    let {
                        _id
                    } = JSON.parse(localStorage.getItem('setAuthen'));
                    await informationAPI.add(informatins, _id).then(() => {
                        alert("Add information success")
                        reRender(ListInformationChild, '#table-informations');
                        window.location.hash = `/listinformation`;
                    }).catch(error => {
                        console.log(error);
                    })

                }))
            })

        })
    }

}
export default AddInformation;