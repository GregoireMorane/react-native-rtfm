import React from 'react';
import { StyleSheet, 
        Text, 
        View,
        Button,
        TextInput,
        ScrollView
      } from 'react-native';
import { Header } from 'react-native-elements';
import SimilarArtists from './SimilarArtists';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userInput: '',
      finalSearch: null,
      suggestions: [],
      ShowAutocompletion: false
    }
  }
  
  // Instructions à exécuter sur le changement de l'input:
  // afficher le nom d'artiste dans la searchbar & appeler l'autocomplétion
  searchBarDisplay = (event) => {
    console.log("searchbar",event)
    this.setState({userInput: event})
    if(event.length !== 0){
      this.requestAutocompletion(event)
      this.setState({ShowAutocompletion:true})
      //console.log('searchDisplay', this.state)
    }
    else
      this.setState({ShowAutocompletion: false})
  }
  
  //  Appel de l'API pour utiliser la méthode d'autocomplétion
  requestAutocompletion = (artist) => {
    fetch(`http://audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&limit=5&api_key=af05581a38f69802ba020346115c8834&format=json`)
    .then(resp => resp.json())
    .then(resp => this.setState({suggestions : resp.results.artistmatches.artist}))
    }
  
  // Instructions à exécuter sur le clic du bouton submit
  handleSubmit = (event) => {
    this.setState({finalSearch: event})
    this.setState({userInput: event})
    this.setState({ShowAutocompletion:false})
    //console.log('submit', this.state) 
  }
  
  // Instructions à exécuter sur le clic d'un nom d'artiste
  handleArtistClick = (event) => {
    //console.log("artistClick", event)
    this.setState({finalSearch: event})
    this.setState({userInput: event})
    this.setState({ShowAutocompletion:false})
    //console.log('artistClick' , this.state)
  }
  
  render() {
    if(this.state.finalSearch !== null)
      //console.log("oui", this.state.finalSearch)
      return <SimilarArtists artistInput={this.state.finalSearch} />
    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <Text style={styles.textH}>RTFM</Text>
            <TextInput
                style={styles.searchbar}
                placeholder="Your artist..."
                value={this.state.userInput}
                onChangeText={(text) => this.searchBarDisplay(text)}
            />
            <Button title="Go !" onPress={() => this.handleSubmit(this.state.userInput)} />
            <View>
                {this.state.ShowAutocompletion && (this.state.suggestions.map((element, i) => <Text style={{paddingVertical : 5,}} key={i} onPress={() => this.handleArtistClick(element.name)}>{element.name}</Text>
                ))}
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
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  searchbar: {
    padding: 20,
  },
	contentContainer: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textH: {
    fontSize: 40,
    fontWeight: 'bold',
  }
});
