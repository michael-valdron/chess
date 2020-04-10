const STANDARD_SETUP = {
    // light pieces
    'e1': {
        'type': PieceType.KING,
        'color': Color.LIGHT
    },
    'd1': {
        'type': PieceType.QUEEN,
        'color': Color.LIGHT
    },
    'a1': {
        'type': PieceType.ROCK,
        'color': Color.LIGHT
    },
    'h1': {
        'type': PieceType.ROCK,
        'color': Color.LIGHT
    },
    'c1': {
        'type': PieceType.BISHOP,
        'color': Color.LIGHT
    },
    'f1': {
        'type': PieceType.BISHOP,
        'color': Color.LIGHT
    },
    'b1': {
        'type': PieceType.KNIGHT,
        'color': Color.LIGHT
    },
    'g1': {
        'type': PieceType.KNIGHT,
        'color': Color.LIGHT
    },
    'a2': {
        'type': PieceType.PAWN,
        'color': Color.LIGHT
    },
    'b2': {
        'type': PieceType.PAWN,
        'color': Color.LIGHT
    },
    'c2': {
        'type': PieceType.PAWN,
        'color': Color.LIGHT
    },
    'd2': {
        'type': PieceType.PAWN,
        'color': Color.LIGHT
    },
    'e2': {
        'type': PieceType.PAWN,
        'color': Color.LIGHT
    },
    'f2': {
        'type': PieceType.PAWN,
        'color': Color.LIGHT
    },
    'g2': {
        'type': PieceType.PAWN,
        'color': Color.LIGHT
    },
    'h2': {
        'type': PieceType.PAWN,
        'color': Color.LIGHT
    },

    // dark pieces
    'e8': {
        'type': PieceType.KING,
        'color': Color.DARK
    },
    'd8': {
        'type': PieceType.QUEEN,
        'color': Color.DARK
    },
    'a8': {
        'type': PieceType.ROCK,
        'color': Color.DARK
    },
    'h8': {
        'type': PieceType.ROCK,
        'color': Color.DARK
    },
    'c8': {
        'type': PieceType.BISHOP,
        'color': Color.DARK
    },
    'f8': {
        'type': PieceType.BISHOP,
        'color': Color.DARK
    },
    'b8': {
        'type': PieceType.KNIGHT,
        'color': Color.DARK
    },
    'g8': {
        'type': PieceType.KNIGHT,
        'color': Color.DARK
    },
    'a7': {
        'type': PieceType.PAWN,
        'color': Color.DARK
    },
    'b7': {
        'type': PieceType.PAWN,
        'color': Color.DARK
    },
    'c7': {
        'type': PieceType.PAWN,
        'color': Color.DARK
    },
    'd7': {
        'type': PieceType.PAWN,
        'color': Color.DARK
    },
    'e7': {
        'type': PieceType.PAWN,
        'color': Color.DARK
    },
    'f7': {
        'type': PieceType.PAWN,
        'color': Color.DARK
    },
    'g7': {
        'type': PieceType.PAWN,
        'color': Color.DARK
    },
    'h7': {
        'type': PieceType.PAWN,
        'color': Color.DARK
    }
};

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.init = true;
        this.state = {
            player: (props.player) ? props.player : Color.LIGHT,
            pieces: props.pieces,
            squares: {},
            onMove: null
        };
    }

    initPieces() {
        if (!this.state.pieces) {
            this.state.pieces = STANDARD_SETUP;
        }
    }

    createSquare(id, color, piece=null) {
        let className = "square " + color;
        let pieceLook = (piece) ? Piece.getAppearance(piece) : "";
        
        return <div id={id} className={className} onClick={(e) => this.onClick(e)}>{pieceLook}</div>;
    }

    build() {
        let rows = [1, 2, 3, 4, 5, 6, 7, 8].reverse();
        let cols = ["a", "b", "c", "d", 
            "e", "f", "g", "h"];
        var currentSqColor = Color.LIGHT;
        
        for (let rId of rows) {
            for (let cId of cols) {
                let id = cId + rId.toString();
                let piece = this.state.pieces[id];

                this.state.squares[id] = this.createSquare(id, currentSqColor, piece);
                currentSqColor = toggleColor(currentSqColor);
            }
            currentSqColor = toggleColor(currentSqColor);
        }       
    }

    endTurn() {
        let next = toggleColor(this.state.player);
        this.setState({player: next});
    }

    move(destElement) {
        let getColor = (obj) => {
            let arr = obj.className.split(" ");
            return arr[arr.length - 1];
        };
        let squares = clone(this.state.squares);
        let pieces = clone(this.state.pieces);

        pieces[destElement.id] = pieces[this.state.onMove.id];
        delete pieces[this.state.onMove.id];

        squares[destElement.id] = this.createSquare(destElement.id, getColor(destElement), pieces[destElement.id]);
        squares[this.state.onMove.id] = this.createSquare(this.state.onMove.id, getColor(this.state.onMove));
        
        this.setState({squares: squares});
        this.setState({pieces: pieces});
        this.setState({onMove: null});
        this.endTurn();
    }

    onClick(e) {
        let element = e.target;
        let pieceData = Piece.getData(element.innerHTML);

        if (!this.state.onMove && pieceData && pieceData.color === this.state.player) {
            this.setState({onMove: element});
        } else if (this.state.onMove) {
            this.move(element);
        }
    }

    render() {
        if (this.init) {
            this.initPieces();
            this.build();
            this.init = false;
        }
        
        return Object.keys(this.state.squares)
            .map((k) => this.state.squares[k]);
    }
}