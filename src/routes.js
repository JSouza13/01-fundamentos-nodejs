import { Database } from "./database.js";
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from "./utils/build-route-path.js";
import { url } from "node:inspector";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    url: buildRoutePath('/users'),
    handler: async (req, res) => {
      const { search } = req.query;

      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null);

      return res
      .end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    url: buildRoutePath('/users'),
    handler: async (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email
      };

      database.insert('users', user);

      return res.writeHead(201).end();
    }
  },
  {
    method: 'DELETE',
    url: buildRoutePath('/users/:id'),
    handler: async (req, res) => {
      const { id } = req.params;
      database.delete('users', id);

      return res.writeHead(204).end();
    }
  },
  {
    method: 'PUT',
    url: buildRoutePath('/users/:id'),
    handler: async (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update('users', id, {
        name,
        email
      });

      return res.writeHead(204).end();
    }
  }
]