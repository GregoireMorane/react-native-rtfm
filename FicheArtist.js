import React, { Component } from 'react';
import { StyleSheet, 
	Text, 
	View,
	ScrollView,
	Button,
	Image
  } from 'react-native';
import ArtistBio from './ArtistBio';
import ArtistConcerts from './ArtistConcerts';
import App from './App';
// import Tracks from './Tracks';

export default class FicheArtist extends Component {

	constructor(props){
    	super(props);
    	this.state = { 
			renderApp : false,
		}
	}

	handleClickRenderApp = () => {
		this.setState({renderApp : true})
	}

	render(){
		//console.log("ficheArtist.js", this.props.artistName)

		if(this.state.renderApp === true)
			return <App />

		return(
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<View style={styles.container}>
					<Text style={styles.textH} onPress={this.handleClickRenderApp}>RTFM</Text>
					<ArtistBio artistName={this.props.artistName} />
					<ArtistConcerts artistName={this.props.artistName} />
					{/* <Tracks artistName={this.props.artistName} /> */}
				</View>
			</ScrollView>
		)
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
		paddingVertical: 20,
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