const NavBarAdmin = {
    render() {
        return /*html*/ `
        <div class="sidebar" data-color="purple" data-background-color="white" >
        <!--
    Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

    Tip 2: you can also add an image using data-image tag
-->
        <div class="logo"><a href="#/" class="simple-text logo-normal">
                <img src="../../images/logo.png" alt="" class="mx-auto">
            </a></div>
        <div class="sidebar-wrapper">
            <ul class="nav">
                <li class="nav-item ">
                    <a class="nav-link" href="#/dashboard">
                    <i class="fas fa-chart-line "></i>
                        <p class="uppercase">dashboard</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/listinformation">
                        <i class="material-icons">dashboard</i>
                        <p>INFORMATION</p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="#/listusers"> 
                        <i class="material-icons">person</i>
                        <p>USER</p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="/#/listproducts">
                        <i class="material-icons">content_paste</i>
                        <p>PRODUCT</p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="#/listcategory">
                        <i class="material-icons">library_books</i>
                        <p>CATEGORY</p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="/#/listcarts">
                        <i class="fas fa-shopping-cart"></i>
                        <p>ORDER</p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="#/listcontact">
                        <i class="fas fa-id-card-alt"></i>
                        <p>CONTACT</p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="#/listpost">
                        <i class="far fa-newspaper"></i>
                        <p>BLOG</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
        `;
    }
}
export default NavBarAdmin;