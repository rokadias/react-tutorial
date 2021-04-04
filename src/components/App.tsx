import * as React from 'react';

import '@/style/base.scss';
import Game from './Game';

import PageInterface from '../PageInterface';

class App extends React.Component<PageInterface, {}> {
    render() {
        return (
            <div>
              <h1>Welcome to React with Typescript</h1>
              <Game />
            </div>
        );
    }
}

export default App;
