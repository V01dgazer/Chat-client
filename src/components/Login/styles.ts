import styled from "styled-components";
import { Container as SemContainer } from "semantic-ui-react";

export const Container = styled(SemContainer)`
  height: 100vh;
  padding-top: 10%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &&& {
    display: flex;
  }
`;
