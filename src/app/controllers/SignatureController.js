import Signature from '../models/Signature';

class SignatureController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    await Signature.create({
      name,
      path,
    });

    return res.json({ ok: 'You image was registered with successfull' });
  }
}

export default new SignatureController();
