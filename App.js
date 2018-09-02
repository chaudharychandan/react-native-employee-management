/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';

import Router from './src/components/Router';

class App extends Component<{}> {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDMOsd7iZbv2Qs7TfymtLULjbFJ93SD828',
      authDomain: 'manager-cb123.firebaseapp.com',
      databaseURL: 'https://manager-cb123.firebaseio.com',
      projectId: 'manager-cb123',
      storageBucket: '',
      messagingSenderId: '404002792986'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
