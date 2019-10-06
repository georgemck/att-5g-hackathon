import { AppStore, CouchData, User } from "./MasterStore";
import PouchDB from 'pouchdb'

const streamerVid: HTMLIFrameElement = document.querySelector('#streamerVideo')
const switchButton: HTMLButtonElement = document.querySelector('#switchButton')
const voteYes: HTMLButtonElement = document.querySelector('#voteYes')
const voteNo: HTMLButtonElement = document.querySelector('#voteNo')

let leftUserActive = true
const resolveUser = () => leftUserActive ? 'leftUser' : 'rightUser'
const store = new AppStore(() => {})

switchButton.onclick = () => {
	leftUserActive = !leftUserActive
	streamerVid.src = store.couchData[resolveUser()].streamUrl
}
voteYes.onclick = () => {
	store.pouch.get('game').then((doc) => {
		const data = doc as unknown as CouchData
		data[resolveUser()].ratingAudience++
		store.pouch.put(doc)
	})
}
voteNo.onclick = () => {
	store.pouch.get('game').then((doc) => {
		const data = doc as unknown as CouchData
		data[resolveUser()].ratingAudience--
		store.pouch.put(doc)
	})
}