import styled from "@emotion/styled";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "src/UI-KIT/components/Button";

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
  }
`;

const ErrorPage = () => {
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
        onClick={() => navigate("/")}
        content={"Retour à l'accueil"}
      />
    </Container>
  );
};

export default ErrorPage;
