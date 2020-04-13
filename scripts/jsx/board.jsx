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
    static init(id) {
        if (id) {
            ReactDOM.unmountComponentAtNode($(id).get(0));
            ReactDOM.render(<Board />, $(id).get(0));
        } else {
            console.error("ERROR: No \'id\' passed to \'Board.init\'.");
        }
    }

    constructor(props) {
        super(props);
        this.fresh = true;
        this.state = {
            player: (props.player) ? props.player : Color.LIGHT,
            pieces: props.pieces,
            takenPieces: {},
            squares: {},
            endGame: false,
            selElement: null
        };
    }

    initPieces() {
        if (isEmpty(this.state.pieces)) {
            this.state.pieces = STANDARD_SETUP;
        }
        if (isEmpty(this.state.takenPieces)) {
            this.state.takenPieces[Color.LIGHT] = [];
            this.state.takenPieces[Color.DARK] = [];
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

        pieces[destElement.id] = pieces[this.state.selElement.id];
        delete pieces[this.state.selElement.id];

        squares[destElement.id] = this.createSquare(destElement.id, getColor(destElement), pieces[destElement.id]);
        squares[this.state.selElement.id] = this.createSquare(this.state.selElement.id, getColor(this.state.selElement));
        
        this.setState({squares: squares});
        this.setState({pieces: pieces});
        this.setState({selElement: null});
        this.endTurn();
    }

    attack(victimElement) {
        let pieces = clone(this.state.pieces);
        let takenPieces = clone(this.state.takenPieces);
        
        takenPieces[this.state.player].push(pieces[victimElement.id]);
        delete pieces[victimElement.id];

        this.setState({takenPieces: takenPieces});
        this.setState({pieces: pieces});
    }

    onClick(e) {
        if (!this.state.endGame) {
            let element = e.target;
            let pieceData = Piece.getData(element.innerHTML);

            if (!this.state.selElement && pieceData && pieceData.color === this.state.player) {
                this.setState({selElement: element});
            } else if (this.state.selElement && element.id === this.state.selElement.id) {
                this.setState({selElement: null});
            } else if (this.state.selElement) {
                if (pieceData) {
                    this.attack(element);
                }
                this.move(element);
            }
        }
    }

    render() {
        if (this.fresh) {
            this.initPieces();
            this.build();
            this.fresh = false;
        }
        
        return Object.keys(this.state.squares)
            .map((k) => this.state.squares[k]);
    }
}