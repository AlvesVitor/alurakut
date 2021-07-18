import React from 'react';
import { ProfileRelationsBoxWrapper } from "../ProfileRelations";
import { useRouter } from 'next/router';

export function ProfileBox(props) {

    return (
        <ProfileRelationsBoxWrapper>

            <h2 className="smallTitle">
                {props.title}
            </h2>

            <ul>
                {props.pessoasFavoritas.map((itemAtual) => {
                    return (
                        <li key={itemAtual}>
                            <a href={`/users/${itemAtual}`}>
                                <img src={`https://github.com/${itemAtual}.png`} />
                                <span>{itemAtual}</span>
                            </a>
                        </li>
                    )
                })}

            </ul>

        </ProfileRelationsBoxWrapper>

    );
}

export function CommunityBox(props) {
    const router = useRouter();

    return (

        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {props.title}
            </h2>
            {props.comunidades.length > 0 &&
                < ul >
                    {
                        props.comunidades.map((itemAtual) => {
                            return (
                                <li key={itemAtual.id}>

                                    <a onClick={() => {
                                        router.push({
                                            pathname: '/community',
                                            query: { data: itemAtual.id }
                                        })

                                    }}>
                                        <img src={itemAtual.imageUrl} />
                                        <span>{itemAtual.title}</span>
                                    </a>

                                </li>
                            )
                        })
                    }
                </ul>
            }
        </ProfileRelationsBoxWrapper>
    )
}