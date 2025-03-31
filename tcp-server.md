# Understanding TCP Protocol/Server by building one in Go

Ever wondered what exactly happens within the communication of a HTTP Server(*__"Hyper Text Transfer Protocol "__*) and HTTP Client, well in this article we would be building our own TCP Server and connecting to it. TCP(*__" Transmission Control Protocol "__*) is a Protocol on which HTTP is built on, we can as well say HTTP is a wrapper around TCP, as a matter of fact HTTP is a TCP-Based Protocol, When we send a request to a HTTP Server we expect a response.

Practically *__" A Server is just a program running in a loop waiting to accept a connection "__* and its on this statement we would build our TCP based server and design our protocol for a chat system (*__" we are actually building a TCP-Based chat protocol and server  "__*)

In this Article we are going to be making use __[Go Programming language](https://go.dev/)__


