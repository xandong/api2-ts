import { Router } from "express";
import { User } from "../models/UserModel";

export const userRoutes = Router();

userRoutes.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Erro ao buscar usuários" });
  }
});

userRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById({ _id: id });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    return res.status(404).json({ message: "Usuário não encontrado" });
  }
});

userRoutes.post("/", async (req, res) => {
  const { name, nickname, age } = req.body;

  if (!name) return res.status(400).json({ message: "O nome é obrigatório." });

  if (!nickname)
    return res.status(400).json({ message: "O nickname é obrigatório." });

  if (!age) return res.status(400).json({ message: "A idade é obrigatória." });

  const nicknameLower = nickname.toLowerCase();
  const user = { name, nickname: nicknameLower, age };

  try {
    const isValidUser = await User.findOne({ nickname: nicknameLower });

    if (isValidUser)
      return res.status(500).json({ message: "Nickname já utilizado." });

    await User.create(user);

    return res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Erro ao cadastrar." });
  }
});

userRoutes.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, nickname, age } = req.body;
  const nicknameLower = nickname.toLowerCase();
  const person = { name, nickname: nicknameLower, age };

  if (!req.body)
    return res.status(402).json({ message: "Parâmetros inexistentes." });

  if (nickname) {
    try {
      const isValidNickname = await User.findOne({ nickname: nicknameLower });

      if (isValidNickname)
        return res.status(400).json({ message: "Nickname já cadastrado." });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao atualizar." });
    }
  }

  try {
    const userUpdate = await User.updateOne({ _id: id }, person);

    if (userUpdate.matchedCount === 0)
      return res.status(404).json({ message: "Usuário não encontrado." });

    return res.status(202).json({ message: "Usuário atualizado com sucesso." });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Erro ao atualizar." });
  }
});

userRoutes.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const isDeleteUser = await User.findByIdAndDelete({ _id: id });

    if (!isDeleteUser)
      return res.status(404).json({ message: "Usuário não encontrado" });

    return res.status(202).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Erro ao deletar." });
  }
});
