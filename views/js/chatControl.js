var chatActiveRoom = "general";
var chatRefreshTimeMs = 30000;

var refreshChat = function () {
  fetch('./chat/' + chatActiveRoom)
    .then(function (response) {
      return response.json();
    })
    .then(function (chatList) {
      console.log(JSON.stringify(chatList)); // TODO remove
      var chatHTML = "";
      chatList.forEach(function (element) {
        console.dir(element);
        chatHTML += `<div class="
    individual_chat_message"><p><span class="
    author">${element.name}</span>${element.message}</p></div>`;
      })
      document.getElementById("chat_messages").innerHTML = chatHTML;
      setChatScrollToBottom();
    });
}

var chatPostHandler = function () {
  var name = document.getElementById("name_input").value;
  var message = document.getElementById("message_input").value;
  document.getElementById("message_input").value = "";
  fetch('/chat/' + chatActiveRoom, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": name,
        "message": message
      })
    })
    .then((response) => response.text())
    .then((responseText) => {
      console.log(responseText);
      refreshChat();
    })
    .catch((error) => {
      console.error(error);
    });
}

var periodicallyRefreshChat = function () {
  refreshChat();
  setInterval(refreshChat, chatRefreshTimeMs);
}

var setChatScrollToBottom = function () {
  var element = document.getElementById("chat_messages");
  element.scrollTop = element.scrollHeight;
}

var countMessageCharLength = function () {
  var charCounter = document.getElementById("chat_char_counter");
  var messageInput = document.getElementById("message_input");
  messageInput.onkeyup = function () {
    charCounter.innerHTML = messageInput.value.length + "/400";
  }
}

var changeChatRoom = function (newRoomGame, newRoomName) {
  chatActiveRoom = newRoomGame;
  document.getElementById("chat_room_label").innerHTML = `
          Chat - ${newRoomName} &#x25BE `;
  refreshChat();
}

if (window.addEventListener) {
  window.addEventListener('load', periodicallyRefreshChat);
  window.addEventListener('load', countMessageCharLength);
} else {
  window.attachEvent('onload', periodicallyRefreshChat);
  window.attachEvent('onload', countMessageCharLength);
}