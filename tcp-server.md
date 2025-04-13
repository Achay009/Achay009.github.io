# Understanding TCP Protocol/Server by building one in Go

Ever wondered what happens within communication between a HTTP(*__"A TCP-Based Protocol on the application layer of the [TCP/IP Model](https://www.splunk.com/en_us/blog/learn/tcp-ip.html) "__*) Server and Client, well in this article we would be building our own TCP Server and connecting to it. TCP(*__" Transmission Control Protocol "__*) is a Protocol on which HTTP is built on, we can as well say HTTP is a wrapper around TCP, as a matter of fact HTTP is a TCP-Based Protocol, When we send a request to a HTTP Server we expect a response.

Practically *__" A Server is just a program running in a loop waiting to accept a connection "__* and its on this statement we would build our TCP based server and design our protocol for a chat system (*__" we are actually building a TCP-Based chat protocol and server  "__*)

In this Article we are going to be making use __[Go Programming language](https://go.dev/)__ to build a TCP server and a simple TCP-Based chat protocol


## Design
First off we look at the protoocl which would dictate how our TCP Server is going to accept and process connections. we are buildiing a text-based protocol, meaning that the data that travels is not binary, but just ASCII text. The advantage of text-based protocols is that a client can practically open a TCP connection to a server that implements the protocol and talk to it by sending ASCII characters.

Clients can connect to and communicate with a SLCK server through a TCP socket, using a set of commands and conventions that we will define next.

## Protocol conventions
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

We are going to be making use of only 3 files `main.go`   `client.go` and `server.go`

There would be comments in the code to understand better what exactly is going on

our protocol would have a data structure looking like this 

In `main.go`
``` go
package main

import (
	"log"
	"net"
)

type METHOD int

// Protocol methods enum
const (
	REG METHOD = iota // method to register client
	MSG  // method to send message 
)

// protocols
//just the same as =>  MSG @user 11|r|nHello World
type protocol struct {
	METHOD    METHOD // methods we get from the conn eg. MSG
	Recepient string // client we are sending message to eg. @user
	Sender    string // currrent client connection to server
	Body      []byte // message after eg. Hello World
}
```

next we create the server and prepare to receive connection

`main.go`
``` go
func main() {
    
	ln, err := net.Listen("tcp", ":8081") // Open TCP connection on server
	if err != nil {
		log.Printf("%v", err)
	}

	serverHub := NewServerHub() // create new server struct

	// we run this go routine to catch data from pipes/channels sent to the server
	// like connection between server and client
	// just waiting for anything to enter its channels
	go serverHub.run()

	log.Print("Listening for connection on port :8081")

	//server listening in loop
	for {
		conn, err := ln.Accept() // Accept client connection on server
		if err != nil {
			log.Printf("%v", err)
		}

		// log every new connection to see each connection with telnet or another tcp connection
		// to the server
        // on every cliet connection you would be able to see differnent client connection
		log.Printf("New Connection Accepted : [ %v ] on port :8081", conn.RemoteAddr().String())

		// read every connection to the server as a client
		// user using this connection hasnt ben registered yet just the connection
		c := NewClient(
			conn,
			serverHub.protocol, // send protocol to client connection
			serverHub.registrations, // send server channel to new client to communicate with server to register clients
			serverHub.deregistrations, // send server channel to new client to communicate with server to deregister clients
			"",
		)

		/// spin a go routine on every connection to not cause a blocking server
        // this is to keep reading the data from every client connection on or
        // this enable client connection open to the server program
		go c.readLoop()
	}

}
```

And that is all we need for the `main.go` file, next up we go to look at the next file  
we define the `client` structure as seen in the code below
``` go
    package main

    import (
        "bufio"
        "bytes"
        "fmt"
        "io"
        "log"
        "net"
        "strconv"
    )

type client struct {
	conn     net.Conn
	outbound chan<- protocol
	// both register and deregister channels are from the server registration and deregistration channels respectively
	// it is a way for the clients registered to communicate with the server on whether they are registered or unregistered
	register   chan<- *client // channel through which a client registers itself
	deregister chan<- *client // channel through which a client unregisters itself
	username   string
}

// to create a new client struct
    func NewClient(conn net.Conn, outbound chan protocol, register chan *client, deregister chan *client, username string) *client {
        return &client{
            conn:       conn,
            outbound:   outbound, // outbound protocol for communication with the server
            register:   register,
            deregister: deregister,
            username:   username,
        }
    }
```


In `client.go` we read the data in a `bytes` buffer hitting the server via the client connection created in function`readLoop` then we parse the request protocol with its data sent to determine what  to do with the data sent in the function `handle` the connection, here we determine the method of the request protocol sent to the server if its a`REG` or a `MSG` this are in functions `reg` and `msg` respectively and we send the requirements for the logic(METHOD) back to the server to handle, lastly we have an `err` function to handle any error we send back to the client connection

in `client.go`
``` go
    // keep reading from the buffer sent in the client connection
    func (c *client) readLoop() error {
        for {
            msg, err := bufio.NewReader(c.conn).ReadBytes('\n')

            // log.Printf("This is the data first parsed : %v", msg)
            // check if nothing was sent in the protocol
            if err == io.EOF {
                c.deregister <- c // send client to the server deregistration channel
                return nil
            }

            // check if a error was in reading the data sent
            if err != nil {
                return err
            }

            c.handle(msg)
        }

    }

    // to handle data sent from readLoop function
    func (c *client) handle(data []byte) error {
        method := bytes.ToUpper(bytes.TrimSpace(bytes.Split(data, []byte(" "))[0])) // get the method REG MSG
        arguments := bytes.TrimSpace(bytes.TrimPrefix(data, method))                // trim out remaining body

        // log.Printf("This is meethod in handle : %v", string(method))
        switch string(method) {
        case "REG":
            if err := c.reg(arguments); err != nil {
                c.err(err)
            }
        case "MSG":
            if err := c.msg(arguments); err != nil {
                c.err(err)
            }
        default:
            c.err(fmt.Errorf("unknown method %s", method))
        }

        return nil
    }


    // to Handle REG request connection
    func (c *client) reg(data []byte) error {
        userData := bytes.TrimSpace(data)

        // log.Printf("this is in reg  %v", string(userData))

        if userData[0] != '@' {
            return fmt.Errorf("username must begin with @")
        }

        if len(userData) == 0 {
            return fmt.Errorf("username cannot be blank")
        }

        c.username = string(userData)
        c.register <- c

        return nil
    }


    // to handle MSG request
    // MSG @jane 11|r|nHello World
    // MSG @john 11\r\nHello World
    // MSG @general 11\r\nHello World
    func (c *client) msg(data []byte) error {
        // use delimiter to seperate number of data sent fform the data
        DELIMITER := []byte("|r|n")
        args := bytes.TrimSpace(data)

        if args[0] != '@' {
            return fmt.Errorf("recipient user ('@user')")
        }

        // get the recepient
        recepient := bytes.Split(data, []byte(" "))[0]
        if len(recepient) == 0 {
            return fmt.Errorf("recepient must have a name")
        }

        // trim out the recepient from the remaining data
        args = bytes.TrimSpace(bytes.TrimPrefix(args, recepient))

        // get the length
        strLength := bytes.Split(args, DELIMITER)[0]
        length, err := strconv.Atoi(string(strLength))

        if err != nil {
            log.Print(err.Error())
            return fmt.Errorf("body length must be present")
        }
        if length == 0 {
            return fmt.Errorf("body length must be at least 1")
        }

        padding := len(strLength) + len(DELIMITER) // Size of the body length + the delimiter
        body := args[padding : padding+length]

        // create a new data with the protocol and send to the server connected with the channel "outboubd"
        // server recevies info in this channel and sends to the right recepient
        c.outbound <- protocol{
            Recepient: string(recepient),
            Sender:    c.username,
            Body:      body,
            METHOD:    MSG,
        }

        return nil
    }

    // to handle any error we'd be sending back to the client
    func (c *client) err(err error) {
	    c.conn.Write([]byte("Chat protocol client Error :  " + err.Error()))
    }
```
And that is all we need for the `client.go` file, we can read the data buffer sent and we can handle different methods our protocol is prepared for , up next up we go to look at the next file  `server.go`


we define the `server` structure as seen in the code below

``` go
    package main

    type serverHub struct {
        clients         map[string]*client // map to store clients connected to the server
        protocol        chan protocol // protocol channel request sent to the server
        deregistrations chan *client // channel to listen for data sent from the client to register on the server
        registrations   chan *client // channel to listen for data sent from the client to deregister from the server
    }

    // creation of a new server struct 
    func NewServerHub() *serverHub {
        return &serverHub{
            clients:         make(map[string]*client),
            protocol:        make(chan protocol),
            deregistrations: make(chan *client),
            registrations:   make(chan *client),
        }
    }
```

In `server.go` we run a loop in the `run` function to listen for data sent to the channels on the __server__ struct these channels include __protocol__ channel __deregistrations__ channel and the __registrations__ channel , when data is sent to data sent to any of these channel are handled in the `switch` statement which performs the conditioned required on any data sent to any of the above channels 

in `server.go`

``` go
    func (h *serverHub) run() {

	for {
		select {
		case client := <-h.registrations:
			h.register(client)
		case client := <-h.deregistrations:
			h.unregister(client)
		case protocol := <-h.protocol:
			switch protocol.METHOD {
			case MSG:
				h.message(protocol.Sender, protocol.Recepient, protocol.Body)
			}
		}
	}

}
```
client data sent to the __registrations__ channel registers the client on the server and likewise the __deregistrations__ channel deregisters a client on the server these are handled in the function `register` and `unregister respectively as seen in the __switch__ statement 

``` go
    func (h *serverHub) register(c *client) {
        if _, exists := h.clients[c.username]; exists {
            c.username = ""
            c.conn.Write([]byte("Client Error Username Taken\n405\n"))
        } else {
            h.clients[c.username] = c
            c.conn.Write([]byte("User Saved OK!!\n200\n"))
        }
    }

    func (h *serverHub) unregister(c *client) {
        if _, exists := h.clients[c.username]; exists {
            delete(h.clients, c.username)
            c.conn.Write([]byte("User Deleted OK!! \n200\n"))
        }
    }
```

Data sent to the __protocol__ channel are checked for their respective protocol methods , for now we only handle the `MSG` method of the protocol, which is handled in the `message` function, here client reads the remaining data from the protocol request and which has the recepient of the message and the message sent , if the recepient connection (recepient is also another client connection) the server writes the message to the recepient connection stored in the client structure, see code below












