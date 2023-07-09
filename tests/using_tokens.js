export async function getUser(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const sessao = await db.collection("sessao").findOne({ token });
    if (!sessao) return res.sendStatus(401);

    // opcional - se quiser saber os dados do usuario
    const usuario = await db.collection("usuarios").findOne({ _id: sessao.idUsuario });

    delete usuario.senha;
    res.send(usuario);
  } catch (err) {
    res.status(500).send(err.message);
  }
}