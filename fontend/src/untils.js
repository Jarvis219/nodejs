import jwt_decode from 'jwt-decode';
import {
    UserAPI
} from '../src/api/userAPI';
export const useParams = () => {
    const url = window.location.hash.toLocaleLowerCase();
    // console.log(url);
    const request = url.split('/');

    return {
        resource: request[1],
        id: request[2],
        action: request[3]
    }
}

export const $$ = selector => {
    let elements = document.querySelectorAll(selector);
    return elements.length == 1 ? elements[0] : [...elements]
}

export const reRender = async (component, position = " ") => {
    // console.log(component);
    if (position) {
        $$(position).innerHTML = await component.render();
        // console.log(0);
    } else {
        // console.log(1);
        $$('#main-content').innerHTML = await component.render();
    }
    await component.afterRender();
}


export const btnScoll = () => {
    var menu = document.getElementById('menu');
    var btnMenu = document.getElementById('btnMenu');
    btnMenu.addEventListener('click', function () {
        menu.classList.toggle('hidden');
    })
    var heading = document.getElementById('heading');
    var banner = document.getElementById('banner');
    window.addEventListener('scroll', function () {
        heading.style.opacity = 100;
        banner.style.marginTop = '96px';
        banner.style.transition = 'all 1s';
        setTimeout(function () {
            heading.style.opacity = 0;
            heading.style.transition = 'all 1s';
            banner.style.marginTop = 0;
        }, 3000)
    });
    heading.addEventListener('mousemove', function () {
        heading.style.opacity = 100;
        banner.style.marginTop = 96;
    });
}

export const prices = (x) => {
    return x = x.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'USD'
    });
}

// set data user
export const setAuthen = ({
    user,
    token
}) => {
    // console.log(token, user);
    const users = jwt_decode(token);
    // console.log(users);
    if (typeof window !== 'undefined') {
        return localStorage.setItem('setAuthen', JSON.stringify(users, user))
    }
}

// use user
export const isSetAuthen = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('user')) {
        // console.log(localStorage.getItem('user'));
        return JSON.parse(localStorage.getItem('user'));
    } else {
        return false;
    }
}

// out user
export const logout = async () => {
    if (localStorage.getItem('user')) {
        // Header.render();
        await UserAPI.signout();
        localStorage.removeItem('setAuthen');
        localStorage.removeItem('emailToken');
        localStorage.removeItem('token');
        return localStorage.removeItem('user');
    }
}
export const checkLogout = () => {
    if ($$('#log-out') != undefined) {
        $$('#log-out').onclick = () => {
            logout()
            window.location.hash = `/signin`;
        };
    }
}

export const search = () => {
    $$('#demo-search-lg').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = $$('[name="search"]').value
        window.location.hash = `/productcate/${data}`;
    })
}

export const showCartNotUser = () => {
    let carts = JSON.parse(localStorage.getItem('dataCart')); // chuyển từ string => object
    return carts

}