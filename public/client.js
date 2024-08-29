const socket= io()

let name;
let textarea=document.querySelector('#text_area')
let message_area=document.querySelector('.message_area')

do {
    name=prompt('PLease enter your name');
} while (!name);

textarea.addEventListener('keyup', (e) => {

    if(e.key === 'Enter'){
        e.preventDefault();
        let message=e.target.value.trim();
        if(message){
            sendMessage(message);
            textarea.value='';
        }
    }
});

function sendMessage(message) {
    let msg={
        user:name,
        message:message.trim()
    }
    // append message
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()
    

    //send to server
    socket.emit('message',msg);
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');

    let className=type;
 
    mainDiv.classList.add(className,'message');

    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `;

    mainDiv.innerHTML = markup;

    message_area.appendChild(mainDiv);
}

//recieve message

socket.on('message',(msg) => {
    appendMessage(msg,'incoming_msg')     
    scrollToBottom()                                                                                                                                                                                                                                                                                                                 

})

function scrollToBottom() {
    message_area.scrollTop = message_area.scrollHeight
}




