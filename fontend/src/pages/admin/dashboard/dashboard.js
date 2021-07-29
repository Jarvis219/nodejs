import NavBarAdmin from "../../../components/navbaradmin";
import {
  $$,
  prices
} from "../../../untils";
import {
  UserAPI
} from "../../../api/userAPI";
import {
  ordersAPI
} from "../../../api/ordersAPI";
import {
  contactAPI
} from "../../../api/contactAPI";
import {
  productAPI
} from "../../../api/productAPI";
import {
  postAPI
} from "../../../api/postAPI";
const Dashboard = {
  async render() {
    const {
      data: users
    } = await UserAPI.listDashboard();
    const {
      data: contact
    } = await contactAPI.list();
    const {
      data: order
    } = await ordersAPI.list()
    const {
      data: products
    } = await productAPI.list()
    const {
      data: post
    } = await postAPI.list()
    let total = 0;
    // console.log(order);
    order.data.forEach(element => {
      // console.log(element.sumMoney);
      if (element.status == "delivered") {
        // console.log(element);
        total += Number(element.sumMoney);
      }
    });
    // console.log(total);
    return /*html*/ `
            ${NavBarAdmin.render()}
            <div class="main-panel">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
              <div class="container-fluid">
                <div class="navbar-wrapper">
                  <a class="navbar-brand" href="javascript:;">Dashboard</a>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="navbar-toggler-icon icon-bar"></span>
                  <span class="navbar-toggler-icon icon-bar"></span>
                  <span class="navbar-toggler-icon icon-bar"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end">
                  <form class="navbar-form">
                    <div class="input-group no-border">
                      <input type="text" value="" class="form-control" placeholder="Search...">
                      <button type="submit" class="btn btn-white btn-round btn-just-icon">
                        <i class="material-icons">search</i>
                        <div class="ripple-container"></div>
                      </button>
                    </div>
                  </form>
                  <ul class="navbar-nav">
      
                    <li class="nav-item dropdown">
                      <a class="nav-link" href="javascript:;" id="navbarDropdownProfile" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="material-icons">person</i>
                        <p class="d-lg-none d-md-block">
                          Account
                        </p>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                        <a class="dropdown-item" href="#">Profile</a>
                        <a class="dropdown-item" href="#">Settings</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Log out</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <!-- End Navbar -->
            <div class="content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card card-stats">
                      <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                        <i class="far fa-user"></i>
                        </div>
                        <p class="card-category uppercase"> Accounts</p>
                        <h3 class="card-title">${users.user.length}
                          <small>User</small>
                        </h3>
                      </div>
                      <div class="card-footer">
                        
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card card-stats">
                      <div class="card-header card-header-success card-header-icon">
                        <div class="card-icon">
                        <i class="fas fa-hand-holding-usd"></i>
                        </div>
                        <p class="card-category uppercase">Revenue</p>
                        <h3 class="card-title">${prices(total)}</h3>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                         
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card card-stats">
                      <div class="card-header card-header-danger card-header-icon">
                        <div class="card-icon">
                        <i class="fab fa-jedi-order"></i>
                        </div>
                        <p class="card-category uppercase">order</p>
                        <h3 class="card-title">${order.data.length}</h3>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                         
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div  >
                <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-6">
                  <div class="card card-stats">
                    <div class="card-header card-header-info card-header-icon">
                      <div class="card-icon">
                        <i class="fa fa-twitter"></i>
                      </div>
                      <p class="card-category uppercase">Contact</p>
                      <h3 class="card-title">${contact.length}</h3>
                    </div>
                    <div class="card-footer">
                      <div class="stats">
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6">
                  <div class="card card-stats">
                    <div class="card-header card-header-info card-header-icon">
                      <div class="card-icon">
                      <i class="fab fa-product-hunt"></i>
                      </div>
                      <p class="card-category uppercase">Product</p>
                      <h3 class="card-title">${products.product.length}</h3>
                    </div>
                    <div class="card-footer">
                      <div class="stats">
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6">
                  <div class="card card-stats">
                    <div class="card-header card-header-info card-header-icon">
                      <div class="card-icon">
                      <i class="fas fa-blog"></i>
                      </div>
                      <p class="card-category uppercase">Post</p>
                      <h3 class="card-title">${post.post.length}</h3>
                    </div>
                    <div class="card-footer">
                      <div class="stats">
                        
                      </div>
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
        </div>
        <!--   Core JS Files   -->
        `;
  },
  async afterRender() {
    $$('.nav li')[0].classList.add("active");




  }




}
export default Dashboard;