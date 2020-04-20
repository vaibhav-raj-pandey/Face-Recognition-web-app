import React from 'react';



const Rank = ({user}) => {
return(
	<div>
	<div className='f4 white'>
		<p>
			{`${user.name} your entry count  is...`}
		</p>
	</div>
		<p className='f2 white'>
			{`${user.entries}`}
		</p>
	</div>
	);
} 

export default Rank;