<template>
	<div>
		<vue-advanced-chat
			height="calc(100vh - 20px)"
			:current-user-id="currentUserId"
			:rooms="JSON.stringify(rooms)"
			:rooms-loaded="true"
			:messages="JSON.stringify(messages)"
			:messages-loaded="messagesLoaded"
			:show-files="showFiles"
			@send-message="sendMessage($event.detail[0])"
			@fetch-messages="fetchMessages($event.detail[0])"
		/>
	</div>
</template>

<script>
import { register } from 'vue-advanced-chat'
import { aiAxios } from '@/utils/request'

register()

export default {
	data() {
		return {
			currentUserId: '1234',
			rooms: [
				{
					roomId: '1',
					roomName: 'Room 1',
					avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
					users: [
						{ _id: '1234', username: 'John Doe' },
						{ _id: '4321', username: 'John Snow' },
					]
				}
			],
			messages: [],
			messageActions:[],
			messagesLoaded: false,
			showFiles:true,
			
		}
	},

	methods: {
		fetchMessages({ options = {} }) {
			this.messagesLoaded = false

			// use timeout to imitate async server fetched data
			setTimeout(() => {
				this.messages = []
				this.messagesLoaded = true
			})


		},

		addMessages(reset) {
			const messages = []

			for (let i = 0; i < 3; i++) {
				messages.push({
					_id: reset ? i : this.messages.length + i,
					content: `${reset ? '' : 'paginated'} message ${i + 1}`,
					senderId: '4321',
					username: 'John Doe',
					date: '13 November',
					timestamp: '10:20',
				})
			}
			return messages
		},

		getClientRobotReply(reqs) {
          aiAxios.post('/chat/completions', { //地址改为对应的接口
				//信息根据接口要求变动
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer APIkey'
				},
				data: {
					"model": "gpt-3.5-turbo",
					"messages": [{ "role": 'user', "content": reqs.content }],
					"temperature": 0.7
				}
			}).then(res => {
				let text = res.data.results[0].values.text;
				const messages = []
				messages.push({
					_id: this.messages.length,
					content: text,//text
					senderId: '4321',
					timestamp: new Date().toString().substring(16, 21),
				date: new Date().toDateString()
            })
            return messages
          }).catch(err => {
            alert(err.message)
          })
        },

		sendMessage(message) {
			this.messages = [
				...this.messages,
				{
					_id: this.messages.length,
					content: message.content,
					senderId: this.currentUserId,
					timestamp: new Date().toString().substring(16, 21),
					date: new Date().toDateString(),
					files:[]
				}
			]
			//this.getClientRobotReply(message)
		

			this.messages = [
				...this.messages,
				{
					_id: this.messages.length,
					content: 'Hello!',
					senderId: '4321',
					timestamp: new Date().toString().substring(16, 21),
					date: new Date().toDateString(),
				}
			]

		},


		addNewMessage() {
			setTimeout(() => {
				this.messages = [
					...this.messages,
					{
						_id: this.messages.length,
						content: 'NEW MESSAGE',
						senderId: '1234',
						timestamp: new Date().toString().substring(16, 21),
						date: new Date().toDateString()
					}
				]
			}, 2000)
		}
	}
}
</script>

<style lang="scss">
body {
	font-family: 'Quicksand', sans-serif;
}
</style>