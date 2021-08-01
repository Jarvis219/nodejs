import NavBarAdmin from "../../../components/navbaradmin";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ListPost from "./listpost";
import firebase from "firebase";
import toast from "toast-me";
import {
    $$,
    useParams,
    reRender
} from "../../../untils";
import {
    postAPI
} from "../../../api/postAPI";

const EditPost = {
    async render() {
        const {
            id
        } = useParams();
        const {
            data: post
        } = await postAPI.read(id);

        return /*html*/ `
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
                            <h4 class="card-title uppercase">edit post</h4>
                        </div>
                        <div class="card-body">
                            <form id="edit-post">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Title</label>
                                            <input type="text" class="check-validate form-control" value="${post.title}" id="phone"
                                                name="post_title" >
                                                <span class="error-input text-red-500 text-xs "><span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="">
                                            <label class="bmd-label-floating">Image</label>
                                            <img src="${post.image}" alt="" class=" h-40"  id="image-old">
                                            <input type="file" class=" form-control" id="post_image"
                                                name="post_image" >
                                                <span class="error-input text-red-500 text-xs "><span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="">
                                            <label class="bmd-label-floating">Author</label>
                                            <input type="text" class="check-validate form-control"  value="${post.author}" id="address"
                                                name="post_author" >
                                                <span class="error-input text-red-500 text-xs "><span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="">
                                            <label class="bmd-label-floating">Introduce</label>
                                                <textarea name="post_introduce" id="" class="check-validate form-control"  rows="5">${post.introduce}</textarea>
                                                <span class="error-input text-red-500 text-xs "><span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Content</label>
                                            <div  id="editor">${post.content}</div
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary pull-left uppercase" name="submit">update post</button>
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
        const {
            id
        } = useParams();
        $$('.nav li')[7].classList.add("active");
        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
                window.editor = editor;
            })
            .catch(error => {
                console.error('There was a problem initializing the editor.', error);
            });
        $$('#edit-post').addEventListener('submit', async (e) => {
            e.preventDefault()
            var sumCheck = 0;
            $$('.check-validate').forEach((element, index) => {
                if (element.value.trim() == "" || element.value == null) {
                    $$('.error-input')[index].innerHTML = "Fill in this field!!!";
                    sumCheck += sumCheck + 1;
                } else {
                    $$('.error-input')[index].innerHTML = "";
                }
            });
            if ($$('#post_image').value == "") {
                const url = $$('#image-old').src
                updatePost(url);
            } else {
                const img = $$('#post_image').files[0];
                let storageRef = firebase.storage().ref(`images/${img.name}`)
                storageRef.put(img).then(() => {
                    storageRef.getDownloadURL().then(async (url) => {
                        // console.log(url);
                        updatePost(url);
                    });
                })
            }


            async function updatePost(url) {
                const updatePost = {
                    // id: id,
                    title: $$('[name="post_title"]').value,
                    image: url,
                    author: $$('[name="post_author"]').value,
                    introduce: $$('[name="post_introduce"]').value,
                    content: editor.getData(),
                    // day: moment(new Date()).format('DD-MM-YYYY')
                }
                // console.log(updatePost);
                let {
                    _id
                } = JSON.parse(localStorage.getItem('setAuthen'));
                await postAPI.edit(id, _id, updatePost).then(() => {
                    reRender(ListPost, '#table-post');
                    toast(
                        'Update post success', {
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


            }




        });


    }
}
export default EditPost;