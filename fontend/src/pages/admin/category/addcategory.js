import NavBarAdmin from "../../../components/navbaradmin";
import toast from "toast-me";
import {
    $$,
    reRender
} from "../../../untils";
import categoryAPI from "../../../api/categoryAPI";
import ListCategory from '../../../pages/admin/category/listcategory';
const AddCategory = {
    render() {
        return /*html*/ `
        ${NavBarAdmin.render()}
        <div class="main-panel">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div class="container-fluid">
                    <div class="navbar-wrapper">
                        <a class="navbar-brand uppercase" href="javascript:;">Category</a>
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
                                    <h4 class="card-title">ADD Category</h4>
                                </div>
                                <div class="card-body">
                                    <form id="add-category">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Name Category</label>
                                                    <input type="text" class="check-validate form-control" id="name" name="name_category"
                                                     >
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary pull-left">Add
                                            Category</button>
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
        $$('.nav li')[4].classList.add("active");
        const {
            data
        } = await categoryAPI.list();
        $$('#add-category').addEventListener('submit', async (e) => {
            e.preventDefault();
            var sumCheck = 0;
            const check_validate = $$('.check-validate');
            // console.log(check_validate.value.trim().toLocaleLowerCase());
            if (check_validate.value.trim() == "") {
                check_validate.style.border = "2px solid #e84e4e"
                check_validate.placeholder = "Fill in this field";
                sumCheck = 1;
            } else {
                check_validate.style.border = "thick solid #FFFFFF"
            }
            if (sumCheck === 0) {
                const nameCate = $$('[name="name_category"]').value.trim().toLocaleLowerCase();
                let checkName = 0;
                // console.log(data);
                data.category.forEach(element => {
                    if (element.name.toLocaleLowerCase() == nameCate) {
                        checkName = 1;
                    }
                });
                if (checkName === 0) {
                    const category = {
                        name: nameCate
                    }
                    let {
                        _id
                    } = JSON.parse(localStorage.getItem('setAuthen'));
                    // console.log(_id);
                    await categoryAPI.add(category, _id).then(() => {
                        reRender(ListCategory, '#table-category');
                        toast(
                            'Add category success', {
                                duration: 3000
                            }, {
                                // label: 'Confirm',
                                action: () => alert('Fill in this field!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        );
                        window.location.hash = `/listcategory`;

                    }).catch(error => {
                        // reRender(ListCategory, '#table-category');
                        // console.log(error.response.data.error);
                        toast(
                            error.response.data.error, {
                                duration: 3000
                            }, {
                                // label: 'Confirm',
                                action: () => alert('Fill in this field!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        );
                        // window.location.hash = `/listcategory`;

                    })

                } else {
                    toast(
                        'Name already exists!', {
                            duration: 4000
                        }, {
                            // label: 'Confirm',
                            action: () => alert('Fill in this field!'),
                            class: 'my-custom-class', // optional, CSS class name for action button
                        },
                    );
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
export default AddCategory