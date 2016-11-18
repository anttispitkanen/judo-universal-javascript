'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
    render() {
        return(
            <div className="app-container">
                <header>
                    <Link to="/">
                        <img className="logo" src="/img/logo-judo-heroes.png" />
                    </Link>
                </header>

                <div className="app-content">{this.props.children}</div>

                <footer>
                    <p>
                        This is a demo app built following a tutorial from <a href="https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app"
                        target="_blank">scotch.io</a>.
                    </p>
                </footer>
            </div>
        );
    }
}
