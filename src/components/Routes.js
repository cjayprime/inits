import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Index from './Index';
import Admin from '././Admin/Index';
import { inject, observer } from 'mobx-react';

function Routes(props){
    return (
        <Route>
            <Route exact path="/">
                <Redirect to="/category/all" />
            </Route>
            <Route exact path="/category/:name" component={Index} />
            <Route exact path="/admin" component={Admin} />
        </Route>
    );

}

export default inject('store')(observer(Routes));