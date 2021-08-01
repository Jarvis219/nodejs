import {
    informationAPI
} from "../api/informationAPI";
import {
    $$,
    reRender
} from "../untils";

export const ListInformationChild = {
    async render() {
        const {
            data: infor
        } = await informationAPI.list();
        const inforTable = infor.infor.map(element => {
            return /*html*/ `
            <div class="col-md-4">
            <div class="card card-profile">
              <div class="flex justify-center mt-4">
                  <img class="img" src="${element.logo}" />
              </div>
              <div class="card-body">
                <h3 class="card-category text-gray">${element.slogan}</h3>
                <h6 class="card-title"><span class="text-[#1DC1F3]">Email: </span> ${element.email}</h6>
                <h6 class="card-title"><span class="text-[#1DC1F3]">Phone: </span>  ${element.numberPhone}</h6>
                <h6 class="card-title"><span class="text-[#1DC1F3]">Address: </span>  ${element.address}</h6>
                <p class="card-description">
                  Don't be scared of the truth because we need to restart the human foundation in truth And I love you
                  like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
                </p>
                <div class=" flex justify-center gap-3">
                    <button
                class=" bg-gradient-to-r from-green-400 to-blue-500  text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"><a
                    href="#/editinformation/${element._id}"
                    class=" py-2 px-3"><i class="far fa-edit"></i></a></button>
      
                <button data-id="${element._id}"
                class="list-infor-btn bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 text-white rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">
                    <i class="far fa-trash-alt px-3 py-[13px]"></i></button>
              

                    
                    </div>
              </div>
            </div>
          </div>
            `;
        }).join("");
        return /*html*/ `
            ${inforTable}
            `;
    },
    async afterRender() {
        const btns = $$('.list-infor-btn');

        function deleteItem(element) {
            const id = element.dataset.id;
            element.addEventListener('click', async () => {
                const question = confirm('Are you want to delete?');
                if (question) {
                    let {
                        _id
                    } = JSON.parse(localStorage.getItem('setAuthen'));
                    await informationAPI.remove(id, _id);
                    reRender(ListInformationChild, '#table-informations');
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
    }

}