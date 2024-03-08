//const token = sessionStorage.getItem('token');

function logout(event) {
    event.preventDefault();
    sessionStorage.removeItem('token');
    window.location.href='../LOGIN/login.html';
}

window.addEventListener('DOMContentLoaded', () => {
    const user = sessionStorage.getItem('token');
    //console.log(user);
    if (user == null) {
        window.location.href = '../Authentication_Failed/Failed.html'
    }
})