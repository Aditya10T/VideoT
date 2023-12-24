import React from "react";
import {
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const WhatsappShare = ({ lnk }) => {
  return (
    <WhatsappShareButton
      className="ml-2 sm:ml-5 sm:flex sm:justify-start mt-2"
      url={lnk}
      quote={"Dummy text!"}
      hashtag="#muo"
    >
         <WhatsappIcon size={32} round />
    </WhatsappShareButton>
  );
};

export default WhatsappShare;
