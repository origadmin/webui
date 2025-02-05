/* eslint-disable */
// @ts-ignore
declare namespace API {
  namespace Chat {
    type User = {
      id: string;
      name: string;
    };

    type Message = {
      id: string;
      senderId: string;
      content: string;
      timestamp: Date;
      mentions: string[];
    };

    type Chat = {
      id: string;
      name: string;
      participants: string[];
      messages: Message[];
      isGroup: boolean;
    };
  }
}
