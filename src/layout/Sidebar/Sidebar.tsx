import { NavLink, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {Container, ItemsBox, MainBox, StyledLogo} from './Sidebar.styles';
import { toggleMenu } from '../../store/menu/menuSlice';
import getStandardName from '../../utils/getStandardName';
import {FaTag, FaArchive, FaTrash, FaLightbulb} from 'react-icons/fa';
import {MdEdit} from 'react-icons/md';
import {toggleTagsModal} from '../../store/modal/modalSlice';
import { v4 } from 'uuid';


const Sidebar = () => {

  const items = [
    {icon: <FaArchive/>, title:"Archive", name:"보관처리", id: v4()},
    {icon: <FaTrash/>, title:"Trash", name:"휴지통", id: v4()},
  ]
  

  const dispatch = useAppDispatch();
  const {pathname} = useLocation();
  const {isOpen} = useAppSelector((state) => state.menuSlice);
  const {tagsList} = useAppSelector((state) => state.tagsSlice);
  
  if(pathname === "/404"){
    return null;
  }

  return (
    <Container openMenu={isOpen ? "open" : ""}>
      <MainBox openMenu={isOpen ? "open" : ""}>
        <StyledLogo>
          <h1 style={{color:'gray'}}>Keep Notes</h1>
        </StyledLogo>
        <ItemsBox>
          {/* noteItem */}
          <li onClick={() => dispatch(toggleMenu(false))}>
            <NavLink
              to={"/"}
              state={`notes`}
              // isActive는 NavLink에 제공되는 props 중 하나
              className={({isActive}) => isActive ? "active-item" : "inactive-item"}
            >
              <span>
                <FaLightbulb/>
              </span>
              <span>메모</span>
            </NavLink>
          </li>
          {/* tag Items */}
          {tagsList?.map(({tag, id}) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/tag/${tag}`}
                state={`${tag}`}
                className={({isActive}) => isActive ? "active-item" : "inactive-item"}
              >
                <span>
                  <FaTag/>
                </span>
                <span>{getStandardName(tag)}</span>
              </NavLink>
            </li>
          ))}
          {/* editTag item */}
          <li 
            className='sidebar__edit-item'
            onClick={() => dispatch(toggleTagsModal({type:"edit", view:true}))}
          >
            <span>
              <MdEdit/>
            </span>
            <span>라벨 수정</span>
          </li>
          {/* other Items*/}
          {items.map(({icon, title, id, name}) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/${title.toLocaleLowerCase()}`}
                state={`${title}`}
                className={({isActive}) => isActive ? "active-item" : "inactive-item"}
              >
                <span>{icon}</span>
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
        </ItemsBox>
      </MainBox>
    </Container>
  )
}

export default Sidebar