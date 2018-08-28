import { injectGlobal } from 'styled-components';
import { COLORS } from './constants';

injectGlobal`
  	body {
    	margin: 0;
  		padding: 0;
		color: ${COLORS.text}
  		font-family: sans-serif;
  	}
`;