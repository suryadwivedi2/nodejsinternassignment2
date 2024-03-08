function redirectlogin(event) {
    event.preventDefault();
    window.location.href = '../LOGIN/Login.html'
}


function redirectsignup(event) {
    event.preventDefault();
    window.location.href = '../SIGNUP/Signup.html'
}


function mail(event) {
    event.preventDefault()
    window.location.href = "https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSBpDfrRJKpvJgBDcxTqCqjSKsDpKLFxDKbzQspkKdDJkgbTVWlbNdpKdnGNsLzScQNtCCpg"
}

window.addEventListener('DOMContentLoaded',()=>{
    let time=document.getElementById('time');
    time.textContent=new Date();
})