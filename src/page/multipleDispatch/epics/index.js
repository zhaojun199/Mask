import combineEpics from '@home/core/combineEpics'

import demo from './demo.epic';
import demo2 from './demo2.epic';

export default combineEpics(demo, demo2);
