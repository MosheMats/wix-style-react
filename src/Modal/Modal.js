import React from 'react';
import ReactModal from 'react-modal';
import classnames from 'classnames';
import styles from './Modal.scss';
import {colors, positions} from './ModalConstants';
import WixComponent from '../WixComponent';

class Modal extends WixComponent {

  render() {
    const props = this.props;

    const justifyContent = positions[props.horizontalPosition];
    const alignItems = positions[props.verticalPosition];

    const modalStyles = {
      overlay: {
        // Overriding defaults
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 11 + (props.zIndex || 0),
        backgroundColor: null, // null disables the property, use css instead
        // Overriding defaults - END
        display: 'flex',
        justifyContent,
        alignItems,
        overflowY: props.scrollable === false ? 'hidden' : 'auto'
      },
      content: {
        // Overriding defaults
        border: 'none',
        overflow: 'initial',
        WebkitOverflowScrolling: 'touch',
        outline: 'none',
        borderRadius: '0px',
        padding: '0px',
        boxShadow: '0 0 14px 0 rgba(22, 45, 60, 0.3)',
        // Overriding defaults - END
        backgroundColor: 'transparent',
        marginBottom: '0px'
      }
    };

    const modalClasses = `${styles.modal} ${styles[props.theme]}`;
    const portalClassName = classnames(styles.portal, {
      [styles.portalNonScrollable]: props.scrollable === false
    });

    return (
      <ReactModal
        portalClassName={portalClassName}
        isOpen={props.isOpen}
        shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick}
        onRequestClose={props.onRequestClose}
        onAfterOpen={props.onAfterOpen}
        style={modalStyles}
        className={modalClasses}
        contentLabel={props.contentLabel}
        closeTimeoutMS={props.closeTimeoutMS}
        >
        {props.children}
      </ReactModal>
    );
  }
}
Modal.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  contentLabel: React.PropTypes.string.isRequired,
  theme: React.PropTypes.oneOf(Object.keys(colors)),
  children: React.PropTypes.any,
  zIndex: React.PropTypes.number,
  shouldCloseOnOverlayClick: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
  onAfterOpen: React.PropTypes.func,
  horizontalPosition: React.PropTypes.oneOf(Object.keys(positions)),
  verticalPosition: React.PropTypes.oneOf(Object.keys(positions)),
  closeTimeoutMS: React.PropTypes.number,
  scrollable: React.PropTypes.bool
};

Modal.defaultProps = {
  onOk: () => { },
  theme: colors.blue,
  shouldCloseOnOverlayClick: false,
  horizontalPosition: 'center',
  verticalPosition: 'center',
  closeTimeoutMS: 500
};

export default Modal;
