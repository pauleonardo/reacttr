// index.jsx
import React, { PropTypes } from 'react'
import styles from './input-tex.css'

const propTypes = {
	onSendText: PropTypes.func.isRequired,
	onCloseText: PropTypes.func.isRequired,
	userNameToReply:  PropTypes.string.isRequired
}

function InputText({onSendText,onCloseText,userNameToReply}) {
	return(
		<form className={styles.form} onSubmit={onSendText}>
			<textarea className={styles.text} name='text'>
				{(userNameToReply) ? `@${userNameToReply} `: ''}
			</textarea>
			<div className={styles.buttons}>
				<button className={styles.close} onClick={onCloseText}>Cerrar</button>
				<button className={styles.send} type='submit'>Enviar</button>
			</div>
			
		</form>
	)
}

InputText.propTypes = propTypes

export default InputText 