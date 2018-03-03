import { Component, OnInit } from '@angular/core';
import { ChessFigure, Pawn, Rook, Horse, Bishop, Queen, King, Cell } from '../chessFigure';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  constructor(private timerComponent: TimerComponent) {}

  chessBoard: Array<Array<Cell>> = [[],[],[],[],[],[],[],[]];
  figures: ChessFigure[] = [];
  selectedFigure:any = '';
  turn:boolean = true;

  ngOnInit() {

    this.createBoard();
    this.setoutFigures();

  }

  moveTurn():string{
    if (this.turn) {return 'white'} else {return 'black'}
  };

  makeMove(coord: Array<number>, figure:any){
    if (this.selectedFigure == '') {//select figure, first click
      this.selectedFigure = figure; 

      this.chessBoard.forEach(item=>{item.forEach(cell=>{ //set cells available to move
        cell.setToMove(false);
        if (this.selectedFigure!='' && this.selectedFigure.getColor()==this.moveTurn()) {
          this.selectedFigure.getCellsToMove(this.chessBoard).forEach(moveCell=>{
            if (cell.getCoord()[0] == moveCell.getCoord()[0] && cell.getCoord()[1] == moveCell.getCoord()[1])
              if(!cell.getFigure()){//free cell
                {cell.setToMove(true)};
              } else {
                if (cell.getFigure().getColor() != this.selectedFigure.getColor()){//occupied by enemy
                  cell.setToMove(true);
                }  
              }
          });
        };
      })})

    } else {//try to move figure, 2nd click
      if(this.chessBoard[coord[1]][coord[0]].isToMove()){//clicked on possible to move cell
        this.chessBoard[this.selectedFigure.getCoord()[1]][this.selectedFigure.getCoord()[0]].setFigure('');
        this.chessBoard[coord[1]][coord[0]].setFigure(this.selectedFigure);
        this.selectedFigure.moveToCoord(coord[0],coord[1]);
        this.selectedFigure = '';
        this.chessBoard.forEach(item=>{item.forEach(cell=>{cell.setToMove(false)})});
        this.turn = !this.turn;
        this.timerComponent.toggleTimer();
      } else {
        this.selectedFigure = ''; //unselect figure
      };
    };
  }

  createBoard(){
    for (let i=0; i<8; i++){
      for (let j=0; j<8; j++){
        this.chessBoard[j][i] = new Cell(i,j);
      };
    };
  }

  setoutFigures(){
    for (let i=0; i<8; i++){
      this.figures[i] = new Pawn('white',[i,1],i);
       this.chessBoard[1][i].setFigure(this.figures[i]);}
      this.figures[8] = new Rook('white',[0,0],8);
       this.chessBoard[0][0].setFigure(this.figures[8]);    
      this.figures[9] = new Rook('white',[7,0],9);
       this.chessBoard[0][7].setFigure(this.figures[9]);   
      this.figures[10] = new Horse('white',[1,0],10);
       this.chessBoard[0][1].setFigure(this.figures[10]);    
      this.figures[11] = new Horse('white',[6,0],11);
       this.chessBoard[0][6].setFigure(this.figures[11]); 
      this.figures[12] = new Bishop('white',[2,0],12);
       this.chessBoard[0][2].setFigure(this.figures[12]);    
      this.figures[13] = new Bishop('white',[5,0],13);
       this.chessBoard[0][5].setFigure(this.figures[13]);
      this.figures[14] = new King('white',[3,0],14);
       this.chessBoard[0][3].setFigure(this.figures[14]);    
      this.figures[15] = new Queen('white',[4,0],15);
       this.chessBoard[0][4].setFigure(this.figures[15]);

    for (let i=16; i<24; i++){
      this.figures[i] = new Pawn('black',[i-16,6],i);
       this.chessBoard[6][i-16].setFigure(this.figures[i]);}
      this.figures[24] = new Rook('black',[0,7],24);
       this.chessBoard[7][0].setFigure(this.figures[24]);    
      this.figures[25] = new Rook('black',[7,7],25);
       this.chessBoard[7][7].setFigure(this.figures[25]);   
      this.figures[26] = new Horse('black',[1,7],26);
       this.chessBoard[7][1].setFigure(this.figures[26]);    
      this.figures[27] = new Horse('black',[6,7],27);
       this.chessBoard[7][6].setFigure(this.figures[27]); 
      this.figures[28] = new Bishop('black',[2,7],28);
       this.chessBoard[7][2].setFigure(this.figures[28]);    
      this.figures[29] = new Bishop('black',[5,7],29);
       this.chessBoard[7][5].setFigure(this.figures[29]);
      this.figures[30] = new King('black',[3,7],30);
       this.chessBoard[7][3].setFigure(this.figures[30]);    
      this.figures[31] = new Queen('black',[4,7],31);
       this.chessBoard[7][4].setFigure(this.figures[31]);     
  }

}
