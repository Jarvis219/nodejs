import {
    $$,
    reRender
} from "../untils";
import {
    UserAPI
} from "../api/userAPI";
import toast from "toast-me";
const ListUsersChild = {
    async render() {

        // <td class="w-20"><button
        // class=" bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><a
        //     href="#/edituser/${element._id}"
        //     class="inline-block py-2 px-3"><i class="far fa-edit"></i></a></button></td>
        // const respon = await fetch("http://localhost:3001/users");
        // const users = await respon.json();
        const {
            data: {
                user
            }
        } = await UserAPI.list();
        // console.log(user);

        const userTable = user.map((element, index) => {
            const Permission = () => {
                if (element.permission == "1") {
                    return `
                    <label>Admin <input type="radio" data-id="${element._id}" class="permission" value="1"   name="permission"
                     checked> </label>
                    <label>Member  <input type="radio"  data-id="${element._id}"  class="permission" value="0"  name="permission"
                    > </label>
                    `;
                } else {
                    return `
                    <label>Admin <input type="radio"  data-id="${element._id}"   class="permission" value="1"   name="permission"
                     > </label>
                    <label>Member  <input type="radio"  data-id="${element._id}"  class="permission" value="0"  name="permission"
                    checked> </label>
                    `;
                }
            }

            return /*html*/ `
            <tr class="col-${element._id}">
                <td>${index+1}</td>
                <td>${element.email}</td>
                <td>${element.name}</td>
                <td><form>
                    ${Permission()}
            </form></td>
           
                <td><button data-id="${element._id}"
                class="list-user-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                    <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button>
                </td>
            </tr>
            `;
        }).join("");


        return /*html */ `
        <table class="table text-center" id="table-user">
        <thead class=" text-primary">
                                        <th>
                                            stt
                                        </th>
                                        <th>Email</th>
                                        <th>
                                           Name 
                                        </th>
                                         <th>Permission</th>
                                        <th colspan="2" class="w-32">Custom</th>
                                    </thead>
                                    <tbody>
                                      ${userTable}
                                    </tbody>
                    </table>
        
        `;
    },
    async afterRender() {
        var btns = $$('.list-user-btn');

        function deleteItem(element) {
            const id = element.dataset.id;
            element.addEventListener('click', async () => {
                const question = confirm("Are you want to delete?");
                if (question) {
                    await UserAPI.remove(id).then(() => {
                        reRender(ListUsersChild, '#table-user')
                        toast(
                            'Update user success', {
                                duration: 3000
                            }, {
                                // label: 'Confirm',
                                action: () => alert('Fill in this field!'),
                                class: 'my-custom-class', // optional, CSS class name for action button
                            },
                        );
                    })
                }
                // await UserAPI.remove(id);
                // if (question) {
                //     var remoItem = $$(`.col-${id}`);
                //     if (remoItem) {
                //         remoItem.remove();
                //     }
                // }
            });
        }
        if (btns.length > 1) {
            btns.forEach(element => {
                deleteItem(element)
            });
        } else {
            deleteItem(btns);
        }


        var permission = $$('.permission');
        permission.forEach(element => {
            const id = element.dataset.id;
            element.addEventListener('change', async () => {
                const {
                    data
                } = await UserAPI.listedit(id);
                const dataUser = {
                    // id: Number(id),
                    // email: data.email,
                    // name: data.name,
                    // password: data.password,
                    permission: element.value,
                }
                // let {
                //     _id
                // } = JSON.parse(localStorage.getItem('setAuthen'));
                // console.log(id);
                await UserAPI.update(id, dataUser).then(() => {
                    reRender(ListUsersChild, '#table-user');
                    toast(
                        'Update user success', {
                            duration: 3000
                        }, {
                            // label: 'Confirm',
                            action: () => alert('Fill in this field!'),
                            class: 'my-custom-class', // optional, CSS class name for action button
                        },
                    );
                })

            })
        })
    }



}
export default ListUsersChild;