import React from "react";
import styled from "@emotion/styled";
import background from "../../assets/img/homepage/background.webp";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const PageCGU = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 3.5rem;
  margin: 0 20%;
  padding-bottom: 2.5%;
  height: 100vh;
`;

const MainTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary.blue};
  font-family: ${(props) => props.theme.font.family.title};
  font-size: ${(props) => props.theme.font.size.title};
  text-align: center;
`;

const TermUse = () => {
    const navigate = useNavigate();
    
    const handleClickhp = () => {
        navigate("/");
    }
    return (
        <PageCGU>
            <MainTitle onClick={handleClickhp}>DATA CITY</MainTitle>

            <h1>Condition Utilisateur</h1>

            <body>
                <h2>Article préliminaire : Définitions</h2>

                <a>Site : Désigne le Site Internet www.data-city.fr
                Société : Désigne l’éditeur du Site, soit la Société PCFv2.
                Utilisateur : Désigne toute personne qui utilise le Site ou l'un des Services proposés sur le Site.
                CGU ou Conditions Générales d’Utilisation : Désignent les Conditions Générales d’Utilisation du Site conclues entre l’Utilisateur agissant en qualité de client du Site et la Société, régissant notamment l’accès au Site.
                Contenus : désignent, sans que cette liste soit limitative, la structure, l’architecture des Services, le contenu éditorial, les streaming, les textes, rubriques, dessins, illustrations, photos, images, sons, vidéos, jeux ainsi que tout autre contenu présent sur les Services et/ou tout autre élément composant les Services.
                Services : désignent les Services accessibles depuis le Site et édités par la Société.
                Membre : désigne l’Utilisateur qui a procédé à une inscription sur le Site via un identifiant et un mot de passe confidentiel, lui permettant notamment d'accéder à certains Contenus/Services présents sur le Site et/ou de participer à des jeux et/ou de profiter d’autres fonctionnalités réservées aux inscrits.
                Espaces Interactifs : Désignent les espaces contributifs, notamment les forums, les avis et les commentaires, susceptibles d’être mis à disposition des Utilisateurs sur les Services.
                Conditions Spécifiques d’Utilisation : Désigne les Conditions Spécifiques D’Utilisation encadrant les services spécifiques proposés par le Site (participation aux jeux...).
                </a>

                <h3>Article 1 : Objet</h3>

                <a>2.1 En accédant, utilisant, consultant ou s’inscrivant sur le Site, l’Utilisateur s’engage à accepter sans réserve les présentes CGU. La consultation du Site ne nécessite pas d’inscription préalable.
                </a>

                <h3>Article 3 : Utilisation des services</h3>

                <a>3.1 L’Utilisateur s’engage à respecter l’ensemble des règles fixées par les présentes dans l’utilisation des Services du Site. Il s’engage notamment, à ne pas créer, diffuser, transmettre, communiquer ou stocker, par tous moyens que ce soit et quel qu’en soit le destinataire, de contenus illicites ou propos diffamatoires, injurieux, discriminatoires, dénigrants ou contrevenants à l’ordre public.
                </a>

                <a>3.2 L’Utilisateur s’engage également à respecter la vie privée de l’ensemble des autres Utilisateurs et à ne pas porter atteinte aux droits des tiers.
                </a>

                <a>3.3 L’Utilisateur s’interdit de porter atteinte de quelque manière que ce soit à l’ensemble des droits de propriété intellectuelle afférents au Site, ainsi qu’à ses Contenus et Services. Il s’engage notamment à ne pas reproduire, copier, diffuser, distribuer, communiquer, céder, représenter sur tout autre site Web, ainsi que sur tout support ayant une finalité commerciale les éléments et contenus du Site et de ses Services.
                </a>

                <a>3.4 L’Utilisateur s’engage à ne pas entraver, perturber, détourner et plus généralement à ne pas agir d’une quelconque façon, qui ne serait pas en conformité avec l’usage ordinaire du Site.
                </a>

                <a>3.5 L’Utilisateur s’interdit de diffuser et/ou de prospecter à des fins commerciales sur le Site, il s’interdit d’y introduire des contenus pouvant porter préjudice aux autres Utilisateurs.
                </a>

                <a>3.6 L’Utilisateur reconnaît le caractère public, consultable par tous, des espaces de discussions (Forums, Chat, Témoignages etc…) et par conséquent s’interdit d’y diffuser des coordonnées ou données personnelles.
                </a>

                <h3>Article 4 : Responsabilité</h3>

                <a>4.1 La Société met en place les moyens pour assurer un site et des services de qualité. Néanmoins, elle ne saurait être tenue pour responsable d’une quelconque indisponibilité, défaillance, modification ou erreur survenue lors de l’utilisation de son Site ou de ses Services à l’exception de celles prévues dans les Conditions Spécifiques d’Utilisation inhérentes à certains services. La Société ne saurait garantir la continuité, l’accessibilité et la sécurité absolue du Service, compte tenu notamment des risques liés à Internet.
                L’Utilisateur reconnaît expressément utiliser le Site et les Services à ses seuls et entiers risques et périls.
                La Société ne pourra être tenue pour responsable des dommages (directs ou indirects), survenus lors de l’utilisation de son Site ou de ses Services, à l’exception des dommages qui auraient pour cause un manquement à ses obligations.
                </a>

                <a>4.2 La Société ne saurait être tenue pour responsable des relations (contractuelles ou non) entre les annonceurs/partenaires et les Utilisateurs de ses Sites et Services sauf stipulation contractuelle expresse.
                </a>

                <a>4.3 L’Utilisateur accepte de se soumettre aux dispositions relatives à la force majeure. La force majeure est constituée par tout événement revêtant les caractères d’extériorité, d’irrésistibilité et d’imprévisibilité reconnus par la jurisprudence des cours et des tribunaux qui empêcheraient l’une des parties ou les deux d’exécuter tout ou partie des engagements contenus dans les présentes.
                </a>

                <a>4.4 La Société se réserve le droit de modifier, supprimer ou neutraliser tout ou partie des Services proposés sur le Site, à tout moment et sans avoir à en justifier.
                </a>

                <h3>Article 5 : Prix</h3>

                <a>L’accès au Site est gratuit, certains services spécifiques, précisés comme tels, pourront présenter un caractère « payant ». Ces services sont soumis à des Conditions Spécifiques d’Utilisation, l’Utilisateur s’engage à s’y conformer et notamment à payer le prix convenu.
                </a>

                <h3>Article 6 : Propriété intellectuelle</h3>

                <a>6.1 Le Site, ses contenus et Services, ses logiciels, dessins, modèles, bases de données, marques et logos sont soumis au droit de la Propriété intellectuelle. La référence à ces droits figure également dans les mentions légales. Ces différents éléments sont la propriété de la Société. L’Utilisateur s’engage à respecter ces droits. La Société ne confère à l’Utilisateur qu’un droit non exclusif et incessible d’utilisation (l’utilisation s’entend d’un usage non commercial, caractérisé par la navigation, la participation et le choix de la souscription aux différents Services) de son Site et de ses Services, et se réserve par conséquent les droits d’exploitation de diffusion, cession, ainsi que tout autre droit sur les éléments qui constituent son Site et ses Services.
                </a>

                <h3>Article 7 : Durée</h3>

                <a>7.1 Le présent contrat est conclu entre la Société et l’Utilisateur, dès son acceptation par ce dernier. En cas de refus, l’Utilisateur s’engage à cesser d’utiliser le Site et les Services. Le contrat est conclu pour toute la durée de l’utilisation du Site et des Services.
                </a>

                <a>7.2 Le non-respect d’une quelconque obligation figurant dans les présentes CGU entraînera la résiliation immédiate du contrat entre la Société et l’Utilisateur, sans préjudice d’éventuels dommages et intérêts pour la Société.
                </a>

                <h3>Article 8 : Juridictions compétentes et droit applicable</h3>

                <a>Les présentes CGU sont exclusivement régies par le droit français. Tout désaccord ou litige qui ne se règle pas par la voie amiable sera soumis exclusivement aux tribunaux compétents.
                </a>

                <h3>Article 9 : Dispositions diverses</h3>

                <a>9.1 Les présentes CGU sont conclues entre la Société et l’Utilisateur, ce dernier ne peut les céder.
                </a>

                <a>9.2 Si une ou plusieurs stipulation(s) du présent contrat est (sont) tenue(s) pour non valide(s) ou déclarée(s) telle(s) en application d’une loi, d’un règlement ou à la suite d’une décision définitive d’une juridiction compétente, les autres stipulations du contrat garderont toute leur force et leur portée.
                </a>

                <a>9.3 Toute notification à raison des présentes CGU pourra être faite par mail par la Société pour le Site.
                </a>

                <a>9.4 Les présentes Conditions générales sont les seules applicables pour le site www.data-city.fr ; elles s’appliquent en intégralité. L’utilisateur ne peut les modifier.
                </a>

                <a>9.5 La Société se réserve le droit de modifier à tout moment les présentes CGU. L’Utilisateur a le devoir de se tenir informé de toute actualisation. Il est à la charge de l’Utilisateur de conserver les CGU et les Conditions Spécifiques d’Utilisation des Services Spécifiques pour lesquels il a contracté.
                </a>

                <a>Dernière mise à jour effectuée le 17/01/2023</a>

            </body>
        </PageCGU>
    );
};

export default TermUse;