import React from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';

const FacebookShare = ({lnk}) => {
  return (
        <FacebookShareButton
        className='ml-2 sm:ml-6 sm:flex sm:justify-start mt-2'
        url={lnk}
        quote={'Bhupendra Jogi'}
        hashtag="#NaamBataiye"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
  )
}

export default FacebookShare