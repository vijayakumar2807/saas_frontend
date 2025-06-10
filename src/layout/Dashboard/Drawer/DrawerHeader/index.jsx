import PropTypes from 'prop-types';

// project imports
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/logo';
import { textAlign } from '@mui/system';

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }) {
  return (
 <>
 <h2 style={{textAlign:'center',color:'#1e90ff'}}>SAAS</h2>
 </>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
