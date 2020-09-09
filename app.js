const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const server = new Koa()

server.use(bodyparser())

const autores = [
    {
        id: 1,
        pnome: "Rodrigo",
        unome: "Paczkovski",
        email: "rodrigo@gmail.com",
        senha: "123456",
        deletado: false
    }
]

const posts = [
    {
        id: 1,
        titulo: "Título 01",
        subtitulo: "Subtitulo 01",
        id_autor: 1,
        publicado: false,
        deletado: false
    }
]

/**
 * Adicionar um novo post 
 */
const adicionarPost = (dados) => {

    if (dados == null) return null

    const novoPost = {
        id: posts.length + 1,
        titulo: `${dados.titulo !== undefined ? dados.titulo : "Post sem título"}`,
        subtitulo: `${dados.titulo !== undefined ? dados.titulo : ""}`,
        id_autor: dados.id_autor,
        publicado: false,
        deletado: false
    }

    posts.push(novoPost)
    return novoPost
}

/**
 * Obter todos os posts
 */
const obterPosts = () => {
    return posts
}

/**
 * Obeter post pelo ID
 */
const obterPostPeloId = (id_post) => {
    return posts.find(({ id, deletado }) => id === id_post && deletado === false)
}

/**
 * Obeter o Index do post pelo ID
 */
const obterIndexDoPostPeloId = (id_post) => {
    return posts.findIndex(({ id, deletado }) => id === id_post && deletado === false)
}

/**
 * Atualizar um autor existente no array
 */
const atualizarPost = (id_post, dados) => {

    if (id_post == null || dados == null) return null

    const indexPost = obterIndexDoPostPeloId(id_post)
    const dadosDoPost = obterPostPeloId(id_post)

    const id_autor = dados.id_autor !== undefined ? dados.id_autor : dadosDoPost.id_autor
    const publicado = dados.publicado !== undefined ? dados.publicado : dadosDoPost.publicado

    const post = {
        id: dadosDoPost.id,
        titulo: `${dados.titulo !== undefined ? dados.titulo : dadosDoPost.titulo}`,
        subtitulo: `${dados.subtitulo !== undefined ? dados.subtitulo : dadosDoPost.subtitulo}`,
        id_autor: id_autor,
        publicado: publicado,
        deletado: false
    }

    posts.splice(indexPost, 1, post)

    return post
}

/**
 * Remover autor do array
 */
const removerPost = (id_post) => {
    const indexPost = obterIndexDoPostPeloId(id_post)
    let post = obterPostPeloId(id_post)

    const postRemovido = {
        id: post.id,
        titulo: post.titulo,
        subtitulo: post.subtitulo,
        id_autor: post.id_autor,
        publicado: false,
        deletado: true
    }
    autores.splice(indexPost, 1, postRemovido)

    return {}
}


/**
 * Verificar campos do array de posts
 */
const verificarCamposPost = (dados) => {

    const propriedades = ['titulo', 'subtitulo', 'id_autor', 'publicado']

    for (let props in dados) {
        for (let propsDoAutor of propriedades) {
            if (props === propsDoAutor && props !== 'id') {
                return true
            }
        }
    }
    return false
}

///////////////////////

/**
 * Verificar email e senha 
 */
const camposEmailESenhaPreenchidos = (dados) => {
    if (dados.email && dados.senha) {
        return true
    }
    return false
}
/**
 * Verificar campos do array de autores
 */
const verificarCamposAutores = (dados) => {

    const propriedades = ['pnome', 'unome', 'email', 'senha']

    for (let props in dados) {
        for (let propsDoAutor of propriedades) {
            if (props === propsDoAutor && props !== 'id') {
                return true
            }
        }
    }
    return false
}

/**
 * Adicionar um novo autor ao array de autores
 */
const adicionarAutor = (dados) => {

    if (dados == null) return null

    const novoAutor = {
        id: autores.length + 1,
        pnome: `${dados.pnome !== undefined ? dados.pnome : ""}`,
        unome: `${dados.unome !== undefined ? dados.unome : ""}`,
        email: dados.email,
        senha: dados.senha,
        deletado: false
    }

    autores.push(novoAutor)
    return novoAutor
}

/**
 * Atualizar um autor existente no array
 */
const atualizarAutor = (id_autor, dados) => {

    if (id_autor == null || dados == null) return null

    const indexAutor = obterIndexDoAutorPeloId(id_autor)
    const dadosDoAutor = obterAutorPeloId(id_autor)

    // if(!verificarSenhaDoAutor(indexAutor, dados[senha])) return null

    const autor = {
        id: dadosDoAutor.id,
        pnome: `${dados.pnome !== undefined ? dados.pnome : dadosDoAutor.pnome}`,
        unome: `${dados.unome !== undefined ? dados.unome : dadosDoAutor.unome}`,
        email: `${dados.email !== undefined ? dados.email : dadosDoAutor.email}`,
        senha: `${dados.senha !== undefined ? dados.senha : dadosDoAutor.senha}`,
        deletado: false,
    }

    autores.splice(indexAutor, 1, autor)

    return autor
}

/**
 * Remover autor do array
 */
const removerAutor = (id_autor) => {
    const indexAutor = obterIndexDoAutorPeloId(id_autor)
    let autor = obterAutorPeloId(id_autor)

    const autorRemovido = {
        id: autor.id,
        pnome: autor.pnome,
        unome: autor.unome,
        email: autor.email,
        senha: autor.senha,
        deletado: true
    }
    autores.splice(indexAutor, 1, autorRemovido)

    return {}
}

/**
 * Obeter autor pelo ID
 */
const obterAutorPeloId = (id_autor) => {
    return autores.find(({ id, deletado }) => id === id_autor && deletado === false)
}

/**
 * Obeter o Index do autor pelo ID
 */
const obterIndexDoAutorPeloId = (id_autor) => {
    return autores.findIndex(({ id, deletado }) => id === id_autor && deletado === false)
}

/**
 * Obeter array com todos autores
 */
const obterAutores = () => {
    return autores
}

/**
 * Verificar sse autor possui post
 */
const verificarSeAutorPossuiPost = (autor_id) => {
  return posts.find(({id_autor}) => id_autor === autor_id)
}

/**
 * Tratamento das mensagens de erro
 */
const mensagemDeErro = (mesagem = 'Página não encontrada!') => {
    return {
        status: 'erro',
        dados: {
            mensagem: `${mesagem}`
        }
    }
}

/**
 * Tratamento das mensagens de sucesso
 */
const mensagemDeSucesso = (dados) => {
    return {
        status: 'sucesso',
        dados: dados,
    }
}

server.use(ctx => {
    const parametros = ctx.url.split("/").filter(item => item)
    const id = !isNaN(parametros[1]) ? Number(parametros[1]) : null

    const metodo = ctx.method

    if (parametros[0] === 'autor' && id === null) {
        if (metodo === 'GET') {
            ctx.status = 200
            ctx.body = mensagemDeSucesso(obterAutores())
        } else if (metodo === 'POST') {
            const dados = ctx.request.body
            const emailESenha = camposEmailESenhaPreenchidos(dados)

            if (emailESenha) {
                ctx.status = 200
                ctx.body = mensagemDeSucesso(adicionarAutor(dados))
            } else {
                ctx.status = 400
                ctx.body = mensagemDeErro("Dados mal-formatados!")
            }
        }
    } else if (parametros[0] === 'autor' && id) {
        if (metodo === 'GET') {
            let autorExiste = obterAutorPeloId(id)

            if (autorExiste) {
                ctx.status = 200
                ctx.body = mensagemDeSucesso(autorExiste)
            } else {
                ctx.status = 404
                ctx.body = mensagemDeErro("Autor não encontrado!")
            }
        } else if (metodo === 'PUT') {

            const dados = ctx.request.body
            const autorExiste = obterAutorPeloId(id)
            const formatacaoDosDados = verificarCamposAutores(dados)

            if (autorExiste && formatacaoDosDados) {
                ctx.status = 200
                ctx.body = mensagemDeSucesso(atualizarAutor(id, dados))
            } else if (!formatacaoDosDados) {
                ctx.status = 400
                ctx.body = mensagemDeErro("Dados mal-formatados!")
            } else {
                ctx.status = 404
                ctx.body = mensagemDeErro("Autor não encontrado!")
            }

        } else if (metodo === 'DELETE') {
            const autorExiste = obterAutorPeloId(id)
            const autorPossuiPosts = verificarSeAutorPossuiPost(id)

            if (autorExiste && !autorPossuiPosts) {
                ctx.status = 200
                ctx.body = mensagemDeSucesso(removerAutor(id))
            } else if(autorPossuiPosts){
                ctx.status = 403
                ctx.body = mensagemDeErro("Proibido! Autor possui posts veiculados.")
            } else {
                ctx.status = 404
                ctx.body = mensagemDeErro("Autor não encontrado!")
            }
        }
    } else if (parametros[0] === 'posts' && id === null) {

        if (metodo === 'GET') {
            ctx.status = 200
            ctx.body = mensagemDeSucesso(obterPosts())

        } else if (metodo === 'POST') {
            const dados = ctx.request.body
            const autorExiste = obterAutorPeloId(dados.id_autor)
            const formatacaoDosDados = verificarCamposPost(dados)

            if (autorExiste && formatacaoDosDados) {
                ctx.status = 200
                ctx.body = mensagemDeSucesso(adicionarPost(dados))
            } else if ( !autorExiste && formatacaoDosDados) {
                ctx.status = 403
                ctx.body = mensagemDeErro("Proibido! Autor deletado ou não existe!")
            } else if (!formatacaoDosDados) {
                ctx.status = 400
                ctx.body = mensagemDeErro("Dados mal-formatados!")
            }
        }

    } else if (parametros[0] === 'posts' && id) {

        if (metodo === 'GET') {
            let postExiste = obterPostPeloId(id)

            if (postExiste) {
                ctx.status = 200
                ctx.body = mensagemDeSucesso(postExiste)
            } else {
                ctx.status = 404
                ctx.body = mensagemDeErro("Post não encontrado!")
            }
        } else if (metodo === 'PUT') {

            const dados = ctx.request.body
            const postExiste = obterPostPeloId(id)
            const autorExiste = obterAutorPeloId(dados.id_autor)
            const formatacaoDosDados = verificarCamposPost(dados)

            if (postExiste && dados.id_autor) {
                if (autorExiste && formatacaoDosDados) {
                    ctx.status = 200
                    ctx.body = mensagemDeSucesso(atualizarPost(id, dados))
                } else {
                    ctx.status = 403
                    ctx.body = mensagemDeErro("Proibido! Autor deletado ou não existe!")
                }
            } else if (postExiste) {
                if (formatacaoDosDados) {
                    ctx.status = 200
                    ctx.body = mensagemDeSucesso(atualizarPost(id, dados))
                } else {
                    ctx.status = 400
                    ctx.body = mensagemDeErro("Dados mal-formatados!")
                }
            } else {
                ctx.status = 404
                ctx.body = mensagemDeErro("Post não encontrado!")
            }
        } else if (metodo === 'DELETE') { 
            const postExiste = obterPostPeloId(id)
            
            if(postExiste){
                ctx.status = 200
                ctx.body = mensagemDeSucesso(removerPost(id))
            } else {
                ctx.status = 404
                ctx.body = mensagemDeErro("Post não encontrado!")
            }
            
        }

    } else {
        ctx.status = 404
        ctx.body = mensagemDeErro("Página não encontrada!")
    }

})

server.listen(8081, () => console.log("Servidor rodando em localhost:8081."))