const token = sessionStorage.getItem('token');


//removing token from sessionstorge when user clicks logout button
function logout(event) {
    event.preventDefault();
    sessionStorage.removeItem('token');
    window.location.href = '../LOGIN/login.html';
}


//decoding jwttoken
const decodedtoken = parseJwt(token);

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

//Adding Transaction to the database
async function getformvalue(event) {
    try {
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('trans').value;
        const userid = decodedtoken.id;

        const trans_details = {
            amount: amount,
            category: category,
            userid: userid
        }
        const response = await axios.post('http://localhost:5000/transaction/add', trans_details);
        if (response.status == 200) {
            console.log(trans_details)
            showscreenoutput(trans_details)
        } else {
            throw new Error('Something went wrong')
        }
    } catch (error) {
        console.log(error)
    }
}


window.addEventListener('DOMContentLoaded', async () => {
    const h1 = document.getElementById('user');
    h1.innerText = `Hello ${decodedtoken.name} welcome to the Piggy Bank app`;
    try {
        const response = await axios.get('http://localhost:5000/transaction/get', { headers: { 'Authorization': token } })
        if (response.status = 200) {
            showscreenoutput(response.data.transactions)
        } else {
            throw new Error('Something went wrong')
        }
    } catch (err) {
        console.log(err)
    }

})


function showscreenoutput(data) {
    const ul = document.getElementById('ul');
    for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        const dltbtn = document.createElement('input');
        dltbtn.class = "btn-check";
        dltbtn.type = "button";
        dltbtn.value = "Delete";
        li.innerText = data[i].Amount + "-" + data[i].Category;
        li.appendChild(dltbtn);
        ul.appendChild(li);
        dltbtn.onclick = () => {
            axios.delete(`http://localhost:5000/transaction/delete/${data[i]._id}`, { headers: { 'Authorization': token } })
                .then((result) => {
                    console.log("deleted");
                    ul.removeChild(li);
                }).catch(err => console.log(err));
        }
    }
}