import React from 'react';
import { Footer } from './styled';
import messages from './messages';

const FooterContainer = ({ intl }) => 
    <Footer>
        {intl.formatMessage({ ...messages.content })}
    </Footer>
;

export default FooterContainer;