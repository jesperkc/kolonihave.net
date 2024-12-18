"use client";
import LoginForm from "../LoginForm";
import { useAuth } from "../../context/AuthContext";
import { Children, ReactNode, cloneElement } from "react";

function AuthComponent({ children, props }: { children: ReactNode; props?: any[] }): JSX.Element {
  const { user } = useAuth();

  const renderChildren = () => {
    return Children.map(children, (child: any) => {
      return cloneElement(child, {
        // props ? ...props : null,
        loading: !user.checked,
        user: user,
      });
    });
  };

  if (!user.checked || (user.checked && user.uid)) return <>{renderChildren()}</>;
  return <LoginForm />;
}

export default AuthComponent;
