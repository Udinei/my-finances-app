﻿import React from 'react'
import NavbarItem from '../components/navbaritem'

import { AuthConsumer } from '../main/provedorAutenticacao'


function Navbar(props) {
    
    return (

        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>

                { props.isUsuarioAutenticado &&
                    <button className="navbar-toggler" id="nav-btn"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                  }

                    <div className="navbar-collapse collapse" id="navbarResponsive">
                        <ul className="navbar-nav mr-auto">
                            <NavbarItem render={ props.isUsuarioAutenticado } href="#/home" label="Home" />
                            <NavbarItem render={ props.isUsuarioAutenticado } href="#/cadastro-usuarios" label="Usuários" />
                            <NavbarItem render={ props.isUsuarioAutenticado } href="#/consulta-lancamentos" label="Lançamentos" />
                            <NavbarItem render={ props.isUsuarioAutenticado } onClick={ props.deslogar } href="#/login" label="Sair" />

                        </ul>

                    </div>
                      
            </div>
      </div >

    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Navbar isUsuarioAutenticado={ context.isAutenticado } deslogar={context.encerrarSessao}  />) }
    </AuthConsumer>
)