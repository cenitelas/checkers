import React from 'react';
import './Modal.css';


class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          message:props.message
      }
    }
    render() {
        var message = this.state.message;
        return (
         message && (
             <div className="modal">
                 <div className="modal-border">
                     {this.state.message}
                 </div>
             </div>
         )
        )
    }
}

export default Modal;
