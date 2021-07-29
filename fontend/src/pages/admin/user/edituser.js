import NavBarAdmin from "../../../components/navbaradmin";
import ListUsersChild from '../../../components/listusersChild';
import toast from 'toast-me';
import {
    UserAPI
} from "../../../api/userAPI";
import {
    useParams
} from "../../../untils";
import {
    $$,
    reRender
} from "../../../untils";

const EditUser = {
    async render() {
        const {
            id
        } = useParams()
        const {
            data: user
        } = await UserAPI.listedit(id);
        // console.log(user.password);

        return /*html*/ `
        ${NavBarAdmin.render()}
        <div class="main-panel">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div class="container-fluid">
                    <div class="navbar-wrapper">
                        <a class="navbar-brand uppercase" href="javascript:;">user</a>
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
                                    <h4 class="card-title uppercase">Edit user</h4>
                                </div>
                                <div class="card-body">
                                <form id="edit-user">
                                <div class="my-custom-class"></div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Name </label>
                                            <input type="text" value="${user.name}" class="check-validate form-control" id="name" name=""
                                            ><span class="error-input text-red-500 text-xs "><span>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary pull-left uppercase">edit
                                    user</button>
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
        $$('.nav li')[2].classList.add("active");
        const {
            id
        } = useParams();
        const {
            data: user
        } = await UserAPI.listedit(id);
        $$('#edit-user').addEventListener('submit', async (e) => {
            e.preventDefault();
            var sumCheck = 0;
            if ($$('.check-validate').value.trim() == "" || $$('.check-validate').value == null) {
                $$('.error-input').innerHTML = "Fill in this field!!!";
                sumCheck = 1;
            } else {
                $$('.error-input').innerHTML = "";
            }
            if (sumCheck === 0) {
                if ($$('#password').value == $$('#confirmPass').value) {
                    const editUser = {
                        // id: id,
                        // email: user.email,
                        // password: user.password,
                        name: $$('#name').value,
                        // permission: user.permission
                    }
                    // console.log(editUser.password);
                    let {
                        _id
                    } = JSON.parse(localStorage.getItem('setAuthen'));
                    await UserAPI.update(id, _id, editUser);
                    toast(
                        'Update user success', {
                            duration: 3000
                        }, {
                            // label: 'Confirm',
                            action: () => alert('Fill in this field!'),
                            class: 'my-custom-class', // optional, CSS class name for action button
                        },
                    );
                    window.location.hash = `/listusers`;
                    reRender(ListUsersChild, '#table-user');

                } else {
                    alert('Password does not match !!!')
                }
            } else {
                toast(
                    'Fill in this field!', {
                        duration: 3000
                    }, {
                        // label: 'Confirm',
                        action: () => alert('Fill in this field!'),
                        class: 'my-custom-class', // optional, CSS class name for action button
                    },
                );
            }
        })


    }


}
export default EditUser;