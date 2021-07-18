import React from 'react';
import { ProfileRelationsBoxWrapper } from "../ProfileRelations";
import Link from 'next/link'

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
                                    <Link href={`/community/${itemAtual.id}`}>

                                        <a>

                                            <img src={itemAtual.imageUrl} />
                                            <span>{itemAtual.title}</span>
                                        </a>


                                    </Link>




                                </li>
                            )
                        })
                    }
                </ul>
            }
        </ProfileRelationsBoxWrapper>
    )
}