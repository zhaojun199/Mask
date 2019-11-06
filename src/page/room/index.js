import Launcher from '@home/core/launcher';
import roomApp from './app/index';

const app = new roomApp();

let div = document.getElementById('room-mount-point');

if (!div) {
    div = document.createElement('div');
    div.id = 'room-mount-point';
    div.className = 'CustomGroup';
    document.body.appendChild(div);
}

Launcher.render(app, document.getElementById('room-mount-point'));
