import NavBarAdmin from "../../../components/navbaradmin";
import categoryAPI from "../../../api/categoryAPI";
import ListCategory from '../../../pages/admin/category/listcategory';
import toast from "toast-me";
import {
    $$,
    useParams,
    reRender
} from "../../../untils";
const EditCategory = {

    async render() {
        const {
            id
        } = useParams();
        const {
            data: result
        } = await categoryAPI.edit(id);
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
                                    <h4 class="card-title">Edit Category</h4>
                                </div>
                                <div class="card-body">
                                    <form id="edit-category">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Name Category</label>
                                                    <input type="text" class="check-validate form-control" value="${result.name}" id="name" name="name_category"
                                                     >
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary pull-left">Edit
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
            id
        } = useParams();

        $$('#edit-category').addEventListener('submit', async (e) => {
            e.preventDefault();
            var sumCheck = 0;
            const check_validate = $$('.check-validate');
            if (check_validate.value.trim() == "") {
                check_validate.style.border = "2px solid #e84e4e"
                check_validate.placeholder = "Fill in this field";
                sumCheck = 1;
            } else {
                check_validate.style.border = "thick solid #FFFFFF"
            }
            if (sumCheck === 0) {
                const category = {
                    id: id,
                    name: $$('[name="name_category"]').value
                }
                let {
                    _id
                } = JSON.parse(localStorage.getItem('setAuthen'));
                if (await categoryAPI.update(id, _id, category)) {
                    toast(
                        'Update category success', {
                            duration: 3000
                        }, {
                            // label: 'Confirm',
                            action: () => alert('Fill in this field!'),
                            class: 'my-custom-class', // optional, CSS class name for action button
                        },
                    );
                    setTimeout(() => {
                        window.location.hash = `/listcategory`;
                    }, 1000);

                    reRender(ListCategory, '#table-category');

                } else {
                    toast(
                        'Update category failures', {
                            duration: 3000
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
export default EditCategory;