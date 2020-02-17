//import file module called fs
const fs = require('fs');

// main method that control routes
const requestHandler = (req, res) => {

    const url = req.url;
    const method =req.method;
        
    //bloc of code passed initially at url localhost:3000
    if (url == '/') {
        //set the response headers which will be html
        res.setHeader('content-Type', 'text/html');
        // response write html file 
        res.write('<html>');
        res.write('<head><title>Form Page</title></head>');
        res.write('<body><main>');
        //form redirect to localhost:3000/message after clicking the submit form
        res.write('<Form method="Post" action="/message"> <textarea rows = "3" type="text" name="email"></textarea><br><button>Submit</button></Form>');
        res.write('</main></body>');
        res.write('</html>');
        // end() marks the end of the response
        res.end();
    }
    // block is passed after the form is submitted
    if (url == '/message' && method == 'POST') { //checks method declared in the form
        const body = [];
        //request from the sends the textarea data in form a stream
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        // return important
        return req.on('end', () => {
            //use Buffer to assemble the stream of data store in the list body
            const parsedData = Buffer.concat(body).toString();
            console.log(parsedData);
            const message = parsedData.split('=')[1];
            //write a file called message.txt
            fs.writeFile('message.txt', message, err => {
                //set the response statusCode to 302 which is used to redirect
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
}

//exports the method
exports.handler = requestHandler;