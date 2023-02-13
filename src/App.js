import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg'
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaceRegions = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const faceArray = clarifaiFaceRegions.map(element => {
      const elementData = element.region_info.bounding_box;
      return {
        leftCol: elementData.left_col * width,
        topRow: elementData.top_row * height,
        rightCol: width - (elementData.right_col * width),
        bottomRow: height - (elementData.bottom_row * height)
      }
    });
    return faceArray;
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input}, () => {
      const raw = JSON.stringify({
        "user_app_id": {
          "user_id": "zonit93",
          "app_id": "my-first-application"
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": this.state.imageUrl
                    }
                }
            }
        ]
      });
      
      fetch('http://localhost:3000/apikey')
        .then(response => response.json())
        .then(data => {
          const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': data 
            },
            body: raw
          };
          return requestOptions;
        })
        .then(requestOptions => {
          fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
          .then(response => {
            if (response.ok) {
              fetch('http://localhost:3000/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id
                  })
                }
              )
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count}))  
              })
              .catch(console.log);
            }
            return response.json()
          })
          .then(result => {
            this.displayFaceBox(this.calculateFaceLocation(result));
          })
          .catch(error => console.log('error', error));
        })
    });
  }


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return(
      <div className='App'>
        <ParticlesBg type="cobweb" bg={true} num={100} color="#ffffff"/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
          ? <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div> 
          : (route === 'signin' 
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
        }
      </div>
    )
  }
}

export default App;
