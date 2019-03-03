# Team13-back

Para correr el programa primero instale las dependencias necesarias con:

    npm install
            
Luego, corralo con start

    npm start
  
 ## Clase Chat

 Get de todos los chats o por ID.
 
    http://localhost:3000/chat
    
    http://localhost:3000/chat?id=614532168092341000000
    
 Post de un chat
 
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

 Delete de un chat por ID
 
    http://localhost:3000/chat?id=614532168092341000000
 
 Update/PUT de un chat por ID
 
    http://localhost:3000/chat?id=707620319244405600000
    
      {
      "messages": [{
                    "text": "TEXTO PRUEBA TEXTO PRUEBA PRUEBA PRUEBA\r\n",
                    "timeStamp": "Tue Feb 17 2015 19:16:26 GMT-0500 (Colombia Standard Time)}",
                    "userID": "5c7bf45a50dabdff479f59f8"
                }]
        }
 
