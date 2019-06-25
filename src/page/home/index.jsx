import Event from '@home/core/event'

export default function Home() {
	Event.addEventListener('demo', (a, b) => { alert('test' + a + b) })
  	return <h2>Home</h2>;
}