import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaPostagem.css';
import useLocalStorage from 'react-use-localstorage';
import { useNavigate } from 'react-router-dom'
import { Box } from "@mui/material";
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [token, setToken] = useLocalStorage('token');
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
      navigate("/login")

    }
  }, [token])

  async function getPost() {
    await busca("/postagem", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPost()

  }, [posts.length])

  return (
    <>
      {
        posts.map(post => (
          <Box className="card-container" m={2} >
            <Card className="listPost" variant="outlined">
              <CardContent className="card-content">

                <Box className="user-box">
                  <img src="" alt="" />
                </Box>

                <Box>
                  <Typography className='titleList' variant="h5" component="p">
                    {post.tema?.titulo}
                  </Typography>
                </Box>

                <Box className="img-card">
                  <img className="img-post" src={post.imagem} />
                </Box>

                <Box>
                  <Typography className='titleList' variant="h5" component="h2">
                    {post.titulo}
                  </Typography>
                </Box>

                <Box>
                  <Typography className='titleList' variant="body2" component="p">
                    {post.texto}
                  </Typography>
                </Box>

              </CardContent>

              <Box className="divisoria"></Box>

              <CardActions className="card-actions">
                <Box className="btn-container" display="flex" justifyContent="center" mb={1.5}>

                  <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button variant="contained" className="post-btn" size='small'>
                        <CreateIcon className="post-icones" />
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button className="post-btn" variant="contained" size='small'>
                        <CloseIcon className="post-icones" />
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))
      }
    </>
  )
}

export default ListaPostagem;