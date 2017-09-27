import React from 'react';
import styled from 'styled-components';
import baseTheme from 'theme/default/index';

const Button = styled.button`
	background: ${baseTheme.primary};
	color: ${baseTheme.secondary};
	border: 3px solid ${baseTheme.secondary};
	border-radius: ${baseTheme.borderRadius}px;
	transition: 0.5s all 0s;

	&:hover {
		background: ${baseTheme.secondary};		
		color: ${baseTheme.primary};
	}
	&:active {
		color: #000;
	}
`;

export {
	Button
};

export default Button;