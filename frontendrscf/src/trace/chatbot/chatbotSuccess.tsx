import { styled } from "styled-components";
import { useAppSelector } from "./redux/chatbotStore";
import { Navigate } from "react-router-dom";

const StyledSuccess = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const chatbotSuccess = () => {
  const {ID, name, manufacturer, productProblem } = useAppSelector((state) => state.messageReducer.product);
  if (name === "") {
    return <Navigate to="/" />;
  }
  return (
    <StyledSuccess>
      The {productProblem} of your {name.toUpperCase()} has been added to supply chain
      system. You may now exit.
    </StyledSuccess>
  );
};

export default chatbotSuccess;
