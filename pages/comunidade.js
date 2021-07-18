import React, { useContext } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu } from '../src/lib/AlurakutCommons';
import { ProfileCommunity } from "../src/components/ProfileSidebar";
import { AuthContext } from '../src/contexts';
import { ProfileBox, CommunityBox } from "../src/components/ProfileRelationsBox";


export default function Comunidade() {
    const [comunidades, setComunidades] = React.useState([]);
    const [comunidade, setComunidade] = React.useState([]);
    const { tema } = useContext(AuthContext);

    let codigo = window.location.search.replace(/([^\d])+/gim, '');
    React.useEffect(function () {
        // API GraphQL
        fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
                'Authorization': 'e46fc736178ca517106d2f542f5466',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "query": `query{
                    allCommunities(filter:{
                      id: {in: ${codigo}}
                    }){
                        title
                        id
                        imageUrl
                        creatorSlug
                        numberUser
                        description
                        date
                    }
                    }` })
        })
            .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
            .then((respostaCompleta) => {
                const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
                setComunidade(comunidadesVindasDoDato[0])
            })
    }, [codigo])




    const pessoasFavoritas = [
        'juunegreiros',
        'omariosouto',
        'peas',
        'rafaballerini',
        'marcobrunodev',
        'felipefialho',
    ]

    function getCommunity() {

        fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
                'Authorization': 'e46fc736178ca517106d2f542f5466',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "query": `query {
          allCommunities {
            id 
            title
            imageUrl
            creatorSlug
            numberUser
            description
            date
          }
      }` })
        })
            .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
            .then((respostaCompleta) => {
                const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
                setComunidades(comunidadesVindasDoDato)
                console.log(comunidadesVindasDoDato)
            })

    }

    React.useEffect(function () {
        getCommunity();

    }, [])


    return (
        <div style={{ flex: 1, backgroundColor: tema.fundo }}>
            <AlurakutMenu />
            <MainGrid>
                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileCommunity comunidade={comunidade} />
                </div>
                <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
                    <Box>
                        <h1 className="title" style={{ fontSize: 22 }}>
                            {comunidade.title}
                        </h1>
                        <p >
                            <a className="boxLink" style={{ fontSize: 10 }}>
                                {` Inicio > Comunidades > outros >`}
                            </a>
                            <a style={{ fontSize: 10 }}> {comunidade.title}</a>
                        </p>

                        <div style={{ marginTop: 20 }}>

                            <div style={{ padding: 5, backgroundColor: "#D9E6F6" }}>
                                <p style={{ fontSize: 12 }}>Descrição: {comunidade.description} </p>

                            </div>
                            <div style={{ padding: 5 }}>
                                <p style={{ fontSize: 12 }}>Idioma: Potuguês (Brasil)</p>
                            </div>
                            <div style={{ padding: 5, backgroundColor: "#D9E6F6" }}>
                                <p style={{ fontSize: 12 }}>Categoria: Outros</p>

                            </div>

                            <div style={{ padding: 5 }}>
                                <p style={{ fontSize: 12 }}>José: ADM - Comunidades</p>
                            </div>

                            <div style={{ padding: 5, backgroundColor: "#D9E6F6" }}>
                                <p style={{ fontSize: 12 }}>Tipo: Publica</p>

                            </div>

                            <div style={{ padding: 5 }}>
                                <p style={{ fontSize: 12 }}>Fórum: Não-anônimo</p>

                            </div>

                            <div style={{ padding: 5, backgroundColor: "#D9E6F6" }}>
                                <p style={{ fontSize: 12 }}>Local: Brasil</p>
                            </div>

                            <div style={{ padding: 5 }}>
                                <p style={{ fontSize: 12 }}>Criado em: {comunidade.date}</p>

                            </div>


                        </div>

                    </Box>

                    <Box>
                        <div style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <a className="subTitle">Fórum</a>

                            <button style={{ backgroundColor: '#D9E6F6', marginLeft: 400, color: '#000' }}>
                                Criar tópico
                            </button>

                        </div>

                        {comunidade.id === "48399309" ?
                            <>
                                <div>
                                    <div key='1' style={{
                                        display: "flex",
                                        marginTop: "12px",
                                        marginBottom: "8px",
                                        height: 80,
                                        borderBottom: "1px solid #e1e1e1",
                                    }}>
                                        <figure style={{ width: "10%", marginBottom: "10px" }}>
                                            <a key='1'><img src={`https://github.com/alvesVitor.png`} style={{ borderRadius: 7 }} /></a>
                                        </figure>
                                        <div style={{ marginLeft: 10, width: '90%', marginTop: 10 }}>
                                            <p style={{ fontSize: 12 }}>Acordar cedo é bom só para você lembrar que pode dormir mais e voltar a dormir</p>
                                            <span style={{ fontSize: 10 }}>por: <a style={{ textDecoration: "none", color: "#2E7BB4" }}> @AlvesVitor</a></span>
                                        </div>
                                    </div>



                                </div>

                                <div>

                                    <div key='1' style={{
                                        display: "flex",
                                        marginTop: "12px",
                                        marginBottom: "8px",
                                        height: 80,
                                        borderBottom: "1px solid #e1e1e1",
                                    }}>
                                        <figure style={{ width: "10%", marginBottom: "10px" }}>
                                            <a key='1'><img src={`https://github.com/RafaBertoni.png`} style={{ borderRadius: 7 }} /></a>
                                        </figure>
                                        <div style={{ marginLeft: 10, width: '90%', marginTop: 10 }}>
                                            <p style={{ fontSize: 12 }}>Felicidade é ir dormir sem colocar despertador</p>
                                            <span style={{ fontSize: 10 }}>por: <a style={{ textDecoration: "none", color: "#2E7BB4" }}> @RafaBertoni</a></span>
                                        </div>
                                    </div>


                                </div>


                            </> :

                            <div>
                                <div key='1' style={{
                                    display: "flex",
                                    marginTop: "12px",
                                    marginBottom: "8px",
                                    height: 20,

                                }}>
                                    <p style={{ fontSize: 10 }}>Nenhum tópico aberto no momento</p>
                                </div>

                            </div>



                        }




                    </Box>
                </div>
                <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
                    <ProfileBox title="Membros (6.169.047)" pessoasFavoritas={pessoasFavoritas} />

                    <CommunityBox title="Comunidades relacionadas (1.569)" comunidades={comunidades} />
                </div>
            </MainGrid>
        </div>
    )
}
