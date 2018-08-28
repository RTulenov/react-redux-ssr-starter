import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import { makeSelectLanguage, makeSelectLocation } from './selectors';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { Wrapper } from './styled';
import { routes } from 'routes';
import messages from './messages';

import HeaderContainer from 'containers/Header';
import FooterContainer from 'containers/Footer';

class App extends Component {
    render() {
        const { locale, intl } = this.props;

        return (
            <Wrapper>
                <Helmet
                    titleTemplate="react-redux-ssr-starter | %s"
                    defaultTitle={`react-redux-ssr-starter | ${
                        intl.formatMessage({ ...messages.meta.title })
                    }`}
                >
                    <html lang={locale} />
                    <meta 
                        name="description"
                        content={intl.formatMessage({ ...messages.meta.description })}
                    />
                    <meta
                        name="keywords"
                        content={intl.formatMessage({ ...messages.meta.keywords })}
                    />
                </Helmet>

                <HeaderContainer {... this.props} />

                <Switch>
                    {routes.map(({ path, exact, component: Component }) =>
                        <Route key={path} path={path} exact={exact} render={props => (
                            <Component {...props} />
                        )} />
                    )}
                </Switch>

                <FooterContainer {... this.props} />
            </Wrapper>
        );
    }
};

App.propTypes = {
    locale: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLanguage(),
    location: makeSelectLocation(),
});

export function mapDispatchToProps(dispatch) {
    return {
        onLocaleToggle: (locale) => dispatch(changeLocale(locale)),
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withRouter,
    withConnect,
    injectIntl
)(App);