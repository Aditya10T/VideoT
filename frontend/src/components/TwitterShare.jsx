import React from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

const TwitterShare = ({lnk}) => {
  return (
      <TwitterShareButton
        className="sm:ml-5 ml-2 sm:flex sm:justify-start mt-2"
        url={lnk}
        quote={"Dummy text!"}
        hashtag="#muo"
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
  );
};

export default TwitterShare;
