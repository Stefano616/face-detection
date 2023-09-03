import React from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import InputLinkForm from './components/InputLinkForm/InputLinkForm';
import DetectionPanel from './components/DetectionPanel/DetectionPanel';
import 'tachyons';
import './App.css';

// Clarifai in the front-end

// const returnClarifaiRequestOptions = (imageUrl) => {
//   // Your PAT (Personal Access Token) can be found in the portal under Authentification
//   const PAT = 'e8889a8b2fb14b25bd470e0f9a315717';
//   // Specify the correct user_id/app_id pairings
//   // Since you're making inferences outside your app's scope
//   const USER_ID = 'stefano616';
//   const APP_ID = 'AI-based-detection';
//   // Change these to whatever model and image URL you want to use
//   // const MODEL_ID = 'face-detection';
//   const IMAGE_URL = imageUrl;

//   const raw = JSON.stringify({
//     "user_app_id": {
//       "user_id": USER_ID,
//       "app_id": APP_ID
//     },
//     "inputs": [
//       {
//         "data": {
//           "image": {
//             "url": IMAGE_URL
//           }
//         }
//       }
//     ]
//   });

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Authorization': 'Key ' + PAT
//     },
//     body: raw
//   };

//   return requestOptions;
// }

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    email: '',
    name: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    // clarifai in front-end
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // Clarifai in back-end
    const clarifaiFace = data.data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onDetectClick = () => {
    this.setState({ imageURL: this.state.input });
    // Clarifai in front-end
    // fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(this.state.input))
    //   .then(response => response.json())
    //   .then(result => {
    //   if (result) {
    //     fetch('http://localhost:3001/imageUpload',
    //       {
    //         method: 'put',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //           id: this.state.user.id
    //         })
    //       })
    //       .then(response => response.json())
    //       .then(count => {
    //         this.setState(Object.assign(this.state.user, { entries: count }))
    //       })
    //       .catch(console.log)
    //   }
    //   this.displayFaceBox(this.calculateFaceLocation(result))
    // }
    // )
    // .catch(error => console.log('error', error));
    fetch('https://backend-detectionapp.onrender.com/detect',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageURL: this.state.input
        })
      }
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch('https://backend-detectionapp.onrender.com/imageUpload',
            {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(result))
      }
      )
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, route, box, imageURL } = this.state;
    return (
      <div className="App" >
        <ParticlesBg num={75} type="cobweb" color="#00FF00" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <>
            <Logo />
            <Rank username={this.state.user.name} entries={this.state.user.entries} />
            <InputLinkForm onInputChange={this.onInputChange} onDetectClick={this.onDetectClick} onKeyPress={(event) => console.log(event)} />
            <DetectionPanel box={box} imageURL={imageURL} />
          </>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div >
    );
  }
}

export default App;
