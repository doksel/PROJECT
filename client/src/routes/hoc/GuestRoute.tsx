import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { UserType } from "../../store/authStore/reducer";
import { AppDispatchType } from "../../store/store";

type PropsType = {
  user?: UserType;
  component: React.Component | React.FunctionComponent;
};

const GuestRoute: React.FC<RouteProps & PropsType> = ({
  component: Component,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      console.log(user);
      if (!user) {
        return <Component {...props} />;
      }

      return <Redirect to="/" />;
    }}
  />
);

const mapStateToProps: AppDispatchType = ({ authStore }) => ({ ...authStore });

export default connect(mapStateToProps)(GuestRoute);
