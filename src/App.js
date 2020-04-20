import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';




const initialState={
   input:'',
      imageURL:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
            id:'',
            name:'',
            email:'',
            entries:0,
            joined:''
      }
}

class App extends Component{
  constructor(){
    super();
    this.state=initialState
    }

loaduser=(data)=>{
  this.setState({user:{
            id:data.id,
            name:data.name,
            email:data.email,
            entries:data.entries,
            joined:data.joined
  }})
}

componentDidMount(){
  fetch('http://localhost:3000/')
  .then(response=>response.json()
    .then(console.log))
}

onInputChange=(event)=>{
  this.setState({input:event.target.value});
}

calculateFaceLocation=(data)=>{
    const clarifaiData= data.outputs[0].data.regions[0].region_info.bounding_box
    const image=document.getElementById('inputimage');
    const width= Number(image.width)
    const height= Number(image.height)
    return{
      
      leftCol: clarifaiData.left_col*width,
      rightCol: width-clarifaiData.right_col*width,
      topRow: clarifaiData.top_row*height,
      bottomRow: height-clarifaiData.bottom_row*height

    }


}

makeFaceBox=(box)=>{
  this.setState({box:box})

}

onSubmit=()=>{
  this.setState({imageURL:this.state.input})
  fetch('http://localhost:3000/imageURL',{
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    input:this.state.input
  })
}).then(response=> response.json())
  .then(
response=>{
  if(response){
  fetch('http://localhost:3000/image',{
  method:'put',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    id:this.state.user.id
  })
}).then(response=>response.json())
  .then(count=>{
    this.setState(Object.assign(this.state.user,{entries:count}))
      }).catch(console.log)
}
     this.makeFaceBox(this.calculateFaceLocation(response))})
    .catch(err => console.log(err));
}

onSigninChange=(route)=>{
  if(route==='signout'){
    this.setState(initialState)
  }else if(route==='home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route:route})
}


  render(){
   const {isSignedIn,imageURL,box,route,user} = this.state;
     return (
    
    <div className="App">
      <Particles className='particles'
       params={{
                    particles: {
                        number: {
                          value:150,
                        
                      }}
                        
                    }
                } />
      <Navigation  onSigninChange={this.onSigninChange} isSignedIn={isSignedIn}/>
      {route==='home'?
      
      <div><Logo />
      <Rank user={user} />
      <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
      
      <FaceRecognition box={box} imageURL={imageURL} />
 
    </div>:(route==='signin'||route==='signout'?<Signin loaduser={this.loaduser}onSigninChange={this.onSigninChange}/>:
      <Register loaduser={this.loaduser}onSigninChange={this.onSigninChange}/>
      )
  }
     </div>
  );
  }
 
}

export default App;
