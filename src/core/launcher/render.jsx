import React from 'react';

// eslint-disable-next-line import/no-cycle
import getMountableComponent from './getMountableComponent';

export default function render(app, node, nodeData) {

    if (node === null) throw new Error('找不到挂载点')

    const MountableComponent = getMountableComponent(app);
    const ReactDOM = require('react-dom');

    if (nodeData) {
        ReactDOM.render(<MountableComponent {...nodeData} />, node);
        return;
    }
    ReactDOM.render(<MountableComponent />, node);
}