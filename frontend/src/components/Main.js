import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';
import Galery from './Galery';
import Element from './SingleElement';


const ElementWithId = ({match}) => {
    return(
        <Element catid={match.params.id} />
    );
}

function Main(props){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/home' component={Galery}/>
                <Route path='/element/:id' component={ElementWithId}/>
                <Redirect to='/home' />
            </Switch>
        </BrowserRouter>
    );
}

export default Main;