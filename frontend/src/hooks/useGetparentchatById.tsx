import { useNotification } from "./useNotification";

const useGetparentchatById = () => {
  const { NotificationHandler } = useNotification();
  const GetparentchatById = async (chatId: string) => {
    console.log(chatId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tokentrim/getparentchat/${chatId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      if (responsedata.type === "Error") {
        NotificationHandler("Custom ChatBot", responsedata.message, "Error");
        return [];
      }
      return responsedata.response;
    } catch (err) {
      console.log(err);
      NotificationHandler("Custom ChatBot", "Something went wrong", "Error");
      return [];
    }
  };
  return { GetparentchatById };
};

export default useGetparentchatById;
