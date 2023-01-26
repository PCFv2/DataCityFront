import React from "react";
import GameCreate from "../inGame/gameBuilder/GameCreate";
import { setDisplayComponent } from "../../app/redux/displayComponentSlice";
import { DISPLAY_COMPONENT } from "../../constants";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { PrimaryButton } from "../../UI-KIT/components/Button";
import background from "../../assets/img/homepage/background.webp";
import { css } from "@emotion/react";

const HomePageStyle = styled.main`
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
`;

const Home = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 3.5rem;
  margin: 0 20%;
  padding-bottom: 2.5%;
  height: 100vh;
`;

const Description = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.primary.black};
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: ${(props) => props.theme.radius.medium};
  padding: 2.5% 7.5%;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
`;

const MainTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary.white};
  font-family: ${(props) => props.theme.font.family.title};
  font-size: ${(props) => props.theme.font.size.title};
  text-align: center;
`;

const ButtonLine = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: auto;
  padding: 0 10%;
`;

// Rules

const Rules = styled.div`
  background-color: ${(props) => props.theme.colors.primary.blue};
  //width: 100%;
  padding: 0.5rem 10% 3rem 10%;
  color: ${(props) => props.theme.colors.primary.white};
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  row-gap: 2rem;
`;

const RulesTitle = styled.h1`
  margin: 1.2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 1.5rem;
  justify-content: center;
`;

const RulesTitleText = styled.span`
  font-weight: bold;
`;

const RulesTitleIcon = styled.span`
  font-size: 48px;
  color: ${(props) => props.theme.colors.primary.lightBlue};
`;

// Rules Line

const defaultRuleLine = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 3rem;
`;

const defaultRuleLineText = css`
  width: 80%;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;

const RulesLine = styled.div`
  ${defaultRuleLine};
`;

const RulesLineReverse = styled.div`
  ${defaultRuleLine};
`;

const RulesLineIcon = styled.span`
  color: ${(props) => props.theme.colors.primary.lightBlue};
  font-size: 36px;
`;

const RulesLineText = styled.div`
  ${defaultRuleLineText};
`;

const RulesLineTextReverse = styled.div`
  ${defaultRuleLineText};
  margin: 0 0 0 auto;
  text-align: right;
`;

const RulesLineTextTitle = styled.h3``;

const RulesLineTextText = styled.p`
  margin: 0;
  font-size: 1.1rem;
`;

// Footer (qui est bien collé au bas de la page

const Footer = styled.footer`
  margin-top: 5rem;
  background-color: ${(props) => props.theme.colors.primary.blue};
  display: flex;
  column-gap: 3rem;
  justify-content: space-between;
  padding: 1.1rem 10%;
  color: ${(props) => props.theme.colors.primary.lightBlue};
`;

const Link = styled.a`
  color: ${(props) => props.theme.colors.primary.lightBlue};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterIcon = styled.span`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary.lightBlue};
`;

const Contact = styled.a`
  display: flex;
  align-items: center;
  //justify-content: space-between;
  column-gap: 1rem;
  margin-left: auto;
  color: ${(props) => props.theme.colors.primary.lightBlue};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Homepage = () => {
  const dispatch = useDispatch();
  const handleClick = (): void => {
    dispatch(setDisplayComponent(DISPLAY_COMPONENT.joinComponent));
  };

    return (
        <HomePageStyle>
            <Home>
                <MainTitle>Data City</MainTitle>
                <ButtonLine>
                    <PrimaryButton onClick={handleClick} content={'Rejoindre la partie'}/>
                    <GameCreate/> {/* Button create game */}
                </ButtonLine>
                <Description>
                    {/* TODO Description du jeu */}
                    Data City est un Serious Game qui a été créé pour vous sensibiliser à la protection de vos données et à la cybersécurité. Le but du jeu et qu’en fonction de vos choix, ainsi que la réussite ou non des mini jeux au cours de la partie, vous devez éliminer les autres joueurs de la partie en découvrant leurs adresses. 
                </Description>
            </Home>
            <Rules>
                <RulesTitle>
                    <RulesTitleIcon className="material-icons">receipt_long</RulesTitleIcon>
                    <RulesTitleText>Règles</RulesTitleText>
                </RulesTitle>
                <RulesLine>
                    <RulesLineIcon className="material-icons">manage_accounts</RulesLineIcon>
                    <RulesLineText>
                        <RulesLineTextTitle>Au début du jeu</RulesLineTextTitle>
                        <RulesLineTextText>Vous devez configurer votre profil en attribuant vos points dans les options de sécurité. Il faut être stratégique pour choisir soigneusement vos options. Ainsi à chaque fois que vous éliminez un joueur en atteignant 100% du hacking vous gagnez des points qui vous permettrons d’améliorer votre sécurité.
                        </RulesLineTextText>
                    </RulesLineText>
                </RulesLine>
                <RulesLineReverse>
                    <RulesLineTextReverse>
                        <RulesLineTextTitle>Pendant la journée</RulesLineTextTitle>
                        <RulesLineTextText>vous avez des activités à risques. C’est-à-dire, vous avez des évènements et des choix à faire et en fonction de vos choix vous prenez des risques de vous faire hacker ou non. A la fin de la journée, pendant la soirée vous verrez le résultat de votre journée et votre taux de réussite ou non.
                        </RulesLineTextText>
                    </RulesLineTextReverse>
                    <RulesLineIcon className="material-icons">clear_day</RulesLineIcon>
                </RulesLineReverse>
                <RulesLine>
                    <RulesLineIcon className="material-icons">clear_night</RulesLineIcon>
                    <RulesLineText>
                        <RulesLineTextTitle>Pendant la nuit</RulesLineTextTitle>
                        <RulesLineTextText>les activités de hacking commence pour tous les joueurs. C’est sous forme de mini jeux, si vous réussissez les mini-jeux proposés le pourcentage de hacking augmente jusqu’à 100% pour éliminer un joueur bien sûr le pourcentage sera en fonction de la réussite du hacking, du résultat de la journée ainsi que les choix de protections des joueurs.
                        </RulesLineTextText>
                    </RulesLineText>
                </RulesLine>
                <RulesLineReverse>
                    <RulesLineTextReverse>
                        <RulesLineTextTitle>Les résultats de la journée</RulesLineTextTitle>
                        <RulesLineTextText>ils vous seront donc présenté. Si vous avez fait des erreurs sur les activités dans la journée en fonction de celle-ci une explication sur vos échecs vous sera présenté.
                        </RulesLineTextText>
                    </RulesLineTextReverse>
                    <RulesLineIcon className="material-icons">description</RulesLineIcon>
                </RulesLineReverse>
                <RulesLine>
                    <RulesLineIcon className="material-icons">skull</RulesLineIcon>
                    <RulesLineText>
                        <RulesLineTextTitle>Élimination</RulesLineTextTitle>
                        <RulesLineTextText>Pour éliminer une joueur il faut atteindre 100% de son hacking. Et une fois les avoir atteint, le joueur sera éliminé et pourra donc quitter la partie et en recommencera une autre. Les autres joueurs en verront leurs points augmenté.
                        </RulesLineTextText>
                    </RulesLineText>
                </RulesLine>
            </Rules>
            <Footer>
                { /* TODO Mettre les liens */ }
                <Link href="#">Mentions Légales</Link>
                <Link href="#">Conditions générales d'utilisation</Link>
                <Contact href="mailto:marius.pistoresi@etu.univ-amu.fr, mattias.gervilliers@etu.univ-amu.fr, guillaume.kusiak@etu.univ-amu.fr, melanie.hugues@etu.univ-amu.fr">
                    <FooterIcon className="material-icons">mail</FooterIcon>
                    Contactez-nous : PCFv2
                </Contact>
            </Footer>
        </HomePageStyle>
    );
}
export default Homepage;
