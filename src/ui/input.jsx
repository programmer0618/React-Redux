const Input = ({label, state, setState, id, type = 'text'}) => {
	return (
		<div className='form-floating mt-2'>
			<input
				type={type}
				className='form-control'
				value={state}
				onChange={e => setState(e.target.value)}
				id={id}
				placeholder={label}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	)
}

export default Input
