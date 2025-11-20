interface MessagePayload {
  type: string;
  message: string;
  username: string;
}

export enum ConnectionState {
  CONNECTING = "CONNECTING",
  OPEN = "OPEN",
  CLOSING = "CLOSING",
  CLOSED = "CLOSED",
}

export class ChatSocket {
  private socket: WebSocket;
  private token: string;
  public state: ConnectionState = ConnectionState.CONNECTING;
  public isLoading: boolean = false;
  public setLoadingCallback?: (loading: boolean) => void;


  private messageListeners: ((msg: MessagePayload) => void)[] = [];
  private stateListeners: ((state: ConnectionState) => void)[] = [];

  constructor(onMessage: (msg: MessagePayload) => void) {
    this.token = localStorage.getItem("access") || "";

    this.messageListeners.push(onMessage);
  

    this.socket = new WebSocket(
      `ws://localhost:8000/ws/socket-server/?token=${this.token}`
    );

    this.socket.onopen = () => {
      console.log("WebSocket connected!");
      this.updateState(ConnectionState.OPEN);
    };

    this.socket.onmessage = (event: MessageEvent) => {
      
      const data: MessagePayload = JSON.parse(event.data);
      console.log("Received:", data);
      if(data.type.includes('ai')){
        this.setLoadingCallback?.(false);
      }
      this.messageListeners.forEach((cb) => cb(data));
      
    };

    this.socket.onclose = (event: CloseEvent) => {
      console.log("WebSocket closed:", event.reason);
      this.updateState(ConnectionState.CLOSED);
    };

    this.socket.onerror = (event: Event) => {
      console.error("WebSocket error", event);
      this.updateState(ConnectionState.CLOSED);
    };
  }

  /** --- Helpers --- */
  private updateState(newState: ConnectionState) {
    this.state = newState;
    this.stateListeners.forEach((cb) => cb(newState));
  }

  /** Subscribe to state changes */
  onStateChange(cb: (state: ConnectionState) => void) {
    this.stateListeners.push(cb);
  }

  /** Subscribe to messages */
  onMessage(cb: (msg: MessagePayload) => void) {
    this.messageListeners.push(cb);
  }
  removeMessageListener(cb: (msg: MessagePayload) => void) {
    this.messageListeners = this.messageListeners.filter(listener => listener !== cb);
  }

  /** Unsubscribe from state changes */
  removeStateListener(cb: (state: ConnectionState) => void) {
    this.stateListeners = this.stateListeners.filter(listener => listener !== cb);
  }
  /** Send message */
   sendMessage(message: string) {  // Changed parameter from MessagePayload to string
    if (this.socket.readyState === WebSocket.OPEN) {
      // Your consumer expects: { "message": "text" }
      this.socket.send(JSON.stringify({ 
        message: message,
        username:'Akram'  // Just send the message string as expected by your consumer
      }));
      
      this.setLoadingCallback?.(true);
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  }
  /** Close socket */
  close() {
    this.updateState(ConnectionState.CLOSING);
    this.socket.close();
  }
}
