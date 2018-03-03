export class ChessFigure {

	constructor (_color: string, _coord: Array<number>, _id:number) {
		
		if (_color.toUpperCase() === "WHITE"){this.color = "white"};
		if (_color.toUpperCase() === "BLACK"){this.color = "black"};

		this.coord = _coord.slice(0,2);

		this.id = +_id;

		this.inPlay = true;
		this.cellsToMove = [];
	};
	  
	  protected color: string;
	  protected coord: Array<number>;
	  protected id: number;
	  protected type: string;
	  protected inPlay:boolean;
	  protected cellsToMove: Cell[];

	moveToCoord(x:number,y:number) {
		this.coord[0] = x;
		this.coord[1] =y;
	}

	getCoord(): Array<number> {
		return this.coord;
	}

	getId():number {
		return this.id;
	}

	getColor():string {
		return this.color;
	}

	getType():string {
		return this.type;
	}

	isInPlay():boolean {
		return this.inPlay;
	}

};

export class Pawn extends ChessFigure {
	constructor(_color: string, _coord: Array<number>, _id:number){
		super(_color, _coord, _id);
		this.type = 'pawn';
	}
	getCellsToMove(board: Array<Array<Cell>>){
		this.cellsToMove = [];
		if (this.color == 'white') {
			if(this.coord[1] == 1){//start jump
			   	if (!board[this.coord[1]+2][this.coord[0]].getFigure()){
						this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]+2));
				}					  
			};
			if(this.coord[1]+1 <= 7){//1 cell forward
			   	if (!board[this.coord[1]+1][this.coord[0]].getFigure()){
						this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]+1));
				}				
			};					  		
				if (this.coord[1]+1 <= 7 && this.coord[0]+1 <= 7) {//beat
			   		if (board[this.coord[1]+1][this.coord[0]+1].getFigure()){
			   			if (board[this.coord[1]+1][this.coord[0]+1].getFigure().getColor() != this.color){
							this.cellsToMove.push(new Cell(this.coord[0]+1,this.coord[1]+1));		   				
						}
					}	
				  };
				if (this.coord[1]+1 <= 7 && this.coord[0]-1 >= 0) {//beat
			   		if (board[this.coord[1]+1][this.coord[0]-1].getFigure()){
			   			if (board[this.coord[1]+1][this.coord[0]-1].getFigure().getColor() != this.color){
							this.cellsToMove.push(new Cell(this.coord[0]-1,this.coord[1]+1));		   				
						}
					}	
				  }	
			};
		if (this.color == 'black') {
			if(this.coord[1] == 6){//start jump
			   	if (!board[this.coord[1]-2][this.coord[0]].getFigure()){
						this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]-2));
				}					  
			};
			if(this.coord[1]-1 >= 0){//1 cell forward
			   	if (!board[this.coord[1]-1][this.coord[0]].getFigure()){
						this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]-1));
				}				
			};					  		
				if (this.coord[1]-1 >= 0 && this.coord[0]+1 <= 7) {//beat 
			   		if (board[this.coord[1]-1][this.coord[0]+1].getFigure()){
			   			if (board[this.coord[1]-1][this.coord[0]+1].getFigure().getColor() != this.color){
							this.cellsToMove.push(new Cell(this.coord[0]+1,this.coord[1]-1));		   				
						}
					}	
				  };
				if (this.coord[1]-1 >= 0 && this.coord[0]-1 >= 0) {//beat
			   		if (board[this.coord[1]-1][this.coord[0]-1].getFigure()){
			   			if (board[this.coord[1]-1][this.coord[0]-1].getFigure().getColor() != this.color){
							this.cellsToMove.push(new Cell(this.coord[0]-1,this.coord[1]-1));		   				
						}
					}	
				  }	
			};
		return this.cellsToMove;
	}
};

export class Rook extends ChessFigure {
	constructor(_color: string, _coord: Array<number>, _id:number){
		super(_color, _coord, _id);
		this.type = 'rook';
	}
	getCellsToMove(board: Array<Array<Cell>>){
		this.cellsToMove = [];
	//up
		let i=1;
		let _canMove = true;
		while (_canMove) 
		   { if (this.coord[1]-i < 0) {_canMove = false} else {
		   		if (!board[this.coord[1]-i][this.coord[0]].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]-i));
				} else {
				if (board[this.coord[1]-i][this.coord[0]].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]-i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//right
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[0]+i > 7) {_canMove = false} else {
		   		if (!board[this.coord[1]][this.coord[0]+i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]));
				} else {
				if (board[this.coord[1]][this.coord[0]+i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//down
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[1]+i > 7) {_canMove = false} else {
		   		if (!board[this.coord[1]+i][this.coord[0]].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]+i));
				} else {
				if (board[this.coord[1]+i][this.coord[0]].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]+i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//left
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[0]-i < 0) {_canMove = false} else {
		   		if (!board[this.coord[1]][this.coord[0]-i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]));
				} else {
				if (board[this.coord[1]][this.coord[0]-i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };	
		return this.cellsToMove;		
	}	
};

export class Horse extends ChessFigure {
	constructor(_color: string, _coord: Array<number>, _id:number){
		super(_color, _coord, _id);
		this.type = 'horse';
	}
	getCellsToMove(board: Array<Array<Cell>>){
		this.cellsToMove = [];
		if(this.coord[0]-1>=0 && this.coord[1]-2>=0) 
			{this.cellsToMove.push(new Cell(this.coord[0]-1,this.coord[1]-2));}
		if(this.coord[0]+1<=7 && this.coord[1]-2>=0) 
			{this.cellsToMove.push(new Cell(this.coord[0]+1,this.coord[1]-2));}
		if(this.coord[0]-2>=0 && this.coord[1]-1>=0) 
			{this.cellsToMove.push(new Cell(this.coord[0]-2,this.coord[1]-1));}
		if(this.coord[0]+2<=7 && this.coord[1]-1>=0) 
			{this.cellsToMove.push(new Cell(this.coord[0]+2,this.coord[1]-1));}
		if(this.coord[0]-2>=0 && this.coord[1]+1<=7) 
			{this.cellsToMove.push(new Cell(this.coord[0]-2,this.coord[1]+1));}
		if(this.coord[0]+2<=7 && this.coord[1]+1<=7) 
			{this.cellsToMove.push(new Cell(this.coord[0]+2,this.coord[1]+1));}
		if(this.coord[0]-1>=0 && this.coord[1]+2<=7) 
			{this.cellsToMove.push(new Cell(this.coord[0]-1,this.coord[1]+2));}
		if(this.coord[0]+1<=7 && this.coord[1]+2<=7) 
			{this.cellsToMove.push(new Cell(this.coord[0]+1,this.coord[1]+2));}
		return this.cellsToMove;
	}	
};

export class Bishop extends ChessFigure {
	constructor(_color: string, _coord: Array<number>, _id:number){
		super(_color, _coord, _id);
		this.type = 'bishop';
	}
		getCellsToMove(board: Array<Array<Cell>>){
		this.cellsToMove = [];
	//up-right
		let i=1;
		let _canMove = true;
		while (_canMove) 
		   { if (this.coord[1]-i < 0 || this.coord[0]+i > 7) {_canMove = false} else {
		   		if (!board[this.coord[1]-i][this.coord[0]+i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]-i));
				} else {
				if (board[this.coord[1]-i][this.coord[0]+i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]-i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//right-down
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[0]+i > 7 || this.coord[1]+i > 7) {_canMove = false} else {
		   		if (!board[this.coord[1]+i][this.coord[0]+i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]+i));
				} else {
				if (board[this.coord[1]+i][this.coord[0]+i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]+i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//left-down
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[0]-i < 0 || this.coord[1]+i > 7) {_canMove = false} else {
		   		if (!board[this.coord[1]+i][this.coord[0]-i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]+i));
				} else {
				if (board[this.coord[1]+i][this.coord[0]-i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]+i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//up-left
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[0]-i < 0 || this.coord[1]-i < 0) {_canMove = false} else {
		   		if (!board[this.coord[1]-i][this.coord[0]-i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]-i));
				} else {
				if (board[this.coord[1]-i][this.coord[0]-i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]-i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };	
		return this.cellsToMove;		
	}		
};

export class Queen extends ChessFigure {
	constructor(_color: string, _coord: Array<number>, _id:number){
		super(_color, _coord, _id);
		this.type = 'queen';
	}
		getCellsToMove(board: Array<Array<Cell>>){
		this.cellsToMove = [];
	//up-right
		let i=1;
		let _canMove = true;
		while (_canMove) 
		   { if (this.coord[1]-i < 0 || this.coord[0]+i > 7) {_canMove = false} else {
		   		if (!board[this.coord[1]-i][this.coord[0]+i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]-i));
				} else {
				if (board[this.coord[1]-i][this.coord[0]+i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]-i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//right-down
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[0]+i > 7 || this.coord[1]+i > 7) {_canMove = false} else {
		   		if (!board[this.coord[1]+i][this.coord[0]+i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]+i));
				} else {
				if (board[this.coord[1]+i][this.coord[0]+i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]+i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//left-down
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[0]-i < 0 || this.coord[1]+i > 7) {_canMove = false} else {
		   		if (!board[this.coord[1]+i][this.coord[0]-i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]+i));
				} else {
				if (board[this.coord[1]+i][this.coord[0]-i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]+i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//up-left
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[0]-i < 0 || this.coord[1]-i < 0) {_canMove = false} else {
		   		if (!board[this.coord[1]-i][this.coord[0]-i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]-i));
				} else {
				if (board[this.coord[1]-i][this.coord[0]-i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]-i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//up
			i=1;
			_canMove = true;
		while (_canMove) 
		   { if (this.coord[1]-i < 0) {_canMove = false} else {
		   		if (!board[this.coord[1]-i][this.coord[0]].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]-i));
				} else {
				if (board[this.coord[1]-i][this.coord[0]].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]-i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//right
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[0]+i > 7) {_canMove = false} else {
		   		if (!board[this.coord[1]][this.coord[0]+i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]));
				} else {
				if (board[this.coord[1]][this.coord[0]+i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]+i,this.coord[1]));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//down
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[1]+i > 7) {_canMove = false} else {
		   		if (!board[this.coord[1]+i][this.coord[0]].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]+i));
				} else {
				if (board[this.coord[1]+i][this.coord[0]].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]+i));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };
	//left
		i=1;
		_canMove = true;
		while (_canMove) 
		   { if (this.coord[0]-i < 0) {_canMove = false} else {
		   		if (!board[this.coord[1]][this.coord[0]-i].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]));
				} else {
				if (board[this.coord[1]][this.coord[0]-i].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]-i,this.coord[1]));
					_canMove = false;	
				} else {_canMove = false;};
			   };	
			  }
			i++;
		   };		   	
		return this.cellsToMove;		
	}	
};

export class King extends ChessFigure {
	constructor(_color: string, _coord: Array<number>, _id:number){
		super(_color, _coord, _id);
		this.type = 'king';
	}
	getCellsToMove(board: Array<Array<Cell>>){
		this.cellsToMove = [];
	//up-right
		    if (this.coord[1]-1 < 0 || this.coord[0]+1 > 7) {} else {
		   		if (!board[this.coord[1]-1][this.coord[0]+1].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]+1,this.coord[1]-1));
				} else {
				if (board[this.coord[1]-1][this.coord[0]+1].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]+1,this.coord[1]-1));	
				};
			   };	
			  };
	//right-down
		    if (this.coord[0]+1 > 7 || this.coord[1]+1 > 7) {} else {
		   		if (!board[this.coord[1]+1][this.coord[0]+1].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]+1,this.coord[1]+1));
				} else {
				if (board[this.coord[1]+1][this.coord[0]+1].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]+1,this.coord[1]+1));	
				};
			   };	
			  };
	//left-down 
		    if (this.coord[0]-1 < 0 || this.coord[1]+1 > 7) {} else {
		   		if (!board[this.coord[1]+1][this.coord[0]-1].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]-1,this.coord[1]+1));
				} else {
				if (board[this.coord[1]+1][this.coord[0]-1].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]-1,this.coord[1]+1));
				};
			   };	
			  };
	//up-left
		    if (this.coord[0]-1 < 0 || this.coord[1]-1 < 0) {} else {
		   		if (!board[this.coord[1]-1][this.coord[0]-1].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]-1,this.coord[1]-1));
				} else {
				if (board[this.coord[1]-1][this.coord[0]-1].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]-1,this.coord[1]-1));	
				};
			   };	
			  };
	//up 
		    if (this.coord[1]-1 < 0) {} else {
		   		if (!board[this.coord[1]-1][this.coord[0]].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]-1));
				} else {
				if (board[this.coord[1]-1][this.coord[0]].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]-1));	
				};
			   };	
			  };
	//right 
		    if (this.coord[0]+1 > 7) {} else {
		   		if (!board[this.coord[1]][this.coord[0]+1].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]+1,this.coord[1]));
				} else {
				if (board[this.coord[1]][this.coord[0]+1].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]+1,this.coord[1]));	
				};
			   };	
			  };
	//down
		    if (this.coord[1]+1 > 7) {} else {
		   		if (!board[this.coord[1]+1][this.coord[0]].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]+1));
				} else {
				if (board[this.coord[1]+1][this.coord[0]].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0],this.coord[1]+1));	
				};
			   };	
			  };
	//left		
		    if (this.coord[0]-1 < 0) {} else {
		   		if (!board[this.coord[1]][this.coord[0]-1].getFigure()){
					this.cellsToMove.push(new Cell(this.coord[0]-1,this.coord[1]));
				} else {
				if (board[this.coord[1]][this.coord[0]-1].getFigure().getColor() != this.getColor()) {
					this.cellsToMove.push(new Cell(this.coord[0]-1,this.coord[1]));
				};
			   };	
			  };		   	
		return this.cellsToMove;		
	}	
};

//----------------------------- cell -------------------------------//

export class Cell {

	constructor (x:number,y:number) {
		this.coord[0] = x;
		this.coord[1] = y;

		if ((x+y)%2 == 0){this.color = 'white'} else {this.color = 'black'};

		this.figure = '';

		this.cellToMove = false;

	}

	private color: string;
	private coord: Array<number> = [];
	private figure: any;
	private cellToMove: boolean;

	getCoord(): Array<number> {
		return this.coord;
	}

	getColor(): string {
		return this.color;
	}

	getFigure() {
		return this.figure;
	}

	setFigure(fig:any) {
		this.figure = fig;
	}

	setToMove(expr:boolean) {
		this.cellToMove = expr;
	}

	isToMove(){
		return this.cellToMove;
	}
}
