import React, { useContext } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileUser } from "../src/components/ProfileSidebar";
import DepoimentosBox from "../src/components/DepoimentosBox";
import { AuthContext } from '../src/contexts';
import { ProfileBox, CommunityBox } from "../src/components/ProfileRelationsBox";

export default function Home(props) {
  const usuario = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
  const [depoimentos, setDepoimentos] = React.useState([]);
  const [comentario, setComentario] = React.useState([]);
  const { tema } = useContext(AuthContext);

  const pessoasFavoritas = [
    'mvmaciel',
    'RafaBertoni',
    'LuisLeite97',
    'omariosouto',
    'carloszaparoli',
    'juunegreiros',

  ]
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
        "query": `query {
          allCommunities {
            id 
            title
            imageUrl
            creatorSlug
          }
      }` })
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        setComunidades(comunidadesVindasDoDato)
      })

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
          allDeclarations(orderBy:[id_DESC]){
            id
            user
            text
            date
          }
        }` })
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        const depoimentosVindosDoDato = respostaCompleta.data.allDeclarations;
        setDepoimentos(depoimentosVindosDoDato)
      })


  }, [])



  return (
    <div style={{flex: 1, backgroundColor: tema.fundo}}>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileUser githubUser={usuario} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">Deixe seu depoimento</h2>
            <form onSubmit={function handleDepoimentos(e) {
              e.preventDefault();

              if (comentario === null || comentario === "") {
                alert("O campo esta nulo")
                return;
              }
              let data = new Date();
              let minuto = String(data.getMinutes()).padStart(2, "0");
              let hora = String(data.getHours()).padStart(2, "0");
              let dia = String(data.getDate()).padStart(2, '0');
              let mes = String(data.getMonth() + 1).padStart(2, '0');
              let ano = data.getFullYear();
              let dataAtual = dia + '/' + mes + '/' + ano + ' - ' + hora + ':' + minuto;

              const comunidade = {
                text: comentario,
                user: usuario,
                date: dataAtual
              }

              fetch('/api/depoimentos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
                .then(async (response) => {
                  const dados = await response.json();
                  const depoimento = dados.registroCriado;
                  const depoiemntosAtualizados = [depoimento, ...depoimentos];
                  setDepoimentos(depoiemntosAtualizados)
                  setComentario('');
                })
            }}>
              <div>
                <input
                  placeholder="Digite seu comentario"
                  name="comentario"
                  aria-label="Digite seu comentario"
                  type="text"
                  value={comentario}
                  onChange={e => setComentario(e.target.value)}
                />
              </div>

              <button>
                Salvar depoimento
              </button>
            </form>
          </Box>

          <DepoimentosBox title="Depoimentos" items={depoimentos} />

        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileBox title={`Amigos (${pessoasFavoritas.length})`} pessoasFavoritas={pessoasFavoritas} />

          <CommunityBox title={`Comunidades (${comunidades.length})`} comunidades={comunidades} />

        </div>
      </MainGrid>
    </div>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((resposta) => resposta.json())


  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    },
  }
}