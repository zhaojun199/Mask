export default function getMountableComponent(v) {
	return props => {
        return <div {...props} />;
    }
}