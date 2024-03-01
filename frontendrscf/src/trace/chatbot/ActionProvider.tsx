import React from "react";
import {IMessageOptions} from "react-chatbot-kit/build/src/interfaces/IMessages";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/chatbotStore";
import {addProductName, addManufacturer,reportProductProblem, addProductId} from "./redux/features/messages-slice";

const ActionProvider = ({
  createChatBotMessage,
  setState,
  children,
}: {
  createChatBotMessage: (
    message: string,
    options: IMessageOptions
  ) => {
    loading: boolean;
    widget?: string;
    delay?: number;
    payload?: any;
    message: string;
    type: string;
    id: number;
  };
  setState: any;
  children: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleInputReportID = () => {
    const botMessage = createChatBotMessage("Please enter the product ID", {});
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // const handleInputProductProblem = () => {
  //   const botMessage = createChatBotMessage("Please report the product problem", {});
  //   setState((prev: any) => ({
  //     ...prev,
  //     messages: [...prev.messages, botMessage],
  //   }));
  // };

  const handleInputProductProblem = () => {
    // const botMessage = createChatBotMessage("Please report the product problem", {});
    setState(
      (prev: {
        messages: {
          message: string;
          type: string;
          id: number;
          loading?: boolean;
          widget?: string | undefined;
          delay?: number | undefined;
          payload?: any;
        }[];
      }) => {
        let botMessage;
        let lastMessage = prev.messages[prev.messages.length - 2].message;
        console.log("chatbot message:"+ lastMessage);
        if (
          lastMessage === "Please report the product problem"
        ) {
          dispatch(reportProductProblem(prev.messages[prev.messages.length - 1].message));
          botMessage = createChatBotMessage("Please wait, administrator will connect with you later!", {
            widget: "reportProblem",
          });
          return {
            ...prev,
            messages: [...prev.messages, botMessage],
          };
        } else if (lastMessage.includes("id:") || lastMessage === "Please enter the product ID") {
          dispatch(addProductId(prev.messages[prev.messages.length - 1].message));
          // botMessage = createChatBotMessage("Please report the product problem", {
          //   widget: "reportProblem",
          // }); 
          botMessage = createChatBotMessage("Please report the product problem", {}); 
          return {
            ...prev,
            messages: [...prev.messages, botMessage],
          };
        }else if  (
          prev.messages[prev.messages.length - 2].message === "Over"
        ){
          botMessage = createChatBotMessage(
            "In 5 seconds, bot will exit.",
            {}
          );
          return {
            ...prev,
            messages: [...prev.messages, botMessage],
          };
        } else {
          return prev;
        }
      }
    );
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleInputReportID,
            handleInputProductProblem,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
