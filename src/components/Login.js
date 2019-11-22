import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import Container from 'react-bootstrap/Container';
import { Button } from 'primereact/button';

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
        let login = usuario;
        axios.get(`http://localhost:8080/usuarios/${login}`)
            .then((res) => {
                if(res.data !== ""){
                    console.log(res)
                    setUsuario('');
                    setSenha('')

                }
            })
    }
    return (
        <Container className="d-flex flex-column">
            <h2>Login</h2>
            <div className="p-grid">
                <div className="p-col-4" style={{ padding: '.3em' }}><label htmlFor="usuario">Usuário</label></div>
                <div className="p-col-8">
                    <InputText id="usuario" onChange={handleOnChangeUsuario} value={usuario} />
                </div>

                <div className="p-col-4" style={{ padding: '.3em' }}><label htmlFor="senha">Senha</label></div>
                <div className="p-col-8" >
                    <Password feedback={false} id="senha" onChange={handleOnChangeSenha} value={senha} />
                </div>
                <div className="p-col-12" style={{ padding: '.5em' }}>
                    <Button
                        style={{ float: 'center', width: '12.6vw' }}
                        label="Logar"
                        onClick={handleClickLogar}
                        disabled={!usuario || !senha}
                    />
                </div>
            </div>
        </Container>
    );
}


export default Login