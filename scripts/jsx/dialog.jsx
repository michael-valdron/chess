const DialogButtons = {
    Ok: 0,
    Close: 1,
    OkCancel: 2,
    YesNo: 3
};

class DialogBox extends React.Component {
    static show(id, title, content, action=null, buttons=DialogButtons.Ok) {
        if (id && title && content) {
            ReactDOM.render(<DialogBox title={title} content={content} onAccept={action} buttons={buttons} />,
                $(id).get(0));
        } else {
            console.error("ERROR: DialogBox.show requires at least 3 parameters passed");
        }
    }

    constructor(props) {
        super(props);
        this.title = props.title;
        this.content = props.content;
        this.buttons = props.buttons;
        this.onAccept = props.onAccept;
    }

    getButtonSet() {
        switch (this.buttons) {
            case DialogButtons.OkCancel:
                return (
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary" onClick={this.onAccept} data-dismiss="modal">Ok</button>
                        <button type="button" className="btn btn-secondary" dataDismiss="modal">Cancel</button>
                    </div>
                );
            case DialogButtons.YesNo:
                return (
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary" onClick={this.onAccept} data-dismiss="modal">Yes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                    </div>
                );
            case DialogButtons.Close:
                return <button type="button" className="btn btn-primary" onClick={this.onAccept} data-dismiss="modal">Close</button>;
            default:
                return <button type="button" className="btn btn-primary" onClick={this.onAccept} data-dismiss="modal">Ok</button>;
        }

    }

    render() {
        return (
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{this.title}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body" id="dialog-content">
                        {this.content}
                    </div>
            
                    <div className="modal-footer">
                        {this.getButtonSet()}
                    </div>
                </div>
            </div>
        );
    }
}