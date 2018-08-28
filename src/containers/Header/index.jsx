import React from 'react';
import { Header } from './styled';
import messages from './messages';

const HeaderContainer = ({ intl }) =>
    <Header>
        {intl.formatMessage({ ...messages.content })}
    </Header>
    ;

export default HeaderContainer;