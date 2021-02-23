import React, { Component, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from "draft-js";
import parse from "parse-json";

const content = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    // const contentState = convertFromRaw(content);
    const editorState = EditorState.createWithContent(content);
    this.state = {
      editorState,
    };
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
  };

  render() {
    const { editorState } = this.state;
    console.log(editorState);
    return (
      <div>
        <Editor
          initialContentState={this.props.content}
          onContentStateChange={this.onContentStateChange}
        />
        {/* {parse(draftToHtml(convertToRaw(editorState.getCurrentContent())))} */}
      </div>
    );
  }
}
