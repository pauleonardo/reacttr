// index.jsx
import React, { Component } from 'react'
import 'normalize-css'
import style from './app.css'

import Header from '../Header'
import Main from '../Main'

class App extends Component {
	constructor(){
		super()
		this.state = {
			user:{
				photoUrl: 'https://pbs.twimg.com/profile_images/703605130252455937/ltPwOZlb.jpg',
				email: 'pauldiazfiguera@gmail.com',
				onOpenText : false,
				displayName: 'Paul Díaz'
			}
		}
	}
	render() {
		return (
			<div>
				<Header />
				<Main 
				user={this.state.user}
				/>
			</div>
		)
	}
}

export default App