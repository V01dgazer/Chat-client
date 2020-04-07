import * as React from "react";

import Header from "../Header";
import LoginForm from "../LoginForm";

import { Container } from "./styles";

const Login = () => {
  React.useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Container fluid>
      <Header title="WebRTC Chat" />
      <LoginForm />
    </Container>
  );
};

export default Login;
