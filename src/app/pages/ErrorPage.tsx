import React from "react";
import { useNavigate, useParams } from "react-router-dom";

/* constant type */
const TYPE_ERROR = {
  server: ":server",
  api: ":api",
};

const ErrorPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  return (
    <div>
      <p>
        {type === TYPE_ERROR.server &&
          "Le serveur est indisponible, veuillez contacter le support"}
      </p>
      <p>
        {type === TYPE_ERROR.api &&
          "L'API est indisponible, veuillez contacter le support"}
      </p>
      <button onClick={() => navigate("/")}>Retour à l'accueil</button>
    </div>
  );
};

export default ErrorPage;
