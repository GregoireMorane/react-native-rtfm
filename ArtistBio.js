import React, { Component } from 'react';
import { StyleSheet, 
	Text, 
	View,
	Button,
	Image
  } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

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
				<Text style={{paddingVertical: 20,}} >{this.state.artists.name}</Text>
				<Text variant="p" color="primary">{this.state.artists.bio.summary.replace(regex, '')}</Text>
				<Image style={{ width : 150, height : 150}} source={{uri : this.state.artists.image[3]["#text"]}} />
			</View>
		)
	}
}
