// document.addEventListener("DOMContentLoaded", function() {
//     const template = Handlebars.compile(document.getElementById('your-template-id').innerHTML);
//     const data = {
//         links: [
//             { text: 'Go to Page 1', url: 'http://example.com/page1' },
//             { text: 'Go to Page 2', url: 'http://example.com/page2' },
//             { text: 'Go to Page 3', url: 'http://example.com/page3' }
//         ]
//     };
//     document.getElementById('output').innerHTML = template(data);
// });



// const template = Handlebars.compile(document.getElementById('your-template-id').innerHTML);
// const data = {
//     destinationUrl: 'http://example.com/other-page'
// };
// document.getElementById('output').innerHTML = template(data);

document.addEventListener('DOMContentLoaded', function() {
    // Example of adding a click event listener to the links
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = this.href;
        });
    });

    console.log('JavaScript file loaded');
});