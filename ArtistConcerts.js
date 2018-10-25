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

export default class ArtistConcerts extends Component {
	constructor(props){
		super(props);
		this.state = { 
			id : null,
			concert : null
		};
	}

	apiConcertsByName(){
		this.name = this.props.artistName;
		return `https://api.songkick.com/api/3.0/search/artists.json?apikey=u7XCPTAHztwOPCRa&query=${this.props.artistName}`;
	}

	apiConcertsWithId(id){
		return `https://api.songkick.com/api/3.0/artists/${id}/calendar.json?apikey=u7XCPTAHztwOPCRa&per_page=3`;

	}

	componentDidMount(){
		fetch(this.apiConcertsByName())
			.then(resp => resp.json())
			.then(resp => {
				if(Object.getOwnPropertyNames(resp.resultsPage.results).length !== 0){
					const id = resp.resultsPage.results.artist[0].id;
					this.setState({id});
					fetch(this.apiConcertsWithId(id))
					.then(resp => resp.json())
					.then(resp => this.setState({concert : resp.resultsPage.results}))
			}});
	}

	render() {
		if(this.state.concert === null)
			return <Text>Loading</Text>;
		if(Object.getOwnPropertyNames(this.state.concert).length === 0){
			return <Text>No upcoming concerts</Text>;
		}

		//console.log(this.state.concert)
		return(

			<View style={styles.container}>
				
				{this.state.concert.event.map(
					(element, index) =>
							
						<View key={index}>
							<Text>{element.displayName.replace('at','-')}</Text>
							<Text>{element.location.city}</Text>
						</View>
				)}
			</View>
			
		)

	}
}