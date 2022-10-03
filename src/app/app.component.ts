import { Component } from '@angular/core';
import  {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private stompClient:any;

  messages:any = [];
  message:any;
  author:any;

  ngOnInit(){
    this.connect();
  }
  
  connect(){
    const socket = new SockJS('http://localhost:8090/sba-websocket');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, ()=> {
      this.stompClient.subscribe('/topic/message', (data:any) =>{
        this.showMessages(JSON.parse(data.body));
      })
    })
  }

  send(){
    this.stompClient.send('/ws/messagesBroker', {}, JSON.stringify({ 'message': this.message, 'author': this.author}));
  }

  showMessages(message:any){
  this.messages.push(message);
  }

}
