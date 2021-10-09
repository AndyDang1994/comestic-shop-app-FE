import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateAuthen = ({ component: Component, user, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            var isNRedirect = false
            console.log("PrivateAuthen " + JSON.stringify(user.user.screenRole))
            user.user.screenRole.forEach(src => {
                if (Component.displayName.includes(src.screenName)) {
                    // return <Component {...props} />
                    isNRedirect = true
                }
            });
            console.log("PrivateAuthen " + isNRedirect)
            if(!isNRedirect){
                return <Redirect to={{ pathname: '/' }} />
            }else{
                return <Component {...props} />
            }
            
        }} />)
}
