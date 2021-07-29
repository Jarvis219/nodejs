import NavBarAdmin from "../../../components/navbaradmin";
import productAPI from "../../../api/productAPI";
import firebase from "../../../firebase";
import categoryAPI from "../../../api/categoryAPI";
import Adminproducts from "./listproducts";
import toast from "toast-me";
import {
    $$,
    reRender
} from '../../../untils';
const AddProduct = {
    async render() {
        const {
            data: result
        } = await categoryAPI.list();
        // console.log(result);
        const cate = result.category.map(element => {
            return /*html*/ `
           <option value="${element._id}">${element.name}</option>
           `;
        }).join("");
        return /*html */ `
        ${NavBarAdmin.render()}
        <div class="main-panel">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div class="container-fluid">
                    <div class="navbar-wrapper">
                        <a class="navbar-brand uppercase" href="javascript:;">product</a>
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
                                    <h4 class="card-title">ADD product</h4>
                                </div>
                                <div class="card-body">
                                    <form id="add-product">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Name product</label>
                                                    <input type="text" class="check-validate form-control" id="name" name="name_product" 
                                                     >
                                                     <span  class="error-input text-red-500 text-xs "><span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Price ($)</label>
                                                    <input type="number" name="price" class="check-validate form-control" id="price" 
                                                     >
                                                     <span class="error-input text-red-500 text-xs "><span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Promotional ($)</label>
                                                    <input type="number" class="check-validate form-control" name="promotional" 
                                                        id="promotional" >
                                                        <span class="error-input text-red-500 text-xs "><span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Introduction</label>
                                                    <textarea name="introduction" cols="30" id="introduction" rows="10"
                                                        class="check-validate form-control border  product"  ></textarea>
                                                        <span class="error-input text-red-500 text-xs "><span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Content</label>
                                                    <textarea name="content" cols="30" rows="10" id="content"
                                                        class="check-validate form-control border  product"></textarea>
                                                        <span class="error-input text-red-500 text-xs "><span>
                                                </div>
                                            </div>
                                        </div>
                                             <div class="row">
                                            <div class="col-md-12">
                                                <div class="">
                                                    <label class="bmd-label-floating">ImageIntro</label>
                                                    <input type="file" class="check-validate form-control"  name="promotional"
                                                    id="image" >
                                                    <span class="error-input text-red-500 text-xs "><span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="">
                                                    <label class="bmd-label-floating">Album</label>
                                                    <input type="file" class="check-validate form-control album" multiple name="promotional"
                                                    id="" >
                                                    <span class="error-input text-red-500 text-xs "><span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">classify product</label>
                                                   <div class="flex justify-start items-center gap-3">
                                                   <input type="radio" name="classify" value="male" id="male" checked>
                                                   <label for="male" class=" py-1 classify text-gray-800"> Male
                                                   </label>
                                                   <input type="radio" name="classify" value="female" id="famale" >
                                                    <label for="famale" class=" py-1 classify text-gray-800"> Female
                                                    </label>
                                                   </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Size product</label>
                                                    <div class="flex justify-between items-center">
                                                    <input type="checkbox" name="size" value="XXS" id="XXS" checked>
                                                    <label for="XXS" class=" py-1  text-gray-800"> XXS
                                                    </label>
                                                    <input type="checkbox" name="size" value="XS" id="XS" >
                                                    <label for="XS" class=" py-1  text-gray-800">
                                                        XS </label>
                                                    <input type="checkbox" name="size" value="XS-S" id="XS-S" >
                                                    <label for="XS-S" class=" py-1  text-gray-800"> XS-S
                                                    </label>
                                                    <input type="checkbox" name="size" value="S" id="S" >
                                                    <label for="S" class=" py-1  text-gray-800"> S
                                                    </label>
                                                    <input type="checkbox" name="size" value="M" id="M" >
                                                    <label for="M" class=" py-1  text-gray-800"> M
                                                    </label>
                                                    <input type="checkbox" name="size" value="M-L" id="M-L" >
                                                    <label for="M-L" class=" py-1  text-gray-800">
                                                        M-L </label>
                                                    <input type="checkbox" name="size" value="L" id="L" >
                                                    <label for="L" class=" py-1  text-gray-800"> L
                                                    </label>
                                                    <input type="checkbox" name="size" value="XL" id="XL" >
                                                    <label for="XL" class=" py-1  text-gray-800">
                                                        XL </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Category product</label>
                                                    <select name="category" id="category" class="form-control" >
                                                      ${cate}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" class="btn btn-primary pull-left">Add
                                            product</button>
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
    afterRender() {
        $$('.nav li')[3].classList.add("active");
        $$('#add-product').addEventListener('submit', async (e) => {
            e.preventDefault();
            var {
                _id
            } = JSON.parse(localStorage.getItem('setAuthen'));
            var sumCheck = 0;
            $$('.check-validate').forEach((element, index) => {
                if (element.value.trim() == "" || element.value == null) {
                    $$('.error-input')[index].innerHTML = "Fill in this field!!!";
                    // if(element)
                    sumCheck += sumCheck + 1;
                } else {
                    $$('.error-input')[index].innerHTML = "";
                }
            });
            var checkName;
            const {
                data: checkProducts
            } = await productAPI.list();

            checkProducts.product.forEach(ele => {
                // console.log($$('#name').value.toLocaleLowerCase());
                if (ele.name.toLocaleLowerCase() == $$('#name').value.toLocaleLowerCase()) {
                    checkName = true;
                }
            })
            // console.log(checkName);
            if (sumCheck === 0 && checkName !== true) {
                const size = $$('[name="size"]');
                const sizes = [];
                const urls = [];
                const albums = [];


                size.forEach(element => {
                    if (element.checked) {
                        sizes.push(element.value);
                    }
                });
                const classify = $$('[name="classify"]');
                const sex = [];
                classify.forEach(element => {
                    if (element.checked) {
                        sex.push(element.value);
                    }
                });
                const album = $$('.album');
                const img = $$('#image').files[0];
                let storageRef = firebase.storage().ref(`images/${img.name}`);
                storageRef.put(img).then(() => {
                    const albumsImg = [];
                    storageRef.getDownloadURL().then((url => {
                        urls.push(url);
                    }))

                    let index = 0;

                    async function addImg() {
                        for (var i = 0; i < album.files.length; i++) {
                            var imageFile = album.files[i];
                            await uploadImageAsPromise(imageFile);
                            index++;
                            if (index == album.files.length) {
                                const urlImg = urls.toString();
                                const product = {
                                    // id: Math.round(Math.random() * 700000),
                                    name: $$('#name').value,
                                    category: $$('#category').value,
                                    content: $$('#content').value,
                                    price: $$('#price').value,
                                    sale: $$('#promotional').value,
                                    description: $$('#introduction').value,
                                    photo: urlImg,
                                    album: albums,
                                    size: sizes,
                                    classify: sex.join(""),
                                }
                                // console.log(product);
                                if (await productAPI.add(product, _id)) {
                                    reRender(Adminproducts, '#list-product');
                                    toast(
                                        'Add product success', {
                                            duration: 3000
                                        }, {
                                            // label: 'Confirm',
                                            action: () => alert('Fill in this field!'),
                                            class: 'my-custom-class', // optional, CSS class name for action button
                                        },
                                    );
                                    window.location.hash = `/listproducts`;

                                } else {
                                    toast(
                                        'Add product failure', {
                                            duration: 3000
                                        }, {
                                            // label: 'Confirm',
                                            action: () => alert('Fill in this field!'),
                                            class: 'my-custom-class', // optional, CSS class name for action button
                                        },
                                    );
                                }



                            }

                        }
                    }
                    addImg();
                    // console.log(index);
                    function uploadImageAsPromise(imageFile) {
                        // console.log(imageFile);
                        return new Promise(function (resolve, reject) {
                            var storageRef = firebase.storage().ref(`images/${imageFile.name}`);
                            //Upload file
                            var task = storageRef.put(imageFile);
                            //Update progress bar
                            task.on('state_changed',
                                function progress(snapshot) {
                                    var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                                    // uploader.value = percentage;
                                },
                                function error(err) {

                                },
                                async function complete() {

                                    const imageURL = await task.snapshot.ref.getDownloadURL();
                                    albums.push(imageURL)
                                    resolve(imageURL)
                                }

                            );

                        })
                    }

                })

            } else {
                if (checkName == true) {
                    $$('.error-input')[0].innerHTML = "Name already exist!!!";
                    toast(
                        'Name already exist', {
                            duration: 5000
                        }, {
                            // label: 'Confirm',
                            action: () => alert('Fill in this field!'),
                            class: 'my-custom-class', // optional, CSS class name for action button
                        },
                    );
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
            }

        });
    }
}
export default AddProduct;