function initForm() {
    ReactDOM.render(<MainForm />, $('#gameform').get(0));
}

class MainForm extends React.Component {
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
                    initBoard,
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