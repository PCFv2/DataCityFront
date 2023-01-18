import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      Erreur inconnu
      <button onClick={() => navigate("/")}>Retour à l'accueil</button>
    </div>
  );
};

export default ErrorPage;
