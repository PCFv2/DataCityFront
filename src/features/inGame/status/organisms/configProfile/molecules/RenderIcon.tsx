import React from 'react';

interface Props {
    name: string;
}

const RenderIcon: React.FC<Props> = ({ name }) => {
    let path: string;

    switch (name) {
        case 'gmail':
            path = 'src/assets/img/icons8-gmail-logo 1.svg';
            break;
        default:
            path = "";
    }

    return <img src={path} alt={`icon for ${name}`} />;
};

export default RenderIcon;