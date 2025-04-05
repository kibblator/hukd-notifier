import axios from "axios";

export class TelegramService {
  private botToken: string;
  private chatId: string;
  private apiUrl: string;

  constructor(botToken: string, chatId: string) {
    this.botToken = botToken;
    this.chatId = chatId;

    this.apiUrl = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
  }

  sendMessage = async (messageText: string) => {
    try {
      const messageData = {
        chat_id: this.chatId,
        text: messageText,
        parse_mode: "HTML",
      };

      const response = await axios.post(this.apiUrl, messageData);

      if (response.data.ok) {
        console.log("Message sent successfully:", response.data.result.text);
      } else {
        console.error("Failed to send message:", response.data.description);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
}
