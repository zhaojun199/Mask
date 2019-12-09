
## controller

本质还是reducer，只不过通过一层封装和转化，改写成了简单语法

controller 必须是纯函数

controller -> controllerToReducer -> combineController -> reducers

### ControllerDemo
```
export default class DemoController extends Controller {

	namespace = 'list';

	initial = {
		a: 1,
	}

	showList({ payload }, state) {
		return payload;
	}
}
```

### controllerToReducer

``` 

import { getClassName } from '../util'

// controller转换成reducer
export default function controllerToReducer(Controller) {
	const entry = new Controller()
	const ns = entry.namespace
    //	初始值
	const initialValue = { '@@INIT': true, ...entry.initial }
	
	const reducer = {}

	reducer[ns] = (state = initialValue, action) => {

		const { type, ...otherAction } = action
		const actionType = type
		const extractActionType = actionType.split('/')
		//	截取action.type 中的第一部分，匹配命名空间
		if (ns === extractActionType[0]) {

			const isFunc = typeof entry[extractActionType[1]] === 'function'
			
			if (isFunc) {
            	//	执行controller方法，将结果吐给reducer
				let newState = entry[extractActionType[1]](otherAction);
				return {
					...state,
					...(entry[extractActionType[1]](otherAction))
				}
			}
		}
		return state
	}

	return reducer
}
 
``` 
