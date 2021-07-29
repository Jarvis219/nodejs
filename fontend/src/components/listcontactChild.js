import {
    $$,
    reRender
} from "../untils";
import {
    contactAPI
} from "../api/contactAPI";

const ListContactChild = {
    async render() {
        const {
            data: contact
        } = await contactAPI.list()
        // console.log(contact);
        const contacts = contact.map((element, index) => {
            var statuss;
            if (element.status == 'Approved') {
                statuss = `<option value="${element.status}" >${element.status}</option>`
            } else {
                statuss = `<option value="${element.status}" >${element.status}</option>
                <option value="Approved">Approved</option>`
            }

            // console.log(statuss);
            return /*html*/ `
            <tr>
                <td>${index+1}</td>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>0${element.phone}</td>
                <td class="overflow-y-scroll "><div style="height: 200px;" class="flex justify-center items-center">${element.content}</div></td>
                <td><select data-id="${element._id}" class="status border-2 border-green-400 border-opacity-100 rounded-lg text-green-700">
                ${statuss}
            </select></td>
                <td class="w-20"><button data-id="${element._id}"
                class="list-contact-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                    <i class="far fa-trash-alt inline-block px-3 py-[13px]"></i></button></td>
            </tr>
            `;
        }).join("");
        return /*html*/ `
        <table class="table text-center" id="list-content">
                                        <thead class=" text-primary  ">
                                            <th>
                                               STT
                                            </th>
                                            <th>
                                                Name
                                            </th>
                                            <th>
                                                Email
                                            </th>
                                            <th>
                                                Phone number
                                            </th>
                                            <th style="width: 350px;">Content</th>
                                            <th>Status</th>
                                            <th><span class="pl-4">Custom</span></th>
                                        </thead>
                                        <tbody>
                                            ${contacts}

                                        </tbody>
                                    </table>
        `;
    },
    async afterRender() {
        const {
            data: contacts
        } = await contactAPI.list()
        const btns = $$('.list-contact-btn');

        function deleteItem(element) {

            const id = element.dataset.id
            // console.log(id);
            element.addEventListener('click', async () => {
                const question = confirm("Are you want to delete?")
                if (question) {
                    let {
                        _id
                    } = JSON.parse(localStorage.getItem('setAuthen'));
                    await contactAPI.remove(id, _id);
                    await reRender(ListContactChild, '#list-content');
                }
            })
        }

        if (btns.length > 1) {
            btns.forEach(element => {
                deleteItem(element)
            });
        } else {
            deleteItem(btns);
        }


        if (contacts.length > 1) {
            $$('.status').forEach(element => {
                selectorSaveStatus(element)
            });
        } else {

            selectorSaveStatus($$('.status'));
        }

        function selectorSaveStatus(element) {
            const id = element.dataset.id
            element.addEventListener('change', async () => {
                // console.log(id);
                const {
                    data: ct
                } = await contactAPI.listCt(id)
                // console.log(element.value);
                const contact = {
                    // id: id,
                    name: ct.name,
                    email: ct.email,
                    phone: ct.phone,
                    content: ct.content,
                    status: element.value
                }
                let {
                    _id
                } = JSON.parse(localStorage.getItem('setAuthen'));
                await contactAPI.update(id, _id, contact);
                await reRender(ListContactChild, '#list-content');
            })
        }

        // $$('.status').forEach(element => {
        //     const id = element.dataset.id
        //     element.addEventListener('change', async () => {
        //         // console.log(id);
        //         const {
        //             data: ct
        //         } = await contactAPI.listCt(id)
        //         // console.log(element.value);
        //         const contact = {
        //             id: id,
        //             name: ct.name,
        //             email: ct.email,
        //             phone: ct.phone,
        //             content: ct.content,
        //             status: element.value
        //         }
        //         await contactAPI.update(id, contact);
        //         await reRender(ListContactChild, '#list-content');
        //     })
        // })
    }
}
export default ListContactChild;