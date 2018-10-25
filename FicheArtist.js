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
});

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
					<Text style={{paddingVertical: 20,}} onPress={this.handleClickRenderApp}>RTFM</Text>
					<ArtistBio artistName={this.props.artistName} />
					<ArtistConcerts artistName={this.props.artistName} />
					{/* <Tracks artistName={this.props.artistName} /> */}
				</View>
			</ScrollView>
		)
	}
}