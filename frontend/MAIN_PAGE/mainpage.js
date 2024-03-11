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
        const date = document.getElementById('transdate').value;
        const userid = decodedtoken.id;
        console.log(date);

        const trans_details = {
            amount: amount,
            category: category,
            transaction_date: date,
            userid: userid
        }
        const response = await axios.post('http://localhost:5000/transaction/add', trans_details, { headers: { 'Authorization': token } });
        if (response.status == 200) {
            console.log(response.data.transaction)
            addscreenoutput(response.data.transaction)
            showdetails(response.data.totalincome, response.data.totalexpense, response.data.savings)
        } else {
            throw new Error('Something went wrong')
        }
    } catch (error) {
        console.log(error)
    }
}

//Getting all the transaction when dom loads
window.addEventListener('DOMContentLoaded', async () => {
    const h1 = document.getElementById('user');
    h1.innerText = `Hello ${decodedtoken.name} welcome to the Piggy Bank app`;
    try {
        const response = await axios.get('http://localhost:5000/transaction/get', { headers: { 'Authorization': token } })
        if (response.status = 200) {
            showscreenoutput(response.data.transactions)
            showdetails(response.data.totalincome, response.data.totalexpense, response.data.savings)
        } else {
            throw new Error('Something went wrong')
        }
    } catch (err) {
        console.log(err)
    }

})

//function to show output when dom content loads
function showscreenoutput(data) {
    const ul = document.getElementById('ul');
    for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        const dltbtn = document.createElement('input');
        dltbtn.class = "btn-check";
        dltbtn.type = "button";
        dltbtn.value = "Delete";
        li.innerText = data[i].Amount + "-  " + data[i].Category + "-  " + data[i].Date.split("T")[0];
        li.appendChild(dltbtn);
        ul.appendChild(li);
        dltbtn.onclick = async () => {
            const response = await axios.delete(`http://localhost:5000/transaction/delete?id=${data[i]._id}&category=${data[i].Category}&amount=${data[i].Amount}`, { headers: { 'Authorization': token } })
            try {
                if (response.status == 200) {
                    console.log("deleted");
                    ul.removeChild(li);
                    showdetails(response.data.totalincome, response.data.totalexpense, response.data.savings)
                } else {
                    throw new Error('Something Went Wrong')
                }
            } catch (err) {
                cosnoel.log(err)
            }
        }
    }
}


//function to show output when we add new transaction ffrom the main screem page
function addscreenoutput(data) {
    const ul = document.getElementById('ul');
    const li = document.createElement('li');
    const dltbtn = document.createElement('input');
    dltbtn.class = "btn-check";
    dltbtn.type = "button";
    dltbtn.value = "Delete";
    li.innerText = data.Amount + "-   " + data.Category + "-   " + data.Date.split("T")[0];
    li.appendChild(dltbtn);
    ul.appendChild(li);
    dltbtn.onclick = async () => {
        const response = await axios.delete(`http://localhost:5000/transaction/delete?id=${data._id}&category=${data.Category}&amount=${data.Amount}`, { headers: { 'Authorization': token } })
        if (response.status == 200) {
            console.log("deleted");
            showdetails(response.data.totalincome, response.data.totalexpense, response.data.savings)
            ul.removeChild(li);
        } else {
            console.log('Something Went Wrong')
        }

    }

}

//function to show user details of saving expense and income dynamically
function showdetails(income, expense, saving) {
    const div = document.getElementById('summary');
    div.innerHTML = `<h6>TotalIncome=>${income}</h6><br><h6>TotalExpense=>${expense}</h6><br><h6>Savings=>${saving}</h6>`
}