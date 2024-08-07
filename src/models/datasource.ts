import axios from 'axios';
export class Datasource {
  static async list() {
    const res = await axios.get<string[]>('api/datasources');
    if (res && res.data instanceof Array) return res.data;
    return [];
  }
}
