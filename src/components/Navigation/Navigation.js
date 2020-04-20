import React from 'react';

const Navigation = ({onSigninChange,isSignedIn }) => {
if(isSignedIn){
return(
	<nav style={{display:'flex', justifyContent:'flex-end'}}>
	<p onClick={()=>onSigninChange('signout')} className ="f3 link black pointer dim pa3 underline">Sign Out</p>
	</nav>
	);
}else{

return(
	<nav style={{display:'flex', justifyContent:'flex-end'}}>
	<p onClick={()=>onSigninChange('signin')} className ="f3 link black pointer dim pa3 underline">Sign In</p>
	<p onClick={()=>onSigninChange('register')} className ="f3 link black pointer dim pa3 underline">Register</p>
	</nav>
	);

	
}
} 

export default Navigation;