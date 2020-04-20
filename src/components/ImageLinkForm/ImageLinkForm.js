import React from 'react';
import  './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onSubmit}) => {
return(
	<div>
	<div>
	<p className='f4 '>
	{'This is cool image detector , give it a try, enter image URL..'}
	</p>
	</div>
	<div className=' pa3 shadow-3 br2 center back' style={{width:'600px'}}>
	<input className='f4 center w-70 pa2' type='text' onChange={onInputChange}/>
	<button className='w-30 f4 center dib ph3 pv2 link grow white bg-light-purple pointer' onClick={onSubmit}>Detect</button>
	</div>
	</div>
	);
} 

export default ImageLinkForm;