type QuestionData = {
    category1: Question[]
    category2: Question[]
    category3: Question[]
}
export const QUESTIONS: QuestionData = {
    category1: [
        {
            question: "Vous avez reçu un mail de votre banque (DataBank) avec un document à consulter via un lien, l'expediteur du mail est 'no-reply@datablank'. Que faites-vous ?",
            choices: {
                choice1: {
                    value: "Vous téléchargez le document ",
                    isTrue: false,
                },
                choice2: {
                    value: "Vous vérifiez l'expediteur du mail",
                    isTrue: true,
                },
                choice3: {
                    value: "Vous répondez au mail",
                    isTrue: false,
                }
            }
        },
        {
            question: "Vous êtes sur Facedebouc. Vous recevez un message de la part d’un inconnu qui vous dit :  « Bonjour, je vous propose de vous vendre un Yphone gratuitement. Vous devez juste me donner les coordonnées suivantes :  nom, prénom, adresse et votre code de CB. Bien sûr vous n’allez rien payer !». Que faites-vous ?",
            choices: {
                choice1: {
                    value: "Vous acceptez la super offre",
                    isTrue: false,
                },
                choice2: {
                    value: "Vous demandez une garantie de recevoir votre Yphone",
                    isTrue: false,
                },
                choice3: {
                    value: "Vous ne répondez pas et bloquez l’utilisateur",
                    isTrue: true,
                }
            }
        },
        {
            question: "Vous décidez d’aller sur Stom pour voir les derniers jeux sortis et vous remarquez le nouveau jeu super populaire WarGummies, il est en promotion mais malgré tout hors de votre budget. Vous pouvez toujours aller sur le site Jeux-gratuis.me pour le télécharger gratuitement. Tous vos amis y jouent. Que faites-vous ?",
            choices: {
                choice1: {
                    value: "Vous allez sur le site Jeux-gratuis.me",
                    isTrue: false,
                },
                choice2: {
                    value: "Vous décidez de l’acheter",
                    isTrue: true,
                },
                choice3: {
                    value: "Vous attendez le mois prochain pour l'acheter",
                    isTrue: true,
                }
            }
        }
    ],
    category2: [
        {
            question: "Vous naviguez sur le web et vous allez sur une boutique en ligne de vêtements Axipress.fr, on vous demande de vous inscrire pour continuer votre visite sur le site et de renseigner votre carte bancaire. Que faites-vous ?",
            choices: {
                choice1: {
                    value: "Vous créez un compte",
                    isTrue: false,
                },
                choice2: {
                    value: "Vous regardez seulement ce à quoi vous avez accès",
                    isTrue: false,
                },
                choice3: {
                    value: "Vous quittez le site",
                    isTrue: true,
                }
            }
        },
        {
            question: "Vous êtes sur le site EliBaBa-vetement-pas-chere.ru et vous allez acheter une veste Dadidas à 25 €. Que faites-vous ?",
            choices: {
                choice1: {
                    value: "Vous achetez l’article",
                    isTrue: false,
                },
                choice2: {
                    value: "Vous décidez de ne pas achetez l’article",
                    isTrue: true,
                },
                choice3: {
                    value: "Vous allez sur le site Dadidas.com pour l’acheter",
                    isTrue: true,
                }
            }
        },
        {
            question: "Vous êtes sur le site EliBaBa-vetement-pas-chere.ru et vous allez acheter une veste Dadidas à 25 €. Que faites-vous ?",
            choices: {
                choice1: {
                    value: "Vous achetez l’article",
                    isTrue: false,
                },
                choice2: {
                    value: "Vous décidez de ne pas achetez l’article",
                    isTrue: true,
                },
                choice3: {
                    value: "Vous allez sur le site Dadidas.com pour l’acheter",
                    isTrue: true,
                }
            }
        }
    ],
    category3: [
        {
            question: "Vous êtes dans un café et vous avez la possibilité d’accéder à un wifi public. Vous recevez une notification indiquant que vous n’avez plus de forfait donc vous ne pouvez plus accéder à votre vidéo de Mooncraft. Que faites-vous ?",
            choices: {
                choice1: {
                    value: "Vous activez un VPN",
                    isTrue: true,
                },
                choice2: {
                    value: "Vous vous connectez au réseau public",
                    isTrue: false,
                },
                choice3: {
                    value: "Vous ne vous connectez pas au réseau",
                    isTrue: false,
                }
            }
        },
        {
            question: "Vous êtes dans votre bureau de travail. Vous vous dirigez aux toilettes et vous remarquez une clé USB sur le sol. Vous la récupérez. Vous ne voyez rien démontrant à qui elle appartient. Que faites-vous ?",
            choices: {
                choice1: {
                    value: "Vous la branchez sur votre ordinateur pour voir si il y aurait un indice sur son propriétaire",
                    isTrue: false,
                },
                choice2: {
                    value: "Vous décidez d’aller à l’accueil et la mettez dans le placard aux objets trouvés",
                    isTrue: true,
                },
                choice3: {
                    value: "Vous la remettez sur le bureau le plus proche",
                    isTrue: false,
                }
            }
        },
        {
            question: "Vous allez sur le site Stom.fr pour acheter le jeu Wirfrim. Sauf que vous regardez le prix et c’est au-dessus de votre budget d’origine. Que faites-vous ?",
            choices: {
                choice1: {
                    value: "Vous décidez de le télécharger sur un site gratuit",
                    isTrue: false,
                },
                choice2: {
                    value: "Vous décidez d’aller sur EnsteinGaming pour le payer moins chère",
                    isTrue: false,
                },
                choice3: {
                    value: "Vous craquez votre budget et l'achetez quand même",
                    isTrue: true,
                }
            }
        }
    ]

}


/**
 *     "3": {
 *         0: {
 *             question: "Vous êtes dans un café et vous avez la possibilité d’accéder à un wifi public. Vous recevez une notification indiquant que vous n’avez plus de forfait donc vous ne pouvez plus accéder à votre vidéo de Mooncraft. Que faites-vous ?",
 *             choices: {
 *                 choice1: {
 *                     value: "Vous activez un VPN",
 *                     isTrue: true,
 *                 },
 *                 choice2: {
 *                     value: "Vous vous connectez au réseau public",
 *                     isTrue: false,
 *                 },
 *                 choice3: {
 *                     value: "Vous ne vous connectez pas au réseau",
 *                     isTrue: false,
 *                 }
 *             }
 *         },
 *         1: {
 *             question: "Vous êtes dans votre bureau de travail. Vous vous dirigez aux toilettes et vous remarquez une clé USB sur le sol. Vous la récupérez. Vous ne voyez rien démontrant à qui elle appartient. Que faites-vous ?",
 *             choices: {
 *                 choice1: {
 *                     value: "Vous la branchez sur votre ordinateur pour voir si il y aurait un indice sur son propriétaire",
 *                     isTrue: false,
 *                 },
 *                 choice2: {
 *                     value: "Vous décidez d’aller à l’accueil et la mettez dans le placard aux objets trouvés",
 *                     isTrue: true,
 *                 },
 *                 choice3: {
 *                     value: "Vous la remettez sur le bureau le plus proche",
 *                     isTrue: false,
 *                 }
 *             }
 *         },
 *         2: {
 *             question: "Vous allez sur le site Stom.fr pour acheter le jeu Wirfrim. Sauf que vous regardez le prix et c’est au-dessus de votre budget d’origine. Que faites-vous ?",
 *             choices: {
 *                 choice1: {
 *                     value: "Vous décidez de le télécharger sur un site gratuit",
 *                     isTrue: false,
 *                 },
 *                 choice2: {
 *                     value: "Vous décidez d’aller sur EnsteinGaming pour le payer moins chère",
 *                     isTrue: false,
 *                 },
 *                 choice3: {
 *                     value: "Vous craquez votre budget et l'achetez quand même",
 *                     isTrue: true,
 *                 }
 *             }
 *         }
 *     }*/