//https://fredrikoseberg.github.io/react-chatbot-kit-docs/docs/create-a-response

import React from "react";
import Chatbot from "react-chatbot-kit";

import ChatbotConfig from "./chatbotConfig";
import MessageParser from "./messageParser";
import ActionProvider from "./actionProvider";

function chatbotAI() {
  return (
    <div className="App">
      <Chatbot
        config={ChatbotConfig}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default chatbotAI;