import React, {Component} from "react";
import { Overlay, ModalImg } from "./Modal.styled";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    
    
    render() {
        return createPortal(
          <Overlay>
            <ModalImg>
              <img src={this.props.picture} alt="img" />
            </ModalImg>
          </Overlay>,
          modalRoot
        );
    }
}
export default Modal