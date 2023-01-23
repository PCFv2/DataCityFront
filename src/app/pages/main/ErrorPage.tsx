import React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

/* constant type */
const TYPE_ERROR = {
  server: ":server",
};

const ErrorPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  return (
    <div>
      {type === TYPE_ERROR.server
        ? "Le serveur est indisponible, veuillez contacter le support"
        : "Erreur inconnu"}
      <button onClick={() => navigate("/")}>Retour à l'accueil</button>
    </div>
  );
};

export default ErrorPage;
