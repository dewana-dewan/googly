const electron = require('electron')
const {app, BrowserWindow} = electron

var http = require('http');
var https = require('http');
var ElectronProxyAgent = require('electron-proxy-agent');
var session = require('session').defaultSession;
 
// use ElectronProxyAgent as http and https globalAgents 
http.globalAgent = https.globalAgent = new ElectronProxyAgent(session);

app.on('ready', () => {
	let win = new BrowserWindow({width:800, height:600})
	win.loadURL(`http://localhost:8080/login`)
})
