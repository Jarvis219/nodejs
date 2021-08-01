import Header from "../components/header";
import Footer from "../components/footer";
import {
    $$,
    prices,
    reRender,
    checkLogout,
    search,
    isSetAuthen
} from "../untils";
import {
    ordersAPI
} from "../api/ordersAPI";
const Order = {
    async render() {
        const {
            data: {
                data
            }
        } = await ordersAPI.list();
        // console.log(data);
        let arrOrder = []
        const orders = data.forEach(element => {
            console.log(element);
            if (element.email == isSetAuthen().email) {
                element.product.forEach(ele => {
                    arrOrder.push(ele);
                })
            }
        });
        // console.log(arrOrder);
        const totalOrder = arrOrder.map(element => {
            // console.log(element);
            return /*html*/ `
                <div class="bg-gray-100">
                <hr class="my-4">
                <div class="grid grid-cols-12 mx-8"> 
                    <div class="col-span-2">
                        <img width="100" height="100" src="${element.image}">
                    </div>
                    <div class="col-span-6">
                        <h4>${element.name}</h4>
                            <div>
                               (Size: ${element.size} | Amount: ${element.amount})
                            </div>
                    </div>
                    <div class="col-span-4 text-right my-4">
                        <span class="line-through">${prices(Number(element.sale))}</span>
                        <span>${prices(Number(element.price))}</span>
                    </div>
                </div>
                <hr class="my-4">
                <div class="flex justify-between mx-8 my-4">
                    <div class="my-2 uppercase">
                       
                    </div>
                    <div>
                        <div class="text-right mb-2 text-xl uppercase">
                            <span >total: <span class="text-red-400">${prices(element.totalMoney)} </span></span>
                        </div>
                        <div class="flex">
                            <div >
                            <div  class="flex justify-center">
                            <div class="lg:mt-15 z-10">
                            <a href="/#/contact"><button type="submit"
                                    class="btn btn-primary pull-left ml-4 uppercase">contact</button></a>
                            </div>
                            </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
                `;
        }).join("");
        return /*html */ `
        ${await Header.render()}
        <div class="mb-12">
        <main class="container mx-auto lg:px-16 lg:pt-24">
            <div>
                <div class="mt-8 ">
                    <a href="./index.html"><span><i class="fas fa-home"></i></span>
                        <span style="font-family: FontAwesome;">Home <span class="text-gray-500 text-sm">></span> <span>order</span>
                        </i></a>
                </div>
            </div>
            <div>
        <div>
            <H2 class="uppercase text-center font-semibold text-xl">order</H2>
            <div class="h-[500px] overflow-y-scroll">
            ${totalOrder}
            </div>
           

        </div>
    </div>
        </main>
    </div>
        ${Footer.render()}
        `;
    },
    async afterRender() {
        checkLogout();
        search();

    }
}
export default Order;