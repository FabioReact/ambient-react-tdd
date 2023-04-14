import React, { useCallback, useMemo, useState } from 'react'

const Button = React.memo(({
	content = "Button",
	callback = () => null,
}: {
	content?: string
	callback?: any
}) => {
	console.log('Render de Button ', content)
	return (
		<button onClick={callback}>{content}</button>
	)
})

const SomeOtherComponent = React.memo(({ name }: any) => {
	console.log('Render de SomeOtherComponent - by ', name)
	return (
		<p>Random Component</p>
	)
})

const expensiveCompute = (a: number, b: number) => {
	// return setTimeout(() => {
	// 	return a * b
	// }, 200)
	return a * b
}

const Optimisations = () => {
	const [counter, setcounter] = useState(0)
	const [value, setvalue] = useState(1)
	const increment = useCallback(() => setcounter(c => c+value), [value])
	const decrement = useCallback(() => setcounter(c => c-value), [value])
	const result = useMemo(() => expensiveCompute(value, 5), [value])
	const name = 'Fabio'
	return (
		<section>
			<h1>Optimisations</h1>
			<p>Counter: {counter}</p>
			<p>Result of compute function: {result}</p>
			<select name="" id="" onChange={e => {
				console.log(e.target.value)
				setvalue(+e.target.value)
			}}>
				<option value="1">1</option>
				<option value="2">2</option>
			</select>
			<SomeOtherComponent name={name} />
			<Button callback={increment} content="Incrementer" />
			<Button callback={decrement} content="Decrementer"/>
		</section>
	)
}

export default Optimisations