import {
    $$,
    reRender
} from "../untils";
import {
    postAPI
} from "../api/postAPI";
import toast from "toast-me";
const ListPostChild = {
    async render() {
        const {
            data: posts
        } = await postAPI.list();
        const result = posts.post.map((element, index) => {
            return /*html*/ `
                <tr>
            <td>${index+1}</td>
            <td>${element.title}</td>
            <td ><img width="100" height="100" src="${element.image}"></td>
            <td>${element.author}</td>
            <td class="overflow-y-scroll "><div style="height: 200px;" class="flex justify-center items-center">${element.introduce}</div></td>
            <td class="w-20"><a  href="http://localhost:8080/#/blogdetail/${element._id}" target="_blank"> <button data-id="${element._id}"
            title="view" class=" text-lg bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><i class="far fa-eye"></i></button></a></td>
            <td class="w-20"><button
            title="edit"    class=" bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><a
                href="#/editpost/${element._id}"
                class="inline-block py-2 px-3"><i class="far fa-edit"></i></a></button></td>
    <td class="w-20"><button data-id="${element._id}"
            class="list-product-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button>
    </td>
        </tr>
                `;
        }).join("");
        return /*html*/ `
        <table class="table text-center" id="table-post">
        <thead class=" text-primary">
                                        <th>
                                            STT
                                        </th>
                                        <th>title</th>
                                        <th>
                                           Image Intro
                                        </th>
                                         <th>Author</th>
                                         <th  style="width: 350px;">Introduce</th>
                                        <th colspan="2" class="w-32">Custom</th>
                                    </thead>
                                    <tbody>
                                    ${result}
                                    </tbody>
                    </table>
        `;
    },
    async afterRender() {
        const btns = $$('.list-product-btn');
        if (btns.length > 1) {
            btns.forEach(element => {
                deleteItem(element);
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
                    await postAPI.remove(id, _id).then(() => {
                        reRender(ListPostChild, '#table-post');
                        toast(
                            'Remove post success', {
                                duration: 3000
                            }, {
                                // label: 'Confirm',
                                action: () => alert('Fill in this field!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        );

                    }).catch(err =>
                        toast(
                            err, {
                                duration: 3000
                            }, {
                                // label: 'Confirm',
                                action: () => alert('Fill in this field!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        )
                    )

                }
            });
        }

    }

}
export default ListPostChild;