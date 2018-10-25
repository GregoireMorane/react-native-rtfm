import React, { Component } from 'react';
import { StyleSheet, 
	Text, 
	View,
	ScrollView,
	Button,
	Image,
	TouchableHighlight,
  } from 'react-native';
import { Avatar } from 'react-native-elements';
import FicheArtist from './FicheArtist';
import App from './App';

export default class SimilarArtists extends Component {

	constructor(props){
    	super(props);
    	this.state = { 
			artists : null,
			artistInfo : null,
			renderFicheArtist : false,
			renderFicheArtistSimilar : false,
			index: 0,
			renderSimilarArtists: false,
			error: false,
			renderApp : false,
		};
  	}

	requestUrlApi(artist= ""){
    	this.apiBase = 'http://audioscrobbler.com/2.0/?';
		this.apiKey = 'af05581a38f69802ba020346115c8834';
		this.method = 'artist.getsimilar';
		this.limit = '4';
		return `${this.apiBase}method=${this.method}&artist=${artist}&limit=${this.limit}&api_key=${this.apiKey}&format=json`;
	}
	
	componentDidMount(){
		fetch(this.requestUrlApi(this.props.artistInput))
			.then(resp => resp.json())
			.then(resp => {
				//console.log("titi", resp.similarartists)
				if(resp.similarartists !== undefined && !resp.error){
					//console.log("tata", resp.similarartists.artist)
					this.setState({artists : resp.similarartists.artist})
				} else{
					//console.log("tutu")
					this.setState({error : true})
				}
			})
		fetch(`http://audioscrobbler.com/2.0/?method=artist.getInfo&artist=${this.props.artistInput}&limit=1&api_key=af05581a38f69802ba020346115c8834&format=json`)
			.then(resp => resp.json())
			.then(resp => this.setState({artistInfo : resp.artist}))
	}

	handleClick = () => {
		this.setState({renderFicheArtist : true});
	}
	// handleClickSimilar = () => {
	// 	this.setState({renderFicheArtistSimilar : true})
	// }

	handleClickSimilar = (event) => {
		this.setState({renderFicheArtistSimilar: true});
		this.setState({index: event});
	}

	handleClickListSimilar = (event) => {
		this.setState({renderSimilarArtists: true})
		this.setState({index : event})
	}

	handleClickRenderApp = () => {
		this.setState({renderApp : true})
	}

	render() {
		// if(this.state.artistInfo !== null)
		// 	console.log("artistInfo", this.state.artistInfo.image) 
		// if(this.state.artists !== null)
		// 	console.log("artists", this.state.artists.image)
		if(this.state.artists === null || this.state.artistInfo === null)
			if(this.state.error === true)
				return (
					<View style={styles.container}>
						<Text style={{paddingVertical: 50,}} onPress={() => this.handleClickRenderApp()}>RTFM</Text>
						<Text>If you see this, 1) pls pick an artist, 2) your internet connection sucks !</Text>
					</View>
				)
			else
				return <Text>Loading</Text>
		if(this.state.renderFicheArtist === true)
			//console.log("renderFicheArtist", this.state.artistInfo.name)
			return <FicheArtist artistName={this.state.artistInfo.name} />
		if(this.state.renderFicheArtistSimilar === true && this.state.index !== null)
			//console.log("renderFicheArtistSimilar", this.state.artists[this.state.index].name)
			return <FicheArtist artistName={this.state.artists[this.state.index].name} />
		if(this.state.renderSimilarArtists === true && this.state.index !== null)
			//console.log("renderSimilarArtists", this.state.artists[this.state.index].name)
			return <SimilarArtists artistInput={this.state.artists[this.state.index].name} />
		if(this.state.renderApp === true)
			return <App />

		return (
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<View style={styles.container} >
					<Text style={styles.textH}  onPress={() => this.handleClickRenderApp()}>RTFM</Text>
					<Text style={styles.textNameArtists} onPress={() => this.handleClick()}>{this.state.artistInfo.name}</Text>
					<TouchableHighlight onPress={() => this.handleClick()}>
						<Avatar xlarge rounded source={{ uri: this.state.artistInfo.image[2]["#text"] }} />
					</TouchableHighlight>
					<Text>{'\n'}</Text>
					<Text style={styles.textTitle}>Similar Artists:</Text>
					<Text>{'\n'}</Text>
					<View style={styles.container}>
						{this.state.artists.map(
							(element, i) =>
								<View key={i} style={styles.container}>
									<Text style={styles.textNameArtists} onPress={() => this.handleClickSimilar(i)} id={i}>{element.name}</Text>
									<TouchableHighlight onPress={() => this.handleClickSimilar(i)}>
										<Avatar xlarge rounded source={{ uri: element.image[2]["#text"] }} />
									</TouchableHighlight>
									<Button title="Similar artists" onPress={() => this.handleClickListSimilar(i)} id={i} />
								</View>
						)}
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
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
	}
});