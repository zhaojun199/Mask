import { PureComponent } from 'react'
import ctxContainer from './ctxContainer'
import Father from './Father';

export default class CtxDemo extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            name: 'tony hanks',
            age: 19,
            sex: 'female',
        }
        this.setName = this.setName.bind(this)
        this.setAge = this.setAge.bind(this)
        this.setSex = this.setSex.bind(this)
    }

    setName(name) {
        this.setState({ name })
    }

    setAge(age) {
        this.setState({ age })
    }

    setSex(sex) {
        this.setState({ sex })
    }

    render() {
        return <ctxContainer.Provider
            value={{
                name: this.state.name,
                setName: this.setName,
                age: this.state.age,
                setAge: this.setAge,
                sex: this.state.sex,
                setSex: this.setSex,
            }}
        >
            <Father />
        </ctxContainer.Provider>
    }
}