import React from 'react'

import Login from '../views/login'
import Home from '../views/home'


import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'


import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import { AuthConsumer } from '../main/provedorAutenticacao'
// HashRouter - simula com # a raiz da aplicação na url ex: localhost:300/#/login
// Switch - alterna para a rota do componente informado
// Route - vai para a pagina da rota informada




function RotaAutenticada({ component: Component, isUsuarioAutenticado,...props }) {
    return (
        <Route { ...props } render={ (componentProps) => {

            if (isUsuarioAutenticado) {
                return (
                    <Component { ...componentProps } />
                )
            } else {
                return (
                    <Redirect to={ { pathname: '/login', state: { from: componentProps.location } } } />

                )
            }
        }}/>
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={ Login } />
                <Route path="/cadastro-usuarios" component={ CadastroUsuario } />

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={ Home } />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ ConsultaLancamentos } />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={ CadastroLancamentos } />

            </Switch>
        </HashRouter>
    )
}


export default () => (
    <AuthConsumer>
       { (context) => ( <Rotas isUsuarioAutenticado={context.isAutenticado} /> ) }
    </AuthConsumer>
)
    