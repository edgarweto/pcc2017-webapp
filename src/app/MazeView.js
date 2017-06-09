import React, { Component } from 'react';

import './MazeView.css';

import ImgGhost from '../images/maze-ghost.png';
import ImgGhostNeutral from '../images/maze-ghost-neutral.png';
import ImgGoal from '../images/maze-goal.png';
import ImgStart from '../images/maze-start.png';
import ImgWall from '../images/maze-wall.png';

class MazeView extends Component {
  
  _getAt (maze, row, col) {
    const idx = col + row * maze.width;
    return maze.matrix[idx];
  }

  render() {
    let domMaze = [];

    if (this.props.maze) {
      const maze = {
        width: this.props.maze.width,
        height: this.props.maze.height,
        matrix: this.props.maze.matrix
      };

      const cellImages = {
          goal: ImgGoal,
          start: ImgStart,
          wall: ImgWall,
          ghost: ImgGhost,
          neutralGhost: ImgGhostNeutral,
        };

      // Draw an array of rows, each one with columns:
      const
        nRows = maze.height,
        nCols = maze.width;

      const CELL_VALUES = {
        0: 'unknown',
        1: 'wall',
        2: 'ghost',
        3: 'neutralGhost',
        4: 'goal',
        5: 'start',
        6: 'void',
        7: 'player',
        8: 'visited'
      };

      const cellWidth = (100 / nCols),
        cellHeight = (100 / nRows);


      for (let row = 0; row < nRows; row++) {
        const domRow = [];
        for (let col = 0; col < nCols; col++) {

          const  cellValue = this._getAt(maze, row, col);
          let state = CELL_VALUES[cellValue];

          // Special case:
          if (cellValue >= 8) {
            state = 'visited';
          }

          const style = {
            width: cellWidth + '%',
            height: cellHeight + '%',
            top: (row * cellHeight) + '%',
            left: (col * cellWidth) + '%'
          };

          const img = cellImages[state];
          if (img) {
            style.backgroundImage = `url(${img})`;
          }
        
          if (state === 'unknown') {
            state = undefined;
          }

          const cell = (
            <div className="cell" data-row={row} data-col={col} data-state={state} style={style}>
            </div>
          );

          domRow[col] = cell;
        }

        domMaze[row] = domRow;
      }
    }
      
    return (
      <div className="maze-view">
        {domMaze}
      </div>
    );
  }
}

export default MazeView;
