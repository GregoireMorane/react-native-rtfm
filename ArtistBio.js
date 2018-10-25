import React, { Component } from 'react';
import { StyleSheet, 
	Text, 
	View,
	Button,
	Image
  } from 'react-native';
import { Avatar } from 'react-native-elements';
export default class ArtistBio extends Component {
	constructor(props){
		super(props);
		this.state = { 
			artists : null
		};

	}
	requestUrlApi(){
		this.apiBase = 'http://audioscrobbler.com/2.0/?';
		this.apiKey = 'af05581a38f69802ba020346115c8834';
		this.method = 'artist.getInfo';
		this.artistName = this.props.artistName;
		this.limit = '1';
		return `${this.apiBase}method=${this.method}&artist=${this.artistName}&limit=${this.limit}&api_key=${this.apiKey}&format=json`;
	}

	componentDidMount(){
		fetch(this.requestUrlApi())
			.then(resp => resp.json())
			.then(resp =>  this.setState({artists : resp.artist}))
	}
	render(){
		if (this.state.artists === null){
			return <Text>Loading</Text>;
		}
		const regex = /<a.+a>/g;
		//console.log("artistBio",this.props.artistName)
		return(
			<View style={styles.container}>
				<Text style={styles.textNameArtists} >{this.state.artists.name}</Text>
				<Text variant="p" color="primary" style={{paddingVertical : 10,}}>{this.state.artists.bio.summary.replace(regex, '')}</Text>
				<Avatar xlarge rounded source={{uri : this.state.artists.image[3]["#text"]}} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 10,
		paddingRight: 10,
	},
	contentContainer: {
		paddingVertical: 20,
	},
	textH: {
		fontSize: 40,
		fontWeight: 'bold',
		paddingVertical: 30,
	},
	textNameArtists: {
		paddingVertical: 20,
		fontSize: 20,
		fontWeight: 'bold',
	},
	textTitle:{
		paddingVertical: 20,
		fontSize: 30,
		fontWeight: 'bold',
	},
});