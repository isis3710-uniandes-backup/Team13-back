# Team13-back

Before you run the app, you must install the required modules using:

    npm install
            
After you have done that, you are all set to execute the project with:

    npm start
  
 ## Chat Resource

 HTTP GET method route for returning all chats or returning only one chat searched by ID.
 
    http://localhost:3000/chat
    
    http://localhost:3000/chat?id=614532168092341000000
    
 HTTP POST method for a single chat
 
      {	
        "messages": [
            {
                "text": "TEXTO PRUEBA TEXTO PRUEBA PRUEBA PRUEBA\r\n",
                "timeStamp": "Tue Feb 17 2015 19:16:26 GMT-0500 (Colombia Standard Time)}",
                "userID": "5c7bf45a50dabdff479f59f8"
            },
            {
                "_id": "5c7bebc2421fe5dd93f96829",
                "text": "Veniam minim consequat deserunt culpa est et reprehenderit. Adipisicing ea dolor dolore laboris pariatur deserunt ad non. Adipisicing minim ea et laborum sit do eiusmod veniam. Occaecat ex non dolor laborum anim ad aute non minim. Ut culpa dolor quis labore veniam elit. Eiusmod ad ullamco velit laboris elit velit laborum mollit officia dolor ipsum.\r\n",
                "timeStamp": "Thu May 15 1997 21:24:24 GMT-0500 (Colombia Standard Time)}",
                "userID": "5c7bf45aeb01e62096576f3c"
            }
        ]
    }

 HTTP DELETE method for a single chat
 
    http://localhost:3000/chat?id=614532168092341000000
 
 HTTP PUT method for a single chat
 
    http://localhost:3000/chat?id=707620319244405600000
    
      {
      "messages": [{
                    "text": "TEXTO PRUEBA TEXTO PRUEBA PRUEBA PRUEBA\r\n",
                    "timeStamp": "Tue Feb 17 2015 19:16:26 GMT-0500 (Colombia Standard Time)}",
                    "userID": "5c7bf45a50dabdff479f59f8"
                }]
        }
 

 ## Chat Message Resource
 
 HTTP GET method route for returning all chat messages or returning only one chat message searched by ID.
 
    http://localhost:3000/chatmsg
    
    http://localhost:3000/chatmsg?id=5c7bed121829835899501913
    
 HTTP POST method for a single chat message
 
    {	
       "text": "MAS NUEVO MAS NUEVO ut eiusmod. Adipisicing aliquip aute pariatur aliquip excepteur eiusmod ad commodo.\r\n",
        "timeStamp": "Wed Dec 06 1978 08:26:10 GMT-0500 (Colombia Standard Time)}",
        "userID": "5c7bf45a50dabdff479f59f8"
    }

 HTTP DELETE method for a single chat message
 
    http://localhost:3000/chatmsg?id=5c7bed124a4d3a10d83c7325
 
 HTTP PUT method for a single chat message
 
    http://localhost:3000/chatmsg?id=5c7bed121829835899501913
    
    {	
       "text": "ALGO MAS NUEVO NUEVO ut eiusmod. Adipisicing aliquip aute pariatur aliquip excepteur eiusmod ad commodo.\r\n",
        "timeStamp": "Wed Dec 06 1978 08:26:10 GMT-0500 (Colombia Standard Time)}"
    }
 
  ## Comment Resource
 
 HTTP GET method route for returning all comments or returning only one comment searched by ID.
 
    http://localhost:3000/comment
    
    http://localhost:3000/comment?id=5c7be48d8f4a30514ff3fab3
    
 HTTP POST method for a single comment
 
    {	
       "text": "MAS NUEVO MAS NUEVO ut eiusmod. Adipisicing aliquip aute pariatur aliquip excepteur eiusmod ad commodo.\r\n",
        "timeStamp": "Wed Dec 06 1978 08:26:10 GMT-0500 (Colombia Standard Time)}",
        "userID": "5c7bf45a50dabdff479f59f8"
    }

 HTTP DELETE method for a single comment
 
    http://localhost:3000/comment?id=417077870346140700000
 
 HTTP PUT method for a single comment
 
    http://localhost:3000/comment?id=417077870346140700000
    
    {	
       "text": "BBBBBBBBBB excepteur eiusmod ad commodo.\r\n",
        "timeStamp": "Wed Dec 06 1978 08:26:10 GMT-0500 (Colombia Standard Time)}",
        "userID": "5c7bf45a50dabdff479f59f8"
    }
 
 
