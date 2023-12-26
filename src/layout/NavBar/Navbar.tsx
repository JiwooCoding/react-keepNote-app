import React from 'react'
import { Container, StyledNav } from './Navbar.styles';
import {FiMenu} from 'react-icons/fi';
import { ButtonFill } from '../../styles/styles';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { toggleMenu } from '../../store/menu/menuSlice';
import { toggleCreateNoteModal } from '../../store/modal/modalSlice';
import getStandardName from '../../utils/getStandardName';

const Navbar = () => {

  //useLoaction: 현재 URL 정보 가지고 와준다.
  const {pathname, state} = useLocation();
  const dispatch = useAppDispatch();
  console.log('현재 url주소',pathname)
  console.log('state',state);
  if(pathname === "/404"){
    return null;
  }

  return (
    <StyledNav>
      <div className='nav__menu'>
        <FiMenu onClick={() => dispatch(toggleMenu(true))}/>
      </div>
      <Container>
        <div className='nav__pate-title'>{getStandardName(state)}</div>
        {state !== "Trash" && state !== "Archive" &&
          <ButtonFill 
          onClick={() => dispatch(toggleCreateNoteModal(true))}
          className='nav__btn'  
          >
          <span>+</span>
        </ButtonFill>
        }
      </Container>
    </StyledNav>
  )
}

export default Navbar