import { createContext } from 'react'

export default createContext({
    name: 'tony',
    setName: () => {},
    age: 18,
    setAge: () => {},
    sex: 'female',
    setSex: () => {},
});