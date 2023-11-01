import React, { useContext, useEffect, useState } from 'react';
import { ButtonCard, CardPost, CardStyle, ContainerCard, ContainerCardHome, ContainerPerfil, ConteudoCard, EditPost, ImgCard, ImgPost, MensagemCard, NomeCard, PerfilUsuario, TituloCard } from './style';
import { getPostAll } from '../../services/requests';
import Comentar from '../Comentar/Comentar';
import { GlobalStateContect } from '../../GlobalState/GlobalStateContext';

function Card() {

  const [loading, setLoading] = useState(true);
  const [forumTopics, setForumTopics] = useState([]);
  const {selectedPostId} = useContext(GlobalStateContect)

  
  console.log(selectedPostId);

 
  useEffect(() => {
    getPostAll(setForumTopics)
  }, [])

  return (
    <>
      {selectedPostId ? (
        forumTopics.filter((titulo) => {
        titulo.post_title.toLowerCase()
        .include(selectedPostId.toLowerCase())
        .map((item) => {
          <div key={item.post_id}>
            <CardStyle>
              <ImgCard src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fsafetec.com.br%2Fprodutividade%2Finfraestrutura-ti%2F&psig=AOvVaw35grxQ-fRKnIbvOZm4dZNw&ust=1698935410251000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNjzqOWBo4IDFQAAAAAdAAAAABAE' alt='Imagem card'/>
              <NomeCard>{item.creator_username}</NomeCard>
              <MensagemCard>{item.post_created_at}</MensagemCard>

              <TituloCard>{item.post_title}</TituloCard>
              <ImgPost src={item.post_image} alt='Imagem post'/>

              <CardPost>
                <ConteudoCard>{item.post_content}</ConteudoCard>
              </CardPost>
            </CardStyle>
          </div>
        })
      })
    ):(
      <ContainerCardHome>
        {loading ? (
          <ContainerCard>
            {forumTopics && forumTopics.map(dado => (
              <CardStyle key={dado.post_id}>
                <PerfilUsuario>
                  <ImgCard src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fsafetec.com.br%2Fprodutividade%2Finfraestrutura-ti%2F&psig=AOvVaw35grxQ-fRKnIbvOZm4dZNw&ust=1698935410251000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNjzqOWBo4IDFQAAAAAdAAAAABAE' alt='Foto de perfil'/>
                  <ContainerPerfil>
                    <NomeCard>{dado.creator_username}</NomeCard>
                    <MensagemCard>{dado.post_created_at}</MensagemCard>
                  </ContainerPerfil>
                </PerfilUsuario>

                <TituloCard>{dado.post_title}</TituloCard>
                <CardPost>
                  <ImgPost src={dado.post_image} alt='Foto post'/>
                  <ConteudoCard>{dado.post_content}</ConteudoCard>
                </CardPost>

                <EditPost>
                  <Comentar
                    postId={dado.post_id}
                    comments={dado.comments}
                    autorId={dado.created_id}
                  />
                </EditPost>

              </CardStyle>
            ))}</ContainerCard>):
            (<p>Loading...</p>)
          
          }
      </ContainerCardHome>
    )}


    </>
  )
}

export default Card