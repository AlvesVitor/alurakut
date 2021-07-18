import React from 'react';
import { AlurakutProfileSidebarMenuDefault, ProfileSidebarCommunity } from '../../lib/AlurakutCommons';
import Box from "../Box";


export function ProfileUser(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export function ProfileCommunity(props) {
  const data = props.comunidade;

  return data ? (

    <Box as="aside">
      <img src={data.imageUrl} style={{ borderRadius: '8px', height: 130, width: 130 }} />
      <hr />

      <p>
        <a className="boxLink" >
          {data.title}
        </a>
      </p>

      <p style={{ fontSize: 10 }}>
        ({data.numberUser} membros)
      </p>
      <hr />

      <ProfileSidebarCommunity />
    </Box>

  ) : (
    <>
    </>
  )
}