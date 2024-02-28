import { createChatBotMessage } from "react-chatbot-kit";
import IWidget from "react-chatbot-kit/build/src/interfaces/IWidget";
import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";
import ReportProblem from "./widgetsOption/reportProblem";
import ProductDropdown from "./widgetsOption/productDropdown";
import ProductIDinput from "./widgetsOption/productIDinput";

import reactImg from "./react.svg";

const ChatbotConfig: IConfig = {
  botName: "Retail Supply Chain System Bot",
  initialMessages: [
    createChatBotMessage(`Welcome to Supply Chain System!`, {
      widget: "reportProblem",
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  customComponents: {
    botAvatar: (props: any) => <img src={reactImg} alt="bot" {...props} />,
  },
  widgets: [
    {
      widgetName: "reportProblem",
      widgetFunc: (props: any) => <ReportProblem {...props} />,
    },
    {
      widgetName: "productIDinput",
      widgetFunc: (props: any) => <ProductIDinput {...props} />,
    },
    {
      widgetName: "productDropdown",
      widgetFunc: (props: any) => <ProductDropdown {...props} />,
    },
  ] as IWidget[],
};

export default ChatbotConfig;
