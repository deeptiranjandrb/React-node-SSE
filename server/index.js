const express = require('express');
const app = express();


const cors = require('cors');
const PORT = 3000;

app.use(cors({
    origin: "http://localhost:5173"
}
));

app.get("/events", (req, res) => {
    res.writeHead(200,{
        "Content-Type": 'text/event-stream',
        "Cache-Control": "no-cache",
        "connection": 'keep-alive'

    });
    const longText = "A text expander is a software program that can be used to expand abbreviations and snippets of text into longer phrases. This can be useful for generating long text quickly. There are many text expanders available for different operating systems.";
    const words = longText.split(" ");
    let index = 0;
    const sendWords = () => {
        if(index < words.length){
            res.write(`data: ${words[index]}\n\n`);
            index++;
        }else {
            clearInterval(intervalId);
        }

    }
    const intervalId = setInterval(sendWords, 500);
    req.on('close', () => {
        clearInterval(intervalId);
    })
});
app.listen(PORT,() => {
    console.log('listening on port ' + PORT);
});