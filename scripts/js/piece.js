const PieceType = {
    KING: 'king',
    QUEEN: 'queen',
    ROCK: 'rock',
    BISHOP: 'bishop',
    KNIGHT: 'knight',
    PAWN: 'pawn'
};

class Piece {
    static APPERANCES = {
        "{\"type\":\"king\",\"color\":\"light\"}": "\u{02654}",
        "{\"type\":\"king\",\"color\":\"dark\"}": "\u{0265A}",
        "{\"type\":\"queen\",\"color\":\"light\"}": "\u{02655}",
        "{\"type\":\"queen\",\"color\":\"dark\"}": "\u{0265B}",
        "{\"type\":\"rock\",\"color\":\"light\"}": "\u{02656}",
        "{\"type\":\"rock\",\"color\":\"dark\"}": "\u{0265C}",
        "{\"type\":\"bishop\",\"color\":\"light\"}": "\u{02657}",
        "{\"type\":\"bishop\",\"color\":\"dark\"}": "\u{0265D}",
        "{\"type\":\"knight\",\"color\":\"light\"}": "\u{02658}",
        "{\"type\":\"knight\",\"color\":\"dark\"}": "\u{0265E}",
        "{\"type\":\"pawn\",\"color\":\"light\"}": "\u{02659}",
        "{\"type\":\"pawn\",\"color\":\"dark\"}": "\u{0265F}"
    };

    static getAppearance(json) {
        let strJson = JSON.stringify(json);
        return Piece.APPERANCES[strJson];
    }

    static getData(html) {
        let strJson = Object.keys(Piece.APPERANCES)
            .find((k) => Piece.APPERANCES[k] === html)
        let json = (strJson) ? JSON.parse(strJson) : undefined;
        return json;
    }
}