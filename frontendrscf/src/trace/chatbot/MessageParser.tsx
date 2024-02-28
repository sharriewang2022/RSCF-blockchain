import React from "react";

const MessageParser = ({
  children,
  actions,
}: {
  children: any;
  actions: {
    handleInputReportID: () => void;
    handleInputProductProblem: () => void;
  };
}) => {
  const parse = (message: string) => {
    message = message.toLocaleLowerCase();
    if (message.includes("problem")) {
      actions.handleInputProductProblem();
    } else {
      actions.handleInputReportID();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          parse,
          actions,
        })
      )}
    </div>
  );
};

export default MessageParser;
