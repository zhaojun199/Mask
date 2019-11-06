import React from 'react';

import getMountableComponent from './getMountableComponent';

export default function render(app, node, nodeData) {
    const ReactDOM = require('react-dom');
	return ReactDOM.render(app, node);

    // if(node === null) throw new Error('找不到挂载点')

    // const MountableComponent = getMountableComponent(app);
    // const ReactDOM = require('react-dom');
    // if (nodeData) {
    //     return ReactDOM.render(<MountableComponent nodeData={nodeData} />, node);
    // }
    // return ReactDOM.render(<MountableComponent />, node);
}