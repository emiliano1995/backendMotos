const Tutorial = require("../models/tutorial.model.js");

// Crea y guarda un tuto nuevo
exports.create = (req, res) => {
  // Valida req
  if (!req.body) {
    res.status(400).send({
      message: "No puede ser vacío!"
    });
  }

  // Crea un Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Guarda un Tutorial en DB
  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error creando una moto."
      });
    else res.send(data);
  });
};

// Trae todos los tuto  (con condicion).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Tutorial.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error obteniendo motos."
      });
    else res.send(data);
  });
};

// Busca un tuto por Id
exports.findOne = (req, res) => {
  Tutorial.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra una moto con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "error obteniendo moto con id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// busca todos los tuto que se publicaron
exports.findAllPublished = (req, res) => {
  Tutorial.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error obteniendo tutoriales."
      });
    else res.send(data);
  });
};

// Actualiza un tuto por id por request
exports.update = (req, res) => {
  // Valida Request
  if (!req.body) {
    res.status(400).send({
      message: "el update no puede ser vacío!"
    });
  }

  console.log(req.body);

  Tutorial.updateById(
    req.params.id,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encuentra el tuto con el id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "error actualizando el tuto con el id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Borra un tuto con ID especifico
exports.delete = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No puedo borrar el tuto con id " + req.params.id
        });
      }
    } else res.send({ message: `La Moto ha sido borrado con éxito!` });
  });
};

// Delete todos los tuto.
exports.deleteAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error borrando todos los tutoriales."
      });
    else res.send({ message: `Todos las motos no existen mas!` });
  });
};
