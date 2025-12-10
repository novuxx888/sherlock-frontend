let socket = null;

export function connectWebSocket() {
  socket = new WebSocket("ws://YOUR_PC_IP:8080");

  socket.onopen = () => {
    console.log("React connected to Node");
    socket.send("hello-from-react");
  };

  socket.onmessage = (event) => {
    console.log("Pi → React:", event.data);
  };

  socket.onclose = () => {
    console.log("WS closed, reconnecting...");
    setTimeout(connectWebSocket, 2000);
  };

  return socket;
}

export function getSocket() {
  return socket;
}
