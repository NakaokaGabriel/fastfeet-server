import * as Yup from 'yup';

import Recipient from '../models/Recipient';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  street: Yup.string().required(),
  number: Yup.string().required(),
  complement: Yup.string(),
  state: Yup.string().required(),
  city: Yup.string().required(),
  cep: Yup.string().required(),
});

class RecipientController {
  async store(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validations failed' });
    }

    const { name, street, number, complement, state, city, cep } = req.body;

    await Recipient.create({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });

    return res.json({ ok: 'Recipient registered successfully' });
  }

  async update(req, res) {
    const { name, street, number, complement, cep } = req.body;
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    await recipient.update({
      name,
      street,
      number,
      complement,
      cep,
    });

    return res.json({ ok: 'Recipient update successfully' });
  }
}

export default new RecipientController();
