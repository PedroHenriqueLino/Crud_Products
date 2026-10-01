import './NavBar.css';
import avatarImg from '../img/a80fc6dd-f1e8-4a5f-a807-489fc0288a4f.jpg';
//icons
import { IconBox } from '@tabler/icons-react';
import { IconCubePlus } from '@tabler/icons-react';
import { IconTag } from '@tabler/icons-react';
import { IconChartBar } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { IconChevronDown } from '@tabler/icons-react';


//react-router
import { NavLink, Link } from 'react-router-dom';
//Context
import { useContext, useState } from 'react';
import { ThemeContext } from '../Context/ThemeContext';

const NavBar = () => {
    //tema
    const { tema } = useContext(ThemeContext);

    return (
        <>
            <div className={`nav-content ${tema}`}>

                <Link to={'/'}>
                    <div className="nav-title">

                        <div className="animation-title">
                            <IconBox stroke={1} />
                            <h1>CRUD Produtos</h1>
                        </div>

                    </div>
                </Link>

                <div className="nav">

                    <ul className="nav-list" >
                        <NavLink to={'/'} end>
                            <li>

                                <IconCubePlus stroke={1.5} />
                                <p>Produtos</p>

                            </li>
                        </NavLink>


                        <NavLink to={"/categories"}>
                            <li>
                                < IconTag stroke={1.5} />
                                <p>Categorias</p>
                            </li>
                        </NavLink>

                        <NavLink to={'/relatorio'} end>
                            <li>
                                <IconChartBar stroke={1.5} />
                                <p>Relatórios</p>
                            </li>
                        </NavLink>

                        <NavLink to={'/configuracoes'} end>
                            <li>
                                < IconSettings stroke={1.5} />
                                <p>Configurações</p>
                            </li>
                        </NavLink>
                    </ul>
                </div>

                <div className="profile">

                    <img src={avatarImg} />

                    < div className="profile-info">
                        <p>Pedro Henrique Lino</p>
                        Desenvolvedor
                    </div>

                    <a href="https://github.com/PedroHenriqueLino" target="_blank" rel="noreferrer">
                        <IconChevronDown title="GitHub" />
                    </a>

                </div>

            </div >
        </>
    )
}

export default NavBar