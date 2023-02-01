import React from "react";

const MailConsultation = () => {
  return (
    <div style={{ padding: "0 30%", textAlign: "justify" }}>
      <p>
        Certaines escroqueries par email peuvent être très convaincantes, avec
        des logos de marque et un langage officiel. N'oubliez pas de prendre le
        temps de réfléchir chaque fois qu'un email vous demande de prendre des
        mesures immédiates qui pourraient révéler des informations
        confidentielles. Vérifiez la présence de ces éléments indiquant
        généralement une escroquerie par email :
      </p>
      <ul>
        <li>
          Le nom de l'expéditeur est imprécis et l'adresse électronique de
          l'expéditeur est longue ou complexe.
        </li>
        <li>L'objet du mail est attrayant ou alarmiste.</li>
        <li>L'auteur du mail appelle à une action immédiate.</li>
        <li>L’auteur du mail fait miroiter une offre alléchante..</li>
        <li>
          L'auteur du mail utilise un prétexte pour obtenir vos informations
          personnelles, y compris vos informations de connexion à un site Web..
        </li>
        <li>
          L'auteur du mail vous invite à cliquer sur un lien hypertexte sans
          préciser clairement la destination de ce lien.
        </li>
        <li>L'objet du mail est attrayant ou alarmiste.</li>
      </ul>
      <p>
        source :
        https://blog.avast.com/fr/vous-venez-de-recevoir-un-e-mail-douteux-que-faire
      </p>
    </div>
  );
};

export default MailConsultation;
