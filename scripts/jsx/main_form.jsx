class MainForm extends React.Component {
    static init(id) {
        if (id)
            ReactDOM.render(<MainForm />, $(id).get(0));
        else
            console.error("ERROR: No \'id\' passed to \'MainForm.init\'.");
    }

    constructor() {
        super();
        this.colClass = "col-sm-3";
        this.style = {
            width: "610px",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto"
        };
        this.btnData = [
            {
                lbl: "New Game",
                className: "btn btn-dark",
                onClick: () => DialogBox.show(
                    "#dialog-box",
                    "New Game",
                    "Start a new game?",
                    () => Board.init("#gameboard"),
                    DialogButtons.YesNo
                ),
                dataToggle: "modal",
                dataTarget: "#dialog-box",
                tooltip: "Start a new game."
            }
        ];
    }

    createButton(data) {
        return (
            <div className={this.colClass}>
            <input className={data.className} 
                type="button" 
                value={data.lbl}
                onClick={data.onClick}
                data-toggle={data.dataToggle}
                data-target={data.dataTarget}
                title={data.tooltip} />
            </div>
        );
    }
    
    render() {
        return (
            <form style={this.style}>
                <div className="row">
                    <div className={this.colClass}>
                        <strong>Game Menu:</strong>
                    </div>
                    {this.btnData.map(b => this.createButton(b))}
                </div>
            </form>
        );
    }
}