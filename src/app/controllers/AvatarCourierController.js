import AvatarCourier from '../models/AvatarCourier';

class AvatarCourierController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    await AvatarCourier.create({
      name,
      path,
    });

    return res.json({ ok: 'You image was registered with successfull' });
  }
}

export default new AvatarCourierController();
