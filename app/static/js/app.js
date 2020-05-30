"use strict";

const socket = io();
let connected = false;

function onSocketConnect() {
  connected = true;
  document.getElementById('status-connected').style.display = 'inline-block';
  document.getElementById('status-disconnected').style.display = 'none';
  document.getElementById('disconnect-reason').visibility = 'hidden';
  document.getElementById("virtual-console").disabled = false;
}

function onSocketDisconnect(reason) {
  connected = false;
  document.getElementById('status-connected').style.display = 'none';
  document.getElementById('status-disconnected').style.display = 'inline-block';
  document.getElementById('disconnect-reason').visibility = 'visible';
  document.getElementById('disconnect-reason').innerText = 'Error: ' + reason;
  document.getElementById("virtual-console").disabled = true;
}

function onKeyDown(evt) {
  evt.preventDefault();
  if (!connected) {
    return;
  }
  
  socket.emit('keystroke', {
    altKey: evt.altKey,
    shiftKey: evt.shiftKey,
    ctrlKey: evt.ctrlKey,
    key: evt.key,
    keyCode: evt.keyCode,
  });
}

document.getElementById("virtual-console").addEventListener("keydown", onKeyDown);
socket.on('connect', onSocketConnect);
socket.on('disconnect', onSocketDisconnect);