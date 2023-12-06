const numbers = ["zero","one","two","three","four","five","six","seven","eight","nine"]

function handleNumberClick(value){
    
    fetch('/process_button',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'input_data=' + encodeURIComponent(value)
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
    })
    .then(function(data) {
        var redirectUrl = data.redirect_url;

        window.location.href = redirectUrl;
    })
    .catch(function(error) {
        console.error(error);
    }) 

}