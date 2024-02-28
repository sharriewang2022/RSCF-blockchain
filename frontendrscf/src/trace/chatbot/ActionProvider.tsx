import React from "react";
import {IMessageOptions} from "react-chatbot-kit/build/src/interfaces/IMessages";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/chatbotStore";
import {addProductName, addManufacturer} from "./redux/features/messages-slice";

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
    const botMessage = createChatBotMessage("Please enter your product ID", {});

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleInputProductProblem = (productId?: string) => {
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
        if (
          prev.messages[prev.messages.length - 2].message === "Please report the product problem"
        ) {
          dispatch(addProductName(prev.messages[prev.messages.length - 1].message));
          botMessage = createChatBotMessage("Please report the product problem", {
            widget: "reportProblem",
          });
          return {
            ...prev,
            messages: [...prev.messages, botMessage],
          };
        } else if (
          prev.messages[prev.messages.length - 2].message === "Please enter the product ID"
        ) {
          dispatch(addProductName(prev.messages[prev.messages.length - 1].message));
          botMessage = createChatBotMessage("Please enter the product ID", {
            widget: "productIDinput",
          });
          return {
            ...prev,
            messages: [...prev.messages, botMessage],
          };
        }else if (productId) {
          dispatch(addManufacturer(productId));
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
