const EventEmitter = require('events').EventEmitter;

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const parser = require('body-parser');

let hookId = 0;

class TfsHook extends EventEmitter {

  constructor ({ url, port }) {
    super();

    this.port = port;
    this.id = ++hookId;
    this.app = express();
    this.app.use(parser.json());
    this.app.use(cors());
    this.app.use(morgan(`[${this.id}] :method :url :status :response-time ms - :res[content-length]`));

    this.app.post(url, (req, res) => {
      this.emit(req.body.eventType, req.body);
      res.status(200).end();
    });
  }

  listen() {
    this.app.listen(this.port)
  }

}

module.exports = TfsHook;