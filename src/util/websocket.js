class Socket {
	static CODE = {
		connecting: 0,
		open: 1,
		closing: 2,
		closed: 3,
	};
	// ws;
	// url = '';
	// options = {};
	// status = -1;
	// timer;
	constructor(url, options = {}) {
		if (!window.WebSocket) {
			// alert('浏览器不支持WebSocket，请更换浏览器或升级版本');
			throw Error('浏览器不支持WebSocket，请更换浏览器或升级版本');
		}
		if (Object.prototype.toString.call(options).toLowerCase() !== '[object object]') {
			throw Error('options 参数错误！');
		}
		this.url = url;
		this.wsInstance = new window.WebSocket(url);
		this.init(options);
	}
	// 初始化配置
	init(options) {
		const OPTIONS = {
			hbtime: 10000, //	心跳时间
			rctime: 1000, //	重连时间
		};
		for (const e in OPTIONS) {
			if (options[e]) {
				OPTIONS[e] = options[e];
			}
		}
		this.options = OPTIONS;
		this.wsInstance.onerror = () => {
			this.reconnect();
		};
	}
	// 连接成功检验
	check = () => {
		return new Promise(resolve => {
			this.wsInstance.onopen = () => {
				this.status = Socket.CODE.open;
				this.wsInstance.onmessage = event => {
					this.getMessage(event);
				};
				resolve();
			};
		});
	};
	// 是否已连接
	isOpen() {
		return this.status === Socket.CODE.open;
	}
	// 发送消息
	send(content) {
		if (this.isOpen()) {
			this.heartbeat();
			this.wsInstance.send(content);
		} else {
			console.warn('请确认是否check');
			this.reconnect();
		}
	}
	// 接收消息
	getMessage(event) {
		this.heartbeat();
		if (this.onMessage) {
			let data;
			try {
				data = JSON.parse(event.data);
			} catch (e) {
				data = event.data;
			}
			this.onMessage(data);
		}
	}
	// 断开连接
	close() {
		this.wsInstance.close();
		this.status = Socket.CODE.closed;
	}
	// 心跳处理
	heartbeat() {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.wsInstance.send(' ');
		}, this.options.hbtime);
	}
	// 重连处理
	reconnect() {
		this.status = -1;
		setTimeout(() => {
			this.wsInstance = new window.WebSocket(this.url);
		}, this.options.rctime);
	}
}

// how to use
/*
const ws = new Socket('ws://10.1.72.36:9993');
ws.check().then(() => {
  ws.send(123);
});
ws.onMessage = data => {
  console.log(data);
};
*/
export default Socket;