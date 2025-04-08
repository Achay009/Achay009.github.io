# Understanding TCP Protocol/Server by building one in Go

Ever wondered what happens within communication between a HTTP(*__"A TCP-Based Protocol on the application layer of the [TCP/IP Model](https://www.splunk.com/en_us/blog/learn/tcp-ip.html) "__*) Server and Client, well in this article we would be building our own TCP Server and connecting to it. TCP(*__" Transmission Control Protocol "__*) is a Protocol on which HTTP is built on, we can as well say HTTP is a wrapper around TCP, as a matter of fact HTTP is a TCP-Based Protocol, When we send a request to a HTTP Server we expect a response.

Practically *__" A Server is just a program running in a loop waiting to accept a connection "__* and its on this statement we would build our TCP based server and design our protocol for a chat system (*__" we are actually building a TCP-Based chat protocol and server  "__*)

In this Article we are going to be making use __[Go Programming language](https://go.dev/)__ to build a TCP server and a simple TCP-Based chat protocol


# Design
First off we look at the protoocl which would dictate how our TCP Server is going to accept and process connections. we are buildiing a text-based protocol, meaning that the data that travels is not binary, but just ASCII text. The advantage of text-based protocols is that a client can practically open a TCP connection to a server that implements the protocol and talk to it by sending ASCII characters.

Clients can connect to and communicate with a SLCK server through a TCP socket, using a set of commands and conventions that we will define next.

# Protocol conventions
for our protocol we follow some simple conventions:

* It has TLV (type-length-value) format
* It has a control line & a content line
* It uses carriage return (|r|n) as delimiter
* It contains a fixed list of subjects (tags) representing actions
 And as already mentioned, it uses ASCII encoded text on the wire
Or, if we put all of these conventions in combination, a message would look like:

Example of HTTP/1.1 protocol

        GET /index.html HTTP/1.1
        Host: www.example.com
        User-Agent: Mozilla/5.0
        Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
        Accept-Language: en-US,en;q=0.5
        Accept-Encoding: gzip, deflate
        Connection: keep-alive

Example of our protocol

        MSG @user 11|r|nHello World

explanation 


Just like HTTP has methods such as GET and POST, our protocol has just 2 methods which are REG and MSG
*__payment_event_table__*
| method | Desciption |
| ------ | ----------- |
| *__REG__*   | Register a User to the Server|
| *__MSG__*  | Send messages to a another user |


we are going to be making use of the capabilities of __[Go Channels](https://gobyexample.com/channels)__ to communicate between the client connection and the server




