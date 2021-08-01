import NavBarAdmin from "../../../components/navbaradmin";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import firebase from "firebase";
import toast from "toast-me";
import ListPost from "../posts/listpost";
import {
    $$,
    reRender
} from "../../../untils";
import {
    postAPI
} from "../../../api/postAPI";
const AddPost = {
    render() {
        return /*html */ `
            ${NavBarAdmin.render()}
            <div class="main-panel">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div class="container-fluid">
                    <div class="navbar-wrapper">
                        <a class="navbar-brand uppercase" href="javascript:;">post</a>
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
                                <h4 class="card-title uppercase">Add post</h4>
                            </div>
                            <div class="card-body">
                                <form id="add-post">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Title</label>
                                                <input type="text" class="check-validate form-control" id="phone"
                                                    name="post_title" >
                                                    <span class="error-input text-red-500 text-xs "><span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="">
                                                <label class="bmd-label-floating">Image</label>
                                                <input type="file" class="check-validate  form-control" id="address"
                                                    name="post_image" >
                                                    <span class="error-input text-red-500 text-xs "><span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="">
                                                <label class="bmd-label-floating">Author</label>
                                                <input type="text" class="check-validate form-control"  maxlength="50" id="address"
                                                    name="post_author" >
                                                    <span class="error-input text-red-500 text-xs "><span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="">
                                                <label class="bmd-label-floating">Introduce</label>
                                                    <textarea name="post_introduce" maxlength="200" id="" class="check-validate form-control"  rows="5"></textarea>
                                                    <span class="error-input text-red-500 text-xs "><span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Content</label>
                                                <div  id="editor"></div
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary pull-left uppercase" name="submit">add post</button>
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
    afterRender() {
        $$('.nav li')[7].classList.add("active");
        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
                window.editor = editor;
            })
            .catch(error => {
                console.error('There was a problem initializing the editor.', error);
            });


        $$('#add-post').addEventListener('submit', (e) => {
            e.preventDefault();
            var sumCheck = 0;
            $$('.check-validate').forEach((element, index) => {
                if (element.value.trim() == "" || element.value == null) {
                    $$('.error-input')[index].innerHTML = "Fill in this field!!!";
                    sumCheck += sumCheck + 1;
                } else {
                    $$('.error-input')[index].innerHTML = "";
                }
            });
            if (sumCheck === 0) {
                const img = $$('[name="post_image"]').files[0];
                let storageRef = firebase.storage().ref(`images/${img.name}`)
                storageRef.put(img).then(() => {
                    storageRef.getDownloadURL().then(async (url) => {
                        const dataPost = {
                            // id: Math.round(Math.random() * 700000),
                            title: $$('[name="post_title"]').value,
                            image: url,
                            author: $$('[name="post_author"]').value,
                            introduce: $$('[name="post_introduce"]').value,
                            content: editor.getData(),
                            day: moment(new Date()).format('DD-MM-YYYY')
                        }
                        let {
                            _id
                        } = JSON.parse(localStorage.getItem('setAuthen'));
                        await postAPI.add(dataPost, _id).then(() => {
                            reRender(ListPost, '#table-post');
                            toast(
                                'Add post success', {
                                    duration: 3000
                                }, {
                                    // label: 'Confirm',
                                    action: () => alert('Fill in this field!'),
                                    class: 'my-custom-class', // optional, CSS class name for action button
                                },
                            );
                            window.location.hash = `/listpost`;
                        }).catch(err => toast(
                            err, {
                                duration: 3000
                            }, {
                                // label: 'Confirm',
                                action: () => alert('Fill in this field!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        ))
                    })
                })
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
export default AddPost;