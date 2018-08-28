/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

function Fragment(props) {
    return props.children || <span {...props} /> || null;
}

export class LanguageProvider extends PureComponent {
    render() {
        return (
            <IntlProvider
                locale={this.props.locale}
                key={this.props.locale}
                messages={this.props.messages[this.props.locale]}
                textComponent={Fragment}
            >
                {React.Children.only(this.props.children)}
            </IntlProvider>
        );
    }
}

const mapStateToProps = createSelector(
    makeSelectLocale(),
    (locale) => ({ locale })
);

export default connect(mapStateToProps)(LanguageProvider);
