"use client";
import React, { useState, useEffect } from "react";
import classes from "@/styles/chatPage.module.css";
import CustomBotChat from "@/components/customBot/CustomBotChat";
import UploadFiles from "@/components/UploadFiles";
import GiveChatname from "@/components/GiveChatname";
import Backdrop from "@/components/Backdrop";
import useGetparentchatById from "@/hooks/useGetparentchatById";
import useUpdateparentchatById from "@/hooks/useUpdateparentchatById";

type upload_file = {
  id: string;
  file: Object;
  name: string;
};

type FormValues = {
  upload_files: upload_file[];
};

type Chat = {
  role: string;
  parts: {
    text: string;
  }[];
}[];

type Newchat = {
  name: string;
};

const Home: React.FC<{ params: { id: string } }> = ({ params }) => {
  const id = params.id;
  const [values, setValues] = useState<FormValues>({
    upload_files: [],
  });
  const { GetparentchatById } = useGetparentchatById();
  const { UpdateparentchatById } = useUpdateparentchatById();

  const [chat, setChat] = useState<Chat>([]);
  const [question, setQuestion] = useState<string>("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const [isvisibleUserChat, setIsvisibleUserChat] = useState<boolean>(false);
  const [chatsError, setChatsError] = useState<Newchat>({ name: "" });
  const [chatName, setChatName] = useState<Newchat>({ name: "" });

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const callBot = async () => {
    if (question === "") return;
    setChat((prev) => [
      ...prev,
      {
        role: "user",
        parts: [{ text: question }],
      },
    ]);
    setQuestion("");
    const newid = id.replace(/%20/g, " ");
    const files = values.upload_files.map((file) => file.file);
    const response = await UpdateparentchatById(newid, question, files);
    if (response != "" && response.status !== "success") {
      setChat((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: response }],
        },
      ]);
    }
  };

  const handleSetErrors = (id: string) => {
    if (id === "name") {
      if (chatName.name === "") {
        setChatsError({ name: "Chat name is required" });
      } else if (!/^[a-zA-Z0-9 ]+$/.test(chatName.name)) {
        setChatsError({
          name: "Chat name should contain only letters and numbers",
        });
      } else {
        setChatsError({ name: "" });
      }
    }
  };

  useEffect(() => {
    if (id === "new") {
      setIsvisibleUserChat(true);
    }
  }, []);

  useEffect(() => {
    const fun = async () => {
      const newid = id.replace(/%20/g, " ");
      console.log(newid);
      const response = await GetparentchatById(newid);
      console.log(response);
      setChat(response);
    };
    if (typeof window !== "undefined" && id !== "new") {
      fun();
    }
  }, []);

  return (
    <div className={classes["container"]}>
      <div className={classes["box"]}>
        {isvisibleUserChat && <Backdrop zIndex={70} />}
        <div className={classes["chat-name-form"]}>
          {isvisibleUserChat && (
            <GiveChatname
              chat={chatName}
              handleChange={(e) => {
                setChatName({ name: e.target.value });
              }}
              handleSetErrors={(id) => {
                handleSetErrors(id);
              }}
              chatsError={chatsError}
              setIsvisibleUserChat={setIsvisibleUserChat}
            />
          )}
        </div>
        <div className={classes["left"]}>
          <div className={classes["left-chat"]}>
            <div className={classes["left-chat-container"]}>
              <CustomBotChat data={chat} />
            </div>
            <div className={classes["left-chat-bottom"]}>
              <div
                className={classes["textarea-box"]}
                style={{
                  width: values.upload_files.length > 0 ? "100%" : "91%",
                }}
              >
                <textarea
                  name="question"
                  id="question"
                  ref={textareaRef}
                  className={classes["input-field"]}
                  placeholder="Type a message"
                  rows={1}
                  onInput={handleInput}
                  value={question}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") callBot();
                  }}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                  disabled={id === "new" ? true : false}
                ></textarea>
              </div>
              <div
                className={classes["upload-files-box"]}
                style={{
                  position:
                    values.upload_files.length > 0 ? "initial" : "absolute",
                  width:
                    values.upload_files.length > 0
                      ? "-webkit-fill-available"
                      : "auto",
                  right: "0px",
                  bottom: "12px",
                }}
              >
                <UploadFiles
                  upload_files={values.upload_files}
                  setFormData={setValues}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
