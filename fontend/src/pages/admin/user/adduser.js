import NavBarAdmin from "../../../components/navbaradmin";
import toast from "toast-me";
import {
    $$,
    reRender
} from "../../../untils";
import {
    UserAPI
} from "../../../api/userAPI";
const AddUser = {
    async render() {
        return /*html */ `
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
                                    <h4 class="card-title uppercase">ADD user</h4>
                                </div>
                                <div class="card-body">
                                    <form id="add-user">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Name </label>
                                                    <input type="text" class="check-validate form-control" id="name" name=""
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Email </label>
                                                    <input type="email" class="check-validate form-control" id="email" name=""
                                                     >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Password </label>
                                                    <input type="password" minlength="8" class="check-validate form-control" id="password" name=""
                                                    >
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Password </label>
                                                    <input type="password" minlength="8" class="check-validate form-control" id="confirmPass" name=""
                                                     >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Permission </label><br>
                                                <label>Admin <input type="radio" class="permission" value="Admin"  name="permission"
                                                 > </label>
                                                 <label>Customer  <input type="radio" class="permission" value="Customer"  name="permission"
                                                 checked> </label>
                                            </div>
                                        </div>
                                    </div>
                                        <button type="submit" class="btn btn-primary pull-left uppercase">Add
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
        $$('#add-user').addEventListener('submit', async (e) => {
            e.preventDefault();
            var permission = $$('input[name="permission"]');
            permission.forEach(element => {
                if (element.checked) {
                    permission = element.value;
                }
            });

            var sumCheck = 0;
            $$('.check-validate').forEach(element => {
                if (element.value.trim() == "") {
                    element.style.border = "2px solid #e84e4e"
                    element.placeholder = "Fill in this field";
                    sumCheck += sumCheck + 1;
                } else {
                    element.style.border = "thick solid #FFFFFF"
                }
            });
            if (sumCheck === 0) {
                if ($$('#password').value == $$('#confirmPass').value) {
                    const user = {
                        email: $$('#email').value,
                        password: $$('#password').value,
                        name: $$('#name').value,
                        permission: permission
                    }
                    // console.log(user);
                    await UserAPI.signup(user)
                        .then(() => {
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
                        })
                        .catch(error => {
                            alert(error.response.data);
                        })

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


        });
    }
}
export default AddUser;