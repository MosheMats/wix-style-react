import React from 'react';
import {render} from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import RichTextArea from './RichTextArea';

const richTextAreaDriverFactory = ({component, componentInstance, wrapper}) => {
  const getButtons = () => [...component.querySelectorAll('[data-hook*="rich-text-area-button"]')];
  const getButtonType = button => button.getAttribute('data-hook').replace(/^rich-text-area-button-/, '');
  const getButtonByType = type => getButtons().find(button => getButtonType(button) === type);
  const clickButtonByType = type => () => ReactTestUtils.Simulate.mouseDown(getButtonByType(type));

  return {
    exists: () => !!component,
    getButtonTypes: () => getButtons().map(getButtonType),
    clickBoldButton: clickButtonByType('bold'),
    clickItalicButton: clickButtonByType('italic'),
    clickUnderlineButton: clickButtonByType('underline'),
    getContent: () => component.childNodes[1].textContent,
    focus: () => {
      const editorState = componentInstance.state.editorState;
      const newEditorState = editorState
        .transform()
        // .focus()
        .apply();

      componentInstance.setEditorState(newEditorState);
    },
    enterText: text => {
      const editorState = componentInstance.state.editorState;
      const newEditorState = editorState
        .transform()
        .insertText(text)
        .apply();

      componentInstance.setEditorState(newEditorState);
    },
    setProps: props => render(
      <div ref={r => component = r.childNodes[0]}>
        <RichTextArea ref={r => componentInstance = r} {...props}/>
      </div>,
      wrapper
    ),
  };
};

export default richTextAreaDriverFactory;