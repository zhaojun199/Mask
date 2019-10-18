import { formatTime } from '../util'

function defaultTitleFormatter(options) {
    const { duration } = options;

    return (action, time, took) => {
        const parts = ['action'];

        parts.push(`%c${String((action || {}).type)}`);
        if (duration) {
            parts.push(`%c(in ${(took || 0).toFixed(2)} ms)`);
        }

        return parts.join(' ');
    };
}

function printBuffer(buffer, options) {
	const {
        logger,
        actionTransformer,
        titleFormatter = defaultTitleFormatter(options),
        collapsed,
        colors,
        level,
        diff
    } = options;

    const isUsingDefaultFormatter = typeof options.titleFormatter === 'undefined'

	buffer.forEach((logEntry, key) => {
		const { started, startedTime, action, prevState, error } = logEntry;
		cout('buffer ====> ', { started, startedTime, action, prevState, error })
		let { took, nextState } = logEntry;
		const nextEntry = buffer[key + 1];

		if (nextEntry) {
            nextState = nextEntry.prevState;
            took = nextEntry.started - started;
        }

        const formattedAction = actionTransformer(action);
        const isCollapsed = typeof collapsed === 'function' ? collapsed(() => nextState, action, logEntry) : collapsed;
	    const formattedTime = formatTime(startedTime);

        const titleCSS = colors.title ? `color: ${colors.title(formattedAction)};` : '';
        const headerCSS = ['color: gray; font-weight: lighter;'];
        headerCSS.push(titleCSS);
		if (options.duration) {
            headerCSS.push('color: gray; font-weight: lighter;');
        }

        const title = titleFormatter(formattedAction, formattedTime, took);
		// log配置
		if (window.log === false) {
            return;
        }

        if (window.log && window.log !== '') {
            const pattern = new RegExp(window.log);

            if (!pattern.test(title)) {
                return;
            }
        }

        try {
            if (isCollapsed) {
                if (colors.title && isUsingDefaultFormatter) {
                    logger.groupCollapsed(`[Middleware-Log @ ${formatTime(new Date())}] %c${title}`, ...headerCSS);
                } else {
                    logger.groupCollapsed(title);
                }
            } else if (colors.title && isUsingDefaultFormatter) {
                logger.group(`[Middleware-Log @ ${formatTime(new Date())}] %c${title}`, ...headerCSS);
            } else {
                logger.group(title);
            }
        } catch (e) {
            logger.log(title);
        }
	})
}

export default printBuffer