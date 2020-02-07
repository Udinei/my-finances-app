﻿import LocalStorageService from './localStorageService'

export const USUARIO_LOGADO =  '_usuario_logado'

export default class AuthService{

    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO)
    }

    static logar(usuario){
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario)
    }

    static obterUsuarioLogado(){
        return LocalStorageService.obterItem(USUARIO_LOGADO);

    }
} 