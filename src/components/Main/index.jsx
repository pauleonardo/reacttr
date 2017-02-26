// index.jsx
import React, { Component } from 'react'
import uuid from 'uuid'

import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'

class Main extends Component {
	constructor (props) {
		super(props)

		this.state = {
			user: Object.assign({}, this.props.user, { retweets:[] }, { favorites: []}),
			userNameToReply: '',
			openText: false,
			messages: [{
				id: uuid.v4(),
				text: 'Mensaje del Tweet',
				picture: 'https://pbs.twimg.com/profile_images/703605130252455937/ltPwOZlb.jpg',
				displayName: 'Paul Díaz',
				username: 'pdiaz',
				date: Date.now() - 18000,
				retweets: 0,
				favorites: 0
			},
			{
				id: uuid.v4(),
				text: 'Este es un nuevo Mensaje',
				picture: 'https://pbs.twimg.com/profile_images/703605130252455937/ltPwOZlb.jpg',
				displayName: 'Paul Díaz',
				username: 'pdiaz',
				date: Date.now() - 180000,
				retweets: 0,
				favorites: 0				
			}]
		}
		//COLOCANDO EL BINDEO EN EL CONSTRUCTOR PARA NO HACERLO EN LOS COMPONENTES
		this.handleSendText = this.handleSendText.bind(this)
		this.handleCloseText = this.handleCloseText.bind(this)
		this.handleOpenText = this.handleOpenText.bind(this)
		this.handleRetweet = this.handleRetweet.bind(this)
		this.handleFavorite = this.handleFavorite.bind(this)
		this.handleReplyTweet = this.handleReplyTweet.bind(this)
	}

	handleSendText (event){
		event.preventDefault()
		let newMessage = {
			id: uuid.v4(),
			picture: this.props.user.photoUrl,
			username: this.props.user.email.split('@')[0],
			displayName : this.props.user.displayName,
			date: Date.now(),
			text: event.target.text.value
		}
		
		this.setState({
			messages: this.state.messages.concat([newMessage]),
			openText: false
		})
	}

	handleCloseText (event){
		event.preventDefault()
		this.setState({openText: false, userNameToReply: ''})
	}

	handleOpenText (event) {
		event.preventDefault()
		this.setState({openText: true})
	}

	renderOpenText (){
		if (this.state.openText) {
			return (
				<InputText 
				onSendText={this.handleSendText}
				onCloseText={this.handleCloseText}
				userNameToReply={this.state.userNameToReply}
				/>
			)
		}
	}

	handleRetweet (msgId){
		let alreadyRetweeted = this.state.user.retweets.filter( rt => rt === msgId)

		if (alreadyRetweeted.length === 0) {
			let message = this.state.messages.map( msg => {
				if ( msg.id === msgId ) {
					msg.retweets++
				}
				return msg				
			})
			let user = Object.assign( {}, this.state.user)

			user.retweets.push(msgId)

			this.setState({
				messages:this.state.messages,
				user
			})
		}

	}

	handleFavorite (msgId){
		let alreadyFavorited = this.state.user.favorites.filter( fav => fav === msgId)
		if (alreadyFavorited.length === 0) {
			let message = this.state.messages.map( msg => {
				if( msg.id === msgId) {
					msg.favorites++
				}
				return msg
			})

			let user = Object.assign( {}, this.state.user)

			user.favorites.push(msgId)

			this.setState({
				messages:this.state.messages,
				user
			})
		}
	}

	handleReplyTweet (msgId, userNameToReply){
		this.setState({
			openText: true,
			userNameToReply: userNameToReply
		})
	}

	render() {
		return (
			<div>
				<ProfileBar 
				picture={this.props.user.photoUrl}
				username={this.props.user.email.split('@')[0]}
				onOpenText={this.handleOpenText}
				/>
				{this.renderOpenText()}
				<MessageList 
					messages={this.state.messages} 
					onRetweet={this.handleRetweet}
					onFavorite={this.handleFavorite}
					onReplyTweet={this.handleReplyTweet}
				/>
			</div>
		)
	}
}

export default Main