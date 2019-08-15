import express from 'express';
import { util } from '../config/gameInfoUtil';
import pg from 'pg';
import { parse } from 'pg-connection-string';
require('dotenv').config();

const dbUrl: string = process.env.DB_URL || '';
const config: object = parse(dbUrl);
const pool = new pg.Pool(config);
pool.connect();

export const scoresController = {
  getScores(req: express.Request, res: express.Response) {
    const internalGameName: string = req.params['game_name'];
    const gameIndex: number = util.gameToIndex(internalGameName);
    const scores = getScoresFromDB(gameIndex);
    const prettyGameName: string = util.gameToName(internalGameName);
    res.render('scores.pug', { scores, prettyGameName });
  },
};

function getScoresFromDB(gameIndex: number) {
  pool.query(
    `SELECT * FROM high_score_table 
    WHERE game_index = $1 
    ORDER BY score game_index DESC`,
    [gameIndex],
    (err, res) => {
      if (err) {
        throw err;
      }
      return { scores: res.rows };
    }
  );
}
