//Creates a new HTTP message to send to the backend
const xhr = new XMLHttpRequest();

//To set up the HTTP message
//Types of HTTP Requests: 1. GET, 2. POST, 3. PUT, 4. DELETE
// https://supersimplebackend.dev is the URL and /hello, /products/first is the URL path
xhr.open('GET', 'https://supersimplebackend.dev/products/first');
//To send the HTTP message, created above
xhr.send();


xhr.addEventListener('load', () =>{
    console.log(xhr.response);
});
