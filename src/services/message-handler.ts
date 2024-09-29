import toast from "react-hot-toast";

class MessageHandler {
  private static instance: MessageHandler = new MessageHandler();

  public static get() {
    return this.instance;
  }

  handleError(error: string) {
    toast.error(error || "An unexpected error occurred");
  }

  handleSuccess(message: string) {
    toast.success(message || "Success");
  }

  info(message: string) {
    toast(message || "Success");
  }
}

export default MessageHandler;