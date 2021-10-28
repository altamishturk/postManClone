console.log('this is postman clone');


// show and hide content type and thier fields according to request type
document.querySelector('#contentTypeBox').style.display = 'none';
document.querySelector('#parametersBox').style.display = 'none';
document.querySelector('#requestJsonBox').style.display = 'none';
const requestTypeElems = document.querySelectorAll('input[name="requestType"]');

requestTypeElems.forEach(elem => {
    elem.addEventListener('click', (e) => {
        if (e.target.value == "GET") {
            document.querySelector('#contentTypeBox').style.display = 'none';
            document.querySelector('#parametersBox').style.display = 'none';
            document.querySelector('#requestJsonBox').style.display = 'none';

        }
        else {
            document.querySelector('#contentTypeBox').style.display = 'block';
            document.querySelector('#parametersBox').style.display = 'block';
            document.querySelector('#requestJsonBox').style.display = 'block';
            // hiding  coustom paraneter 
            const parametersBox = document.querySelector('#parametersBox');
            parametersBox.style.display = 'none';
        }
        // console.log(e.target.value);
    })
})




// hide and show parameter box and json box according to content type check box
const selectedContentType = document.querySelectorAll('input[name="contentType"]');

selectedContentType.forEach((elem) => {
    elem.addEventListener('click', (e) => {

        const requestJsonBox = document.querySelector('#requestJsonBox');
        if (e.target.value == 'json') {
            requestJsonBox.style.display = 'block';
            parametersBox.style.display = 'none';
        }
        else {
            requestJsonBox.style.display = 'none';
            parametersBox.style.display = 'block';
        }

    });
})


// adding event listner to the plus button for mking copes of parameters

const addParam = document.querySelector('#addParam');
let paramNo = 2;
addParam.addEventListener('click', () => {


    let paremItem = `<div class="form-row">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${paramNo}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control parameterKey" id="parameterKey${paramNo}" placeholder="Enter Parameter ${paramNo} Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control parameterValue" id="parameterValue${paramNo}" placeholder="Enter Parameter ${paramNo} Value">
                        </div>
                        <button class="btn btn-primary removeParam">-</button>
                    </div>`;
    const params = document.querySelector('#params');
    params.innerHTML += paremItem;
    paramNo += 1;
    console.log(paramNo) //this is for debugging


    // deleting parameters by clicking - button

    const removeParam = document.querySelectorAll('.removeParam');

    removeParam.forEach((elem) => {
        elem.addEventListener('click', (e) => {

            e.target.parentElement.remove();

        });
    });
});





// adding elent listner to submit button 
const submit = document.querySelector('#submit');

submit.addEventListener('click', () => {

    // getting url
    const url = document.querySelector('#url').value;

    // getting request type 
    const requestType = document.querySelector('input[name="requestType"]:checked').value;

    // getting content type 
    const contentType = document.querySelector('input[name="contentType"]:checked').value;

    // getting parameter or json values
    let contentTypeValue = {};
    if (contentType == 'params') {
        const parameterKey = document.querySelectorAll('.parameterKey');
        const parameterValue = document.querySelectorAll('.parameterValue');
        for (let i = 0; i < parameterKey.length; i++) {
            contentTypeValue[parameterKey[i].value] = parameterValue[i].value;
        }
        contentTypeValue = JSON.stringify(contentTypeValue);
    }
    else {
        contentTypeValue = document.querySelector('#requestJsonText').value;
    }


    // making the get request
    if (requestType == 'GET') {
        fetch(url,
            {
                method: 'GET'
            }).then(res => res.text())
            .then(data => {
                document.querySelector('#responsePrism').innerHTML = data;
                Prism.highlightAll();
            });
    }

    // making the post request 
    else if (requestType == 'POST') {
        fetch(url,
            {
                method: "POST",
                body: contentTypeValue,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(res => res.text())
            .then(data => {
                document.querySelector('#responsePrism').innerHTML = data;
                Prism.highlightAll();
            });
    }

    // console.log(`url is = ${url}
    // request type is = ${requestType}
    // contenttype is = ${contentType}
    // content value is = ${contentTypeValue}`);


})
































































