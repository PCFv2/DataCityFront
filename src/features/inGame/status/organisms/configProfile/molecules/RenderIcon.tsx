import React from 'react';
import {ReactComponent as Gmail} from "src/assets/img/inGame/config_profile/gmail.svg";
import {ReactComponent as LocalAddress} from "src/assets/img/inGame/config_profile/mail.svg";
import {ReactComponent as Thunderbird} from "src/assets/img/inGame/config_profile/thunderbird.svg";
import {ReactComponent as Schema} from "src/assets/img/inGame/config_profile/pattern.svg";
import {ReactComponent as Pin} from "src/assets/img/inGame/config_profile/pin.svg";
import {ReactComponent as Password} from "src/assets/img/inGame/config_profile/password.svg";
import {ReactComponent as Biometric} from "src/assets/img/inGame/config_profile/biometric.svg";
import {ReactComponent as Instagram} from "src/assets/img/inGame/config_profile/instagram.svg";
import {ReactComponent as Phone} from "src/assets/img/inGame/config_profile/phone.svg";
import {ReactComponent as WhatsApp} from "src/assets/img/inGame/config_profile/whatsapp.svg";
import {ReactComponent as Signal} from "src/assets/img/inGame/config_profile/signal.svg";
import {ReactComponent as Edge} from "src/assets/img/inGame/config_profile/edge.svg";
import {ReactComponent as Chrome} from "src/assets/img/inGame/config_profile/chrome.svg";
import {ReactComponent as Brave} from "src/assets/img/inGame/config_profile/brave.svg";
import {ReactComponent as Tor} from "src/assets/img/inGame/config_profile/tor.svg";
import {ReactComponent as Drive} from "src/assets/img/inGame/config_profile/drive.svg";
import {ReactComponent as Dropbox} from "src/assets/img/inGame/config_profile/dropbox.svg";
import {ReactComponent as Nas} from "src/assets/img/inGame/config_profile/storage.svg";
import {ReactComponent as Hdd} from "src/assets/img/inGame/config_profile/save.svg";
import {ReactComponent as Cookies} from "src/assets/img/inGame/config_profile/cookie.svg";
import {ReactComponent as SomeCookies} from "src/assets/img/inGame/config_profile/some_cookies.svg";
import {ReactComponent as NoCookies} from "src/assets/img/inGame/config_profile/some_cookies.svg";
import {ReactComponent as Bing} from "src/assets/img/inGame/config_profile/bing.svg";
import {ReactComponent as Google} from "src/assets/img/inGame/config_profile/google.svg";
import {ReactComponent as Ecosia} from "src/assets/img/inGame/config_profile/ecosia.svg";
import {ReactComponent as Qwant} from "src/assets/img/inGame/config_profile/qwant.svg";
import {ReactComponent as Windows} from "src/assets/img/inGame/config_profile/windows.svg";
import {ReactComponent as MacOs} from "src/assets/img/inGame/config_profile/macos.svg";
import {ReactComponent as Linux} from "src/assets/img/inGame/config_profile/linux.svg";

interface Props {
    name: string;
}

const RenderIcon: React.FC<Props> = (props: { name: string }) => {
    switch (props.name) {
        // Mail
        case 'Gmail':
            return <Gmail />;
        case 'Adresse Local':
            return <LocalAddress/>;
        case 'Thunderbird':
            return <Thunderbird/>;
        // Phone Security
        case 'Schema':
            return <Schema/>;
        case 'Pin':
            return <Pin/>;
        case 'Mot de passe':
            return <Password/>;
        case 'Biométrie':
            return <Biometric/>;
        // Discussion app
        case 'Instagram':
            return <Instagram/>;
        case 'Appel téléphonique':
            return <Phone/>;
        case 'WhatsApp':
            return <WhatsApp/>;
        case 'Signal':
            return <Signal/>;
        // Browser
        case 'Edge':
            return <Edge/>;
        case 'Chrome':
            return <Chrome/>;
        case 'Brave':
            return <Brave/>;
        case 'TOR':
            return <Tor/>;
        // Storage
        case 'Google drive':
            return <Drive/>;
        case 'Dropbox':
            return <Dropbox/>;
        case 'NAS':
            return <Nas/>;
        case 'Disque dur':
            return <Hdd/>;
        // Cookies
        case 'Accepter tout':
            return <Cookies/>;
        case 'Refuser quand tu penses':
            return <SomeCookies/>;
        case 'I don\'t care about cookies':
            return <NoCookies/>;
        // Search
        case 'Bing':
            return <Bing/>;
        case 'Google':
            return <Google/>;
        case 'Ecosia':
            return <Ecosia />;
        case 'Qwant':
            return <Qwant/>;
        // OS
        case 'Windows':
            return <Windows/>;
        case 'MacOs':
            return <MacOs/>;
        case 'Linux':
            return <Linux/>;
        default:
            return <p>Nothing</p>
    }
};

export default RenderIcon;