import styled from "@emotion/styled";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "src/UI-KIT/components/Button";
import { setBotIsActive } from "../redux/botSlice";

/* constant type */
const TYPE_ERROR = {
  server: ":server",
  api: ":api",
};

const Container = styled.div`
  display: flex;
  margin: 10% 0;
  flex-direction: column;
  align-items: center;
  & span {
    font-size: 80px;
    color: ${(props) => props.theme.colors.primary.red};
  }
  & p {
    color: ${(props) => props.theme.colors.primary.blue};
    font-weight: bold;
    font-size: 1.1rem;
    text-align: center;
  }
`;

const ErrorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type } = useParams();

  return (
    <Container>
      <span className="material-icons">error</span>
      <p>
        {type === TYPE_ERROR.server &&
          "Le serveur est indisponible, veuillez contacter le support"}
      </p>
      <p>
        {type === TYPE_ERROR.api &&
          "L'API est indisponible, veuillez contacter le support"}
      </p>
      <PrimaryButton
        onClick={() => {
          navigate("/");
          dispatch(setBotIsActive(false));
        }}
        content={"Retour à l'accueil"}
      />
    </Container>
  );
};

export default ErrorPage;
