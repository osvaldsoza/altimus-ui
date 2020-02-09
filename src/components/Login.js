import React, {useState} from 'react';
import {connect} from 'react-redux'
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Panel} from 'primereact/panel';
import {loadLogin} from "../actions/LoginAction";

function Login() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    const handleOnChangeUsuario = (e) => {
        setUsuario(e.target.value)
    }
    const handleOnChangeSenha = (e) => {
        setSenha(e.target.value)
    }

    const handleClickLogar = () => {
        let login = {
            usuario,
            senha
        }
        this.props.loadLogin(login)
    }

    return (
        <div className="p-grid">
            <Panel header="Login">
                <div className="p-grid p-fluid">
                    <span className="p-float-label" style={{marginTop: '1em'}}>
                        <InputText id="email" value={usuario} onChange={handleOnChangeUsuario}/>
                        <label htmlFor="email">Username</label>
                    </span>

                    <span className="p-float-label" style={{marginTop: '2em'}}>
                        <Password feedback={false} id="senha" onChange={handleOnChangeSenha} value={senha}/>
                         <label htmlFor="senha">Senha</label>
                      </span>

                    <Button
                        label="Logar"
                        onClick={handleClickLogar}
                        disabled={!usuario || !senha}
                    />
                </div>
            </Panel>
        </div>
    );
}

const mapStateToProps = state =>{
    return{
        login:state.LoginReducer.login
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        loadLogin:(login)=> dispatch(loadLogin(login))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)