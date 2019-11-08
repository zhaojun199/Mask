import Launcher from '@home/core/launcher';

import roomApp from './app/index';

let app = new roomApp();

export const mount = (componentProps) => {
	let div = document.getElementById('room-mount-point');
	app = new roomApp();

	if (!div) {
	    div = document.createElement('div');
	    div.id = 'room-mount-point';
	    div.className = 'CustomGroup';
	    document.body.appendChild(div);
	}
	Launcher.render(app, document.getElementById('room-mount-point'), componentProps)
};

// mount({testStr: 123123})
export default Launcher.getMountableComponent(app);
