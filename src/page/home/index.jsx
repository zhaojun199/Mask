import Event from '@home/core/event'
const event = new Event()

export default function Home() {
	event
		.addEventListener('demo', (a, b) => { cout('test' + a + b) })
		.addEventListener('demo', (a, b) => { cout('test2' + a + b) })
  	return <h2>Home</h2>;
}