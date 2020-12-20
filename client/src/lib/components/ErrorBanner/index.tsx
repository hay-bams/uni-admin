import React from "react";
import { Alert } from "antd";

interface Props {
  message?: string;
  description?: string;
}

export const ErrorBanner = ({
  message = "Uh oh! Something went wrong :(",
  description = "Look like something went wrong. Please check your connection and/or try again later."
}: Props) => {
  return (
    <Alert
      // style={{width: "70%", marginLeft: "20%"}}
      banner
      closable
      message={message}
      description={description}
      type="error"
      className="error-banner"
    />
  );
};
