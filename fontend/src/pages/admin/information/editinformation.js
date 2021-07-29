import NavBarAdmin from "../../../components/navbaradmin";
import {
    $$,
    reRender
} from "../../../untils";
import {
    useParams
} from "../../../untils";
import {
    informationAPI
} from "../../../api/informationAPI";
import {
    ListInformationChild
} from "../../../components/listinformationsChild";
import firebase from "firebase";
const EditInformation = {
    async render() {
        const {
            id
        } = await useParams()
        const {
            data
        } = await informationAPI.listedit(id)
        return /*html */ `
            ${ NavBarAdmin.render()}
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
                                    <h4 class="card-title uppercase">Edit information</h4>
                                </div>
                                <div class="card-body">
                                <form id="edit-infor">
                                <div class="row">
                                    
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Phone</label>
                                            <input type="tel" class="form-control infor" id="phone"
                                                value="${data.numberPhone}"
                                                name="information_phone" required>
                                        </div>
                                    </div>
                                </div>
                                    <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Address</label>
                                            <input type="text" class="form-control infor" id="address"
                                                value="${data.address}"
                                                name="information_address" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Link google map</label>
                                            <input type="text" class="form-control infor" id="maps"
                                                name="link_map" value="${data.linkMap}" </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Slogan</label>
                                                <input type="text" class="form-control infor" id="slogan"
                                                    value="${data.slogan}"
                                                    name="information_slogan" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Email</label>
                                                <input type="email"  class="form-control infor" id="email"
                                                    value="${data.email}"
                                                    name="information_email" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="">
                                                <label class="bmd-label-floating">Logo</label>
                                                <img class="w-20 object-cover"
                                                    src="${data.logo}" alt="" id="image">
                                                <input type="file" class="form-control" name="logo" id="logo">
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary pull-left uppercase" name="submit">Update</button>
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
    </div>
    <!--   Core JS Files   -->
        `;
    },
    async afterRender() {
        $$('.nav li')[1].classList.add("active");
        const {
            id
        } = useParams();
        $$('#edit-infor').addEventListener('submit', async (e) => {
            e.preventDefault();
            var {
                _id
            } = JSON.parse(localStorage.getItem('setAuthen'));
            if (logo.value) {
                const img = $$('#logo').files[0];
                let storageRef = firebase.storage().ref(`images/${img.name}`);
                storageRef.put(img).then(() => {
                    storageRef.getDownloadURL().then((async (url) => {
                        console.log(url);
                        const informatins = {
                            // id: id,
                            numberPhone: $$('#phone').value,
                            address: $$('#address').value,
                            linkMap: $$('#maps').value,
                            slogan: $$('#slogan').value,
                            logo: url,
                            email: $$('#email').value
                        }
                        // console.log(informatins);

                        await informationAPI.edit(id, _id, informatins)
                            .then(() => {
                                alert("Add information success")
                                window.location.hash = `/listinformation`;
                                reRender(ListInformationChild, '#table-informations');
                            }).catch(err => console.log(err))
                    }))
                })
            } else {
                const informatins = {
                    // id: id,
                    numberPhone: $$('#phone').value,
                    address: $$('#address').value,
                    linkMap: $$('#maps').value,
                    slogan: $$('#slogan').value,
                    logo: $$('#image').src,
                    email: $$('#email').value
                }
                // console.log(informatins);
                await informationAPI.edit(id, _id, informatins)
                    .then(() => {
                        alert("Add information success")
                        window.location.hash = `/listinformation`;
                        reRender(ListInformationChild, '#table-informations');
                    }).catch(err => console.log(err))
            }

        })

    }
}
export default EditInformation;