import {
    $$,
    reRender
} from '../untils';
import productAPI from "../api/productApi";
import categoryAPI from "../api/categoryAPI";
import toast from "toast-me";
const ListProductchild = {
    async render() {
        const {
            data: product
        } = await productAPI.list();
        // console.log(product);
        var arr_cate = [];
        var count_cate = [];
        product.product.forEach(ele => {
            arr_cate.push(ele.category);
        })
        // console.log(arr_cate);
        //    const arr_category = await arr_cate.forEach(async(ele, index)=>{
        //         const {data:cate}= await categoryAPI.edit(ele);
        //         //   console.log(cate);
        //         count_cate.push(cate.name);
        //     })
        //     console.log(count_cate);
        //      console.log(1);
        const result = product.product.map((element, index) => {
            // console.log(element);
            // const {data:cate}= await categoryAPI.edit(element.category);
            // console.log(cate);
            return /*html */ `
            <tr>
            <td>${index+1}</td>
            <td>${element.name}</td>
            <td>${element.category.name}</td>
            <td>$${element.price+`.00`}</td>
            <td>$${element.sale+`.00`}</td>
            <td>${element.size}</td>
            <td>${element.classify}</td>
            <td ><img width="100" height="100" src="${element.photo}"></td>
            <td class="w-20"><a  href="http://localhost:8080/#/products/${element._id}" target="_blank"> <button data-id="${element._id}"
            title="view" class=" text-lg bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><i class="far fa-eye"></i></button></a></td>
            <td class="w-20"><button
            title="edit"    class=" bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><a
                href="#/editproduct/${element._id}"
                class="inline-block py-2 px-3"><i class="far fa-edit"></i></a></button></td>
    <td class="w-20"><button data-id="${element._id}"
            class="list-product-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button>
    </td>
        </tr>
            `;
        }).join("");
        return /*html */ `
            
        <table class="table text-center" id="table-product">
        <thead class=" text-primary">
                                        <th>
                                            stt
                                        </th>
                                        <th>Name</th>
                                        <th>
                                           Category
                                        </th>
                                        <th>
                                        Price
                                        </th>
                                        <th>
                                        Sale
                                         </th>
                                         <th>
                                         size
                                         </th>
                                         <th>
                                         classify
                                         </th>
                                         <th >
                                         imagesIntro
                                       </th>
                                      
                                        <th colspan="3" class="w-32">Custom</th>
                                    </thead>
                                    <tbody>
                                        ${result}
                                    </tbody>
    </table>
        `;
    },

    async afterRender() {
        const btns = $$('.list-product-btn')
        if (btns.length > 1) {
            btns.forEach(element => {
                deleteItem(element)
            });
        } else {
            deleteItem(btns);
        }

        function deleteItem(element) {
            const id = element.dataset.id;
            element.addEventListener('click', async () => {
                const question = confirm('Are you want to delete?');
                if (question) {
                    let {
                        _id
                    } = JSON.parse(localStorage.getItem('setAuthen'));
                    await productAPI.remove(id, _id).then(() => {
                        reRender(ListProductchild, '#table-product');
                        toast(
                            'Remove product success', {
                                duration: 3000
                            }, {
                                // label: 'Confirm',
                                action: () => alert('Fill in this field!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        );
                    })
                }
            });
        }
    }
}
export default ListProductchild;